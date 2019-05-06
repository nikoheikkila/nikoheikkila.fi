---
lang: en
type: page
cover: keyboard.jpg
title: Open-Source Projects
---

On this page I'm listing my open-source projects I've coded on my spare time. Contributions and issues are welcome for every project. Check the respective repositories for more information and contribution guidelines. 🙏🏽

## [Pwned API][pwnedapi]

A Python library to leverage **Troy Hunt's** [Have I Been Pwned API v2][hibp] and the _k-Anonymity_ model. Inspired by **Phil Nash's** Ruby gem `pwned`. Supported on Python versions 3.5 and up.

### Installing

You can install the package to your virtual environment like so:

```bash
➜ pipenv install pwnedapi
✨🍰✨
```

### Usage

Checking a single password and fetching its _pwned_ count:

![Checking Single Password](https://github.com/nikoheikkila/pwnedapi/raw/master/docs/check.png)

Scanning a file for pwned passwords and exporting it as a JSON file:

![Scanning a File](https://github.com/nikoheikkila/pwnedapi/raw/master/docs/scan.png)

See the [**README**][github] for more.

<!-- Links -->
[pwnedapi]: https://pypi.org/project/pwnedapi/
[github]: https://github.com/nikoheikkila/pwnedapi
[hibp]: https://haveibeenpwned.com/API/v2
[hibp2]: https://haveibeenpwned.com/
[tablib]: http://docs.python-tablib.org/en/master/
