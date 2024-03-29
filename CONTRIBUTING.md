# Ferramenta Contributing Guidelines 

## Introduction

Thank you for considering contributing to Ferramenta! It's people like you that make Ferramenta such a great tool.

## Code of Conduct

In order to ensure that the Ferramenta community is welcoming to all, please review and abide by the [Contributor Covenenant](https://www.contributor-covenant.org/).

## Commit Messages Policy

This repo is using commitlint with `@commitlint/config-conventional` config.

Basically, commit messages should follow this pattern:

| Commit prefix | Commit changes                                                                                         |
|---------------|--------------------------------------------------------------------------------------------------------|
| `build:`      | Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)    |
| `chore:`      | Other changes that don't modify src or test files                                                      |
| `ci:`         | Changes to our CI configuration files and scripts (example scopes: travis, circle, actions)            |
| `docs:`       | Documentation only changes                                                                             |
| `style:`      | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) |
| `refactor:`   | A code change that neither fixes a bug nor adds a feature                                              |
| `perf:`       | A code change that improves performance                                                                |
| `test:`       | Adding missing tests or correcting existing tests                                                      |

**More info:**

https://www.conventionalcommits.org/en/v1.0.0/

## Docs Generation

This repo is using [typedoc](https://typedoc.org/) to generate documentation.

To generate docs, run:

```shell
npm run docs:build
```

Docs will be generated in `docs` folder. This folder is ignored by git and is not published to npm.

Automatic build system will generate docs on each push to `main` branch and publish them to [ferramenta.xorde.io](https://ferramenta.xorde.io).
