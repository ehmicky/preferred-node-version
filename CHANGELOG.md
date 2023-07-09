# 4.2.0

## Features

- Add a [`files` option](README.md#files) to target specific files, such as
  `"/path/to/.nvmrc"`.
- Export the list of searched files as
  [`NODE_VERSION_FILES`](README.md#node_version_files)

# 4.1.0

## Features

- Add a [`signal` option](README.md#signal) to cancel

# 4.0.0

## Breaking changes

- Minimal supported Node.js version is now `16.17.0`

# 3.6.0

## Documentation

- Clarify order in which files and environment variables are searched

# 3.5.0

## Features

- Improve tree-shaking support

# 3.4.0

## Features

- Improve options validation

# 3.3.0

## Features

- Reduce npm package size by 67%

# 3.2.0

## Features

- Reduce npm package size

# 3.1.0

## Features

- Add TypeScript types

# 3.0.1

## Dependencies

- Upgrade `node-version-alias`

# 3.0.0

## Breaking changes

- Minimal supported Node.js version is now `14.18.0`

## Features

- The [`cwd` option](https://github.com/ehmicky/preferred-node-version#cwd) can
  now be a `file:` URL

# 2.0.0

## Breaking changes

- Minimal supported Node.js version is now `12.20.0`
- This package is now an ES module. It can only be loaded with an `import` or
  `import()` statement, not `require()`. See
  [this post for more information](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).

# 1.1.0

## Features

- Add [`global` option](/README.md#global)

# 1.0.1

## Dependencies

- Upgrade `node-version-alias`
