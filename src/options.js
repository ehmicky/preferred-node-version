import { cwd as getCwd } from 'process'

import { validate } from 'jest-validate'

// Normalize options and assign default values
export const getOpts = function (opts = {}) {
  validate(opts, { exampleConfig: EXAMPLE_OPTS() })

  return { ...DEFAULT_OPTS(), ...opts }
}

const DEFAULT_OPTS = () => ({
  cwd: getCwd(),
})

const EXAMPLE_OPTS = () => ({
  ...DEFAULT_OPTS(),
  // Passed to `normalize-node-version`
  cache: true,
  // Passed to `fetch-node-website`
  mirror: 'https://nodejs.org/dist',
})
