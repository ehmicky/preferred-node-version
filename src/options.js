import { excludeKeys } from 'filter-obj'
import { validate, multipleValidOptions } from 'jest-validate'

// Normalize options and assign default values
export const getOpts = function (opts = {}) {
  validate(opts, { exampleConfig: EXAMPLE_OPTS })

  const optsA = excludeKeys(opts, isUndefined)
  const optsB = { ...DEFAULT_OPTS, ...optsA }

  const { cwd, global: globalOpt, fetch: fetchOpt, mirror } = optsB
  const nodeVersionAliasOpts = { fetch: fetchOpt, mirror }
  return { cwd, globalOpt, nodeVersionAliasOpts }
}

const DEFAULT_OPTS = {
  cwd: '.',
  global: false,
}

const EXAMPLE_OPTS = {
  ...DEFAULT_OPTS,
  cwd: multipleValidOptions('.', new URL('.', import.meta.url)),
  // Passed to `all-node-versions`
  fetch: true,
  // Passed to `fetch-node-website`
  mirror: 'https://nodejs.org/dist',
}

const isUndefined = function (key, value) {
  return value === undefined
}
