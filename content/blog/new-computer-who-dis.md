---
title: New Computer — Who Dis?
author: Niko Heikkilä
lang: en
excerpt: "When I'm too lazy to set up a computer manually."
type: post
categories: [nodejs, zx, opensource, automation]
date: 2022-05-07
hero: null
---

There is one thing uniting the people working in tech. Computers. Fresh from the box, many of them are happily unequipped to fulfil our grand visions and desires.

Whether it be the ecological disaster caused by chasing after fancy new hardware, receiving authorized devices for client work, or switching laptops due to expiring leases, working as a professional software developer means you often find yourself in front of a fresh desktop.

The sweet plastic smell of unboxing a new laptop typically becomes a sour, pungent stench of sweating and installing software via countless hours spent next to a terminal or browser. Some years ago, I decided to cut the crap and stop wasting those hours. As a result, I initially wrote my personal setup script with Bash, which I recently rewrote for Node.js using Google's unofficial yet robust *zx* scripting toolkit.

In brief, the script executes a post-install step after installing dependencies (a seriously great feature in the Node.js ecosystem) and checks whether my new machine is running macOS, Linux, or Windows. It then proceeds to install necessary packages, configure my shell prompt, and tweak other details.

These provide the minimum tooling that allows me to stay productive. There are other applications, mainly with desktop UIs, that I also use. However, I've decided to exclude those as there is no convenient way to install them via scripts, and I don't need to use them everywhere.

The most significant benefit is how I can focus on developing new projects minutes after I've taken a new platform into use. The idea is familiar from DevOps, where you typically provide a vast array of cloud resources using a set of configurations and scripts with AWS CDK, Terraform, Pulumi and friends. It is only logical to bring this configurable and reusable behaviour to use in local environments. Your time is precise, if not even more expensive, than that of cloud computing.

In the future, I plan to improve the tool's modularity so that people can fork it for their needs more leisurely. The Homebrew package manager supports using the wonderful Brewfile specification format for declaring necessary packages in a single text file for macOS. However, I haven't found anything that suits me that well for the APT package manager on Linux or Scoop on Windows. To separate data from the behaviour, I might have to invent my own format using YAML files, but a more standardized general-purpose solution would be ideal in the long run. Let me know if you know of such treats.

If you're interested, grab the source code [here](https://github.com/nikoheikkila/setup). Of course, there's no license or warranty, so abuse it for your inspiration as much as needed.
