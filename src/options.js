import { cwd as getCwd } from 'process'

import filterObj from 'filter-obj'
import { validate } from 'jest-validate'

// Normalize options and assign default values
export const getOpts = function (opts = {}) {
  validate(opts, { exampleConfig: EXAMPLE_OPTS() })

  const optsA = filterObj(opts, isDefined)
  const optsB = { ...DEFAULT_OPTS(), ...optsA }

  const { cwd, fetch, mirror } = optsB
  const nodeVersionAliasOpts = { fetch, mirror }
  return { cwd, nodeVersionAliasOpts }
}

const DEFAULT_OPTS = () => ({
  cwd: getCwd(),
})

const EXAMPLE_OPTS = () => ({
  ...DEFAULT_OPTS(),
  // Passed to `all-node-versions`
  fetch: true,
  // Passed to `fetch-node-website`
  mirror: 'https://nodejs.org/dist',
})

const isDefined = function (key, value) {
  return value !== undefined
}
