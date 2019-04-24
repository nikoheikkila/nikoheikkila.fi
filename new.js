#!/usr/bin/env node
const inquirer = require('inquirer')
const slugify = require('@sindresorhus/slugify')
const fs = require('fs')
const dayjs = require('dayjs')
const yaml = require('node-yaml')
const chalk = require('chalk')

const log = msg => console.log(msg)
const success = msg => log(chalk.bold.green(msg))
const error = msg => log(chalk.bold.red(msg))

const newPost = async () => {
  /* Sane defaults I almost never modify */
  const defaults = {
    lang: 'en',
    author: 'Niko Heikkilä',
    date: dayjs().format('YYYY-MM-DD'),
    cover: 'cover.png'
  }

  let prompt

  try {
    prompt = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'Title for the post:'
      },
      {
        type: 'checkbox',
        name: 'type',
        message: 'Is this a post or a page?',
        choices: [
          {
            name: 'post',
            checked: true
          },
          {
            name: 'page'
          }
        ],
        validate: answer => {
          if (answer.length < 1) {
            return 'Choose either type!'
          }

          if (answer.length > 1) {
            return 'Choose only one type!'
          }

          return true
        }
      },
      {
        type: 'input',
        name: 'excerpt',
        message: 'Summary for the post:'
      },
      {
        type: 'input',
        name: 'categories',
        message: 'Post categories (separated by comma):'
      }
    ])
  } catch (err) {
    return error(err)
  }

  const { title, type, excerpt, categories } = prompt

  const targetFolder = `./src/pages/blog/${slugify(title)}`
  const postCategories = categories.split(',')
  const postType = Array.isArray(type) ? type[0] : type

  if (!fs.existsSync(targetFolder)) {
    fs.mkdirSync(targetFolder, {
      recursive: true
    })
  }

  const metaData = yaml.dump({
    ...defaults,
    title,
    type: postType,
    excerpt,
    categories: postCategories
  })

  const frontMatter = `---\n${metaData}\n---`
  const markdownFile = `${targetFolder}/index.md`

  fs.writeFileSync(markdownFile, frontMatter)

  success(`
    Saved new post to ${markdownFile} with following content:

    ${frontMatter}
  `)
}

newPost()
