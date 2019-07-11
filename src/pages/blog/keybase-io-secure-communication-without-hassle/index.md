---
lang: en
title: Keybase – Secure Communication without Hassle
author: Niko Heikkilä
type: post
date: 2015-03-22
cover: keybase.png
excerpt: >
  I've been playing with Keybase.io, a message encryption service for a while now.
categories:
  - Security
  - Apps
  - Encryption
---

I've played with this service for a while now after I received an invitation to the alpha. Yes, it's alpha, not even beta. Keeping that in mind Keybase works pretty flawlessly already.

But what is it all about? Folks probably have some sort of idea about digital encryption of messages, at least after the famous Snowden leaks and the outcry of NSA eavesdropping your communication. The solution is simple: encrypt **all** your messages with [Pretty Good Privacy (PGP)](https://en.wikipedia.org/wiki/Pretty_Good_Privacy). If you are not familiar with PGP, please take a look at the linked article before reading on.

You read it? Good, let's continue, shall we?

## But PGP Is Awfully Hard to Use

That's where Keybase comes to rescue. Instead of hassling with command-line tools you simply push an existing or generate a new keypair consisting of a private and a public key. Then you verify yourself via social media profiles which are now limited to some of the most popular (Twitter, GitHub, Reddit etc.). You can also specify the ownership of your domain. In my profile I have verified this site by pushing a text file to this server.

The catch with these social profiles is that your friend can now identify that it is really you there. You might follow each other on Twitter or collaborate in a repository on GitHub or have a heated discussion about the meaning of Caturday on Reddit (who wouldn't). You know each other and that is good.

Next you want to send your friend an encrypted message. First you should track him/her, then visit his/her profile and hit _Encrypt_. Type your message and out comes a regular PGP encrypted jumbo optionally signed with your key for extra proof. Then you fire up your trusty email or IM client, paste the encrypted message and send it away. Your friend now needs to log in to his/her Keybase account and select _Decrypt._ In goes encrypted message and out comes plain readable text.

But why use browser when you are perfectly capable terminal ninja? Keybase offers a command-line tool that can be installed with [Node Package Manager (npm)](https://www.npmjs.com/package/keybase). Keybase keys can even be imported to your standard GnuPG keyring. To get my public key, type like so.

```bash
curl https://keybase.io/nikoheikkila/key.asc | gpg --import
```

Of course, you should still verify the fingerprint, which in my key is _C8B7 1157 3C52 9CBA 02C6 CED1 C0D0 3CCC BD3C F742_, to ensure you imported the right key.

```bash
gpg --fingerprint BD3CF742
```

If you see the above fingerprint printed in full you can be pretty sure the key belongs to me.

## Conclusion

In short, Keybase offers the advantages of secure PGP encryption and signatures without any hassle. Linked with social media services it provides somewhat easier chain of trust.

Unfortunately, I ran out of invites but I will update this post when I receive more of them. If you already have an account [track me here](https://keybase.io/nikoheikkila).
