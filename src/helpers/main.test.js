import { env } from 'node:process'
import { fileURLToPath } from 'node:url'

import preferredNodeVersion from 'preferred-node-version'

export const FIXTURES_DIR_URL = new URL('../fixtures/', import.meta.url)
export const FIXTURES_DIR = fileURLToPath(FIXTURES_DIR_URL)

// Run the main function against a fixture directory
export const runFixture = (fixture, opts) => {
  const cwd = `${FIXTURES_DIR}/${fixture}`
  return preferredNodeVersion({ ...opts, cwd })
}

// Tests should not rely on the real machine's home directory since it is
// machine-dependent and global
export const setHomeDir = (homeDir = `${FIXTURES_DIR}/home`) => {
  // eslint-disable-next-line fp/no-mutation
  env.TEST_HOME_DIR = homeDir
  return homeDir
}

export const setEmptyHomeDir = () => setHomeDir('/')

export const unsetHomeDir = () => {
  // eslint-disable-next-line fp/no-delete
  delete env.TEST_HOME_DIR
}
