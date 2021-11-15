#!/usr/bin/env ts-node-script
import inquirer, { PromptModule } from "inquirer";
import slugify from "@sindresorhus/slugify";
import path from "path";
import fs from "fs";
import dayjs from "dayjs";
import chalk from "chalk";
import makeTitleCase from "title";

// @ts-ignore
import { siteMetadata } from "./gatsby-config";

interface PromptAttributes {
    readonly title: string;
    readonly author: string;
    readonly language: string;
    readonly excerpt: string;
    readonly type: string[] | string;
    readonly categories: string;
    readonly date: string;
    readonly cover: string | null;
}

const log = (msg: string) => console.log(msg);
const success = (msg: string) => log(chalk.bold.green(msg));
const error = (msg: string) => log(chalk.bold.red(msg));

const isValidCheckBoxAnswer = (answers: string[]): boolean | string => {
    if (answers.length < 1) return "Choose either type!";
    if (answers.length > 1) return "Choose only one type!";
    return true;
};

const newPost = async () => {
    let prompt: PromptModule & PromptAttributes;

    try {
        prompt = await inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "Title: ",
            },
            {
                type: "input",
                name: "author",
                message: "Author: ",
                default: siteMetadata.author.name,
            },
            {
                type: "input",
                name: "language",
                message: "Language (en, fi, sv): ",
                default: siteMetadata.language,
            },
            {
                type: "input",
                name: "excerpt",
                message: "Summary: ",
                default: "To be written later...",
            },
            {
                type: "checkbox",
                name: "type",
                message: "Is this a post or a page?",
                choices: [
                    {
                        name: "post",
                        checked: true,
                    },
                    {
                        name: "page",
                    },
                ],
                validate: isValidCheckBoxAnswer,
            },
            {
                type: "input",
                name: "categories",
                message: "Post categories (separated by comma): ",
                default: "",
            },
            {
                type: "input",
                name: "date",
                message: "Publication date (YYYY-MM-DD): ",
                default: dayjs().format("YYYY-MM-DD"),
            },
            {
                type: "input",
                name: "cover",
                message: "Filename of the cover image: ",
                default: "null",
            },
        ]);
    } catch (err) {
        return error(err instanceof Error ? err.message : String(err));
    }

    const { title, type, excerpt, categories, author, cover, date, language } =
        prompt;
    const postType = Array.isArray(type) ? type[0] : type;
    const postCategories = categories
        .split(",")
        .map((c) => c.trim())
        .join(", ");

    const targetFolder = path.join(
        __dirname,
        `content/${postType === `post` ? `blog/` : ""}${slugify(title)}`
    );

    if (!fs.existsSync(targetFolder)) {
        fs.mkdirSync(targetFolder, {
            recursive: true,
        });
    }

    const frontMatterBlock = `---
title: ${makeTitleCase(title)}
author: ${author}
lang: ${language}
excerpt: ${excerpt}
type: ${postType}
categories: [${postCategories}]
date: ${date}
hero: ${cover}
---`.trim();

    const markdownFile = `${targetFolder}/index.md`;
    fs.writeFileSync(markdownFile, frontMatterBlock);

    success(`
    Saved new post to ${markdownFile} with following content:

    ${frontMatterBlock}
  `);
};

newPost();
