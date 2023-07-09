import type {
  SemverVersion,
  Options as NodeVersionAliasOptions,
} from 'node-version-alias'

export type { SemverVersion }

export interface Options {
  /**
   * Start looking for a Node.js version file from this directory.
   *
   * @default `process.cwd()``
   */
  cwd?: string | URL

  /**
   * If `true`, find the global Node.js version instead:
   *  - use only the home directory and environment variables
   *  - ignore the current directory and parent directories
   *
   * @default false
   */
  global?: boolean

  /**
   * Additional files to lookup.
   * Their filenames must be one of `package.json`, `.nvmrc`, etc.
   *
   * @default []
   */
  files?: string[]

  /**
   * Base URL.
   * Can be customized (for example `https://npmmirror.com/mirrors/node`).
   *
   * The following environment variables can also be used: `NODE_MIRROR`,
   * `NVM_NODEJS_ORG_MIRROR`, `N_NODE_MIRROR` or `NODIST_NODE_MIRROR`.
   *
   * @default 'https://nodejs.org/dist'
   */
  mirror?: NodeVersionAliasOptions['mirror']

  /**
   * Cancels when the signal is aborted.
   */
  signal?: NodeVersionAliasOptions['signal']

  /**
   * The list of available Node.js versions is cached for one hour by default.
   * If the `fetch` option is:
   *  - `true`: the cache will not be used
   *  - `false`: the cache will be used even if it's older than one hour
   *
   * @default `undefined`
   */
  fetch?: NodeVersionAliasOptions['fetch']
}

export type PreferredNodeVersion = Partial<{
  /**
   * Full Node.js version. For example `12.16.2`.
   * `undefined` if no preferred Node.js version was found.
   */
  version: SemverVersion

  /**
   * Node.js version as specified in the Node.js version file.
   * This might include aliases or version ranges.
   * For example `latest`, `lts/erbium`, `12` or `12.16.2`.
   * `undefined` if no preferred Node.js version was found.
   */
  rawVersion: string

  /**
   * Absolute path to the Node.js version file.
   * Either `filePath` or `envVariable` is defined.
   */
  filePath: string

  /**
   * Name of the environment variable containing the version.
   * For example `NODE_VERSION`.
   * Either `filePath` or `envVariable` is defined.
   */
  envVariable: string
}>

/**
 * Get the preferred Node.js version of a user or project.
 *
 * This looks for any [`.nvmrc`](https://github.com/nvm-sh/nvm#nvmrc) or
 * [`package.json` (`engines.node` field)](https://docs.npmjs.com/files/package.json#engines)
 * in the current directory, parent directories or home directory.
 *
 * `nvm` aliases (like `current` or `lts/erbium`) and version ranges (like `12` or
 * `>=12`) are resolved to regular `"major.minor.patch"` version strings.
 *
 * This also looks for any
 * [`.node-version`](https://github.com/jasongin/nvs#automatic-switching-per-directory),
 * [`.n-node-version`](https://github.com/tj/n#specifying-node-versions),
 * [`.naverc`](https://github.com/isaacs/nave#automagical),
 * [`.nodeenvrc`](https://github.com/ekalinin/nodeenv#configuration) file or
 * [`NODE_VERSION`](https://docs.netlify.com/configure-builds/manage-dependencies/#node-js-and-javascript),
 * [`NODIST_NODE_VERSION`](https://github.com/nullivex/nodist#scope-precedence)
 * environment variable.
 *
 * If a file cannot be read or if it contains an invalid version, the promise is
 * rejected with an error.
 *
 * @example
 * ```js
 * // Look for any `.nvmrc` or `package.json` (`engines.node` field)
 * const { version } = await preferredNodeVersion()
 * console.log(version) // 12.10.0
 *
 * // Search only the home directory and environment variables
 * const { version } = await preferredNodeVersion({ global: true })
 *
 * // Start looking for a Node.js version file from this directory instead
 * const { version } = await preferredNodeVersion({ cwd: '/path/to/cwd' })
 *
 * // Search for specific files
 * await preferredNodeVersion({
 *   files: ['/path/to/.nvmrc', '/path/to/package.json'],
 * })
 * ```
 */
export default function preferredNodeVersion(
  options?: Options,
): Promise<PreferredNodeVersion>

/**
 * List of filenames being searched: `.nvmrc`, `package.json`, etc.
 */
export declare const NODE_VERSION_FILES: string[]
