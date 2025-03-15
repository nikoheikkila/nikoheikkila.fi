#!/usr/bin/env bun run
import fs from "node:fs";
import path from "node:path";
import slugify from "@sindresorhus/slugify";
import inquirer, { type PromptModule } from "inquirer";
import makeTitleCase from "title";
import config from "./gatsby-config";
import type { SiteSiteMetadata as Meta } from "./src/types";
import * as DateTime from "./src/utils/datetime";

const meta = config.siteMetadata as Meta;

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
				default: meta?.author?.name,
			},
			{
				type: "input",
				name: "language",
				message: "Language (en, fi, sv): ",
				default: meta?.language,
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
				default: DateTime.toISOString(),
			},
			{
				type: "input",
				name: "cover",
				message: "URL of the cover image: ",
				default: "null",
				validate: (input: string) => {
					if (input === "null") return true;

					try {
						new URL(input);
					} catch {
						return "Enter a valid URL";
					}

					return true;
				},
			},
		]);
	} catch (err) {
		return console.error(err instanceof Error ? err.message : String(err));
	}

	const { title, type, excerpt, categories, author, cover, date, language } = prompt;
	const postType = Array.isArray(type) ? type[0] : type;
	const postCategories = categories
		.split(",")
		.map((c) => c.trim())
		.join(", ");

	const targetFile = path.join(__dirname, `content/${postType === "post" ? "blog/" : ""}${slugify(title)}.md`);

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

	fs.writeFileSync(targetFile, frontMatterBlock);

	console.log(`
    Saved new post to ${targetFile} with following content:

    ${frontMatterBlock}
  `);
};

newPost();
