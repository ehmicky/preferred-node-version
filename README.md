[![Node](https://img.shields.io/badge/-Node.js-808080?logo=node.js&colorA=404040&logoColor=66cc33)](https://www.npmjs.com/package/preferred-node-version)
[![TypeScript](https://img.shields.io/badge/-Typed-808080?logo=typescript&colorA=404040&logoColor=0096ff)](/src/main.d.ts)
[![Codecov](https://img.shields.io/badge/-Tested%20100%25-808080?logo=codecov&colorA=404040)](https://codecov.io/gh/ehmicky/preferred-node-version)
[![Mastodon](https://img.shields.io/badge/-Mastodon-808080.svg?logo=mastodon&colorA=404040&logoColor=9590F9)](https://fosstodon.org/@ehmicky)
[![Medium](https://img.shields.io/badge/-Medium-808080.svg?logo=medium&colorA=404040)](https://medium.com/@ehmicky)

Get the preferred Node.js version of a user or project.

This looks for (from highest to lowest priority):

- Any [`.n-node-version`](https://github.com/tj/n#specifying-node-versions),
  [`.naverc`](https://github.com/isaacs/nave#automagical),
  [`.node-version`](https://github.com/jasongin/nvs#automatic-switching-per-directory),
  [`.nodeenvrc`](https://github.com/ekalinin/nodeenv#configuration)
  [`.nvmrc`](https://github.com/nvm-sh/nvm#nvmrc) or
  [`package.json` (`engines.node` field)](https://docs.npmjs.com/files/package.json#engines)
  in the current directory, parent directories, or home directory
- Any
  [`NODE_VERSION`](https://docs.netlify.com/configure-builds/manage-dependencies/#node-js-and-javascript),
  [`NODIST_NODE_VERSION`](https://github.com/nullivex/nodist#scope-precedence)
  environment variable

`nvm` aliases (like `current` or `lts/erbium`) and version ranges (like `12` or
`>=12`) are resolved to regular `"major.minor.patch"` version strings.

# Hire me

Please
[reach out](https://www.linkedin.com/feed/update/urn:li:activity:7117265228068716545/)
if you're looking for a Node.js API or CLI engineer (11 years of experience).
Most recently I have been [Netlify Build](https://github.com/netlify/build)'s
and [Netlify Plugins](https://www.netlify.com/products/build/plugins/)'
technical lead for 2.5 years. I am available for full-time remote positions.

# Examples

```js
import preferredNodeVersion from 'preferred-node-version'

// Look for any `.nvmrc` or `package.json` (`engines.node` field)
const { version } = await preferredNodeVersion()
console.log(version) // 12.10.0
```

```js
// Search only the home directory and environment variables
await preferredNodeVersion({ global: true })
```

```js
// Start looking for a Node.js version file from this directory instead
await preferredNodeVersion({ cwd: '/path/to/cwd' })
```

```js
// Search for specific files
await preferredNodeVersion({
  files: ['/path/to/.nvmrc', '/path/to/package.json'],
})
```

# Install

```bash
npm install preferred-node-version
```

This package works in Node.js >=18.18.0.

This is an ES module. It must be loaded using
[an `import` or `import()` statement](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c),
not `require()`. If TypeScript is used, it must be configured to
[output ES modules](https://www.typescriptlang.org/docs/handbook/esm-node.html),
not CommonJS.

# Usage

## preferredNodeVersion(options?)

`options`: `object?`\
_Returns_: `Promise<object>`

### Return value

The returned promise resolves to an object with the following properties. An
empty object is returned if no preferred Node.js version was found.

If a file cannot be read or if it contains an invalid version, the promise is
rejected with an error.

#### version

_Type_: `string`

Full Node.js version. For example `12.16.2`

#### rawVersion

_Type_: `string`

Node.js version as specified in the Node.js version file. This might include
aliases or version ranges. For example `latest`, `lts/erbium`, `12` or
`12.16.2`.

#### filePath

_Type_: `string?`

Absolute path to the Node.js version file. Either `filePath` or `envVariable` is
defined.

#### envVariable

_Type_: `string?`

Name of the environment variable containing the version. For example
`NODE_VERSION`. Either `filePath` or `envVariable` is defined.

### options

#### cwd

_Type_: `string | URL`\
_Default_: `process.cwd()`

Start looking for a Node.js version file from this directory.

#### global

_Type_: `boolean`\
_Default_: `false`

If `true`, find the global Node.js version instead:

- use only the home directory and environment variables
- ignore the current directory and parent directories

#### files

_Type_: `string[]`\
_Default_: `[]`

Additional files to lookup. Their filenames must be one of `package.json`,
`.nvmrc`, etc.

#### mirror

_Type_: `string`\
_Default_: `https://nodejs.org/dist`

Base URL to fetch the list of available Node.js versions. Can be customized (for
example `https://npmmirror.com/mirrors/node`).

The following environment variables can also be used: `NODE_MIRROR`,
`NVM_NODEJS_ORG_MIRROR`, `N_NODE_MIRROR` or `NODIST_NODE_MIRROR`.

#### fetch

_Type_: `boolean`\
_Default_: `undefined`

The list of available Node.js versions is cached for one hour by default. If the
`fetch` option is:

- `true`: the cache will not be used
- `false`: the cache will be used even if it's older than one hour

#### signal

_Type_:
[`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)

Cancels when the signal is aborted.

## NODE_VERSION_FILES

_Type_: `string[]`

List of filenames being searched: `.nvmrc`, `package.json`, etc.

# See also

- [`nve`](https://github.com/ehmicky/nve): Run a specific Node.js version (CLI)
- [`nvexeca`](https://github.com/ehmicky/nve): Run a specific Node.js version
  (programmatic)
- [`get-node`](https://github.com/ehmicky/get-node): Download Node.js
- [`normalize-node-version`](https://github.com/ehmicky/normalize-node-version):
  Normalize and validate Node.js versions
- [`node-version-alias`](https://github.com/ehmicky/node-version-alias): Resolve
  Node.js version aliases like `latest`, `lts` or `erbium`
- [`all-node-versions`](https://github.com/ehmicky/all-node-versions): List all
  available Node.js versions
- [`fetch-node-website`](https://github.com/ehmicky/fetch-node-website): Fetch
  releases on nodejs.org

# Support

For any question, _don't hesitate_ to [submit an issue on GitHub](../../issues).

Everyone is welcome regardless of personal background. We enforce a
[Code of conduct](CODE_OF_CONDUCT.md) in order to promote a positive and
inclusive environment.

# Contributing

This project was made with ❤️. The simplest way to give back is by starring and
sharing it online.

If the documentation is unclear or has a typo, please click on the page's `Edit`
button (pencil icon) and suggest a correction.

If you would like to help us fix a bug or add a new feature, please check our
[guidelines](CONTRIBUTING.md). Pull requests are welcome!

Thanks go to our wonderful contributors:

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://fosstodon.org/@ehmicky"><img src="https://avatars2.githubusercontent.com/u/8136211?v=4?s=100" width="100px;" alt="ehmicky"/><br /><sub><b>ehmicky</b></sub></a><br /><a href="https://github.com/ehmicky/preferred-node-version/commits?author=ehmicky" title="Code">💻</a> <a href="#design-ehmicky" title="Design">🎨</a> <a href="#ideas-ehmicky" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ehmicky/preferred-node-version/commits?author=ehmicky" title="Documentation">📖</a></td>
      <td align="center"><a href="https://twitter.com/adrieankhisbe"><img src="https://avatars1.githubusercontent.com/u/2601132?v=4?s=100" width="100px;" alt="Adrien Becchis"/><br /><sub><b>Adrien Becchis</b></sub></a><br /><a href="https://github.com/ehmicky/preferred-node-version/commits?author=AdrieanKhisbe" title="Code">💻</a> <a href="https://github.com/ehmicky/preferred-node-version/commits?author=AdrieanKhisbe" title="Tests">⚠️</a> <a href="#ideas-AdrieanKhisbe" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center"><a href="https://github.com/shuhrat"><img src="https://avatars.githubusercontent.com/u/104213?v=4?s=100" width="100px;" alt="Шухрат Шадмонов"/><br /><sub><b>Шухрат Шадмонов</b></sub></a><br /><a href="#ideas-shuhrat" title="Ideas, Planning, & Feedback">🤔</a> <a href="#question-shuhrat" title="Answering Questions">💬</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
