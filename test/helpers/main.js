import { env } from 'process'

// eslint-disable-next-line node/no-missing-import, import/no-unresolved
import preferredNodeVersion from 'preferred-node-version'

export const FIXTURES_DIR = `${__dirname}/fixtures`

// Run the main function against a fixture directory
export const runFixture = function (fixture, opts) {
  const cwd = `${FIXTURES_DIR}/${fixture}`
  return preferredNodeVersion({ ...opts, cwd })
}

// Tests should not rely on the real machine's home directory since it is
// machine-dependent and global
export const setHomeDir = function (homeDir = `${FIXTURES_DIR}/home`) {
  // eslint-disable-next-line fp/no-mutation
  env.TEST_HOME_DIR = homeDir
  return homeDir
}

export const setEmptyHomeDir = function () {
  return setHomeDir('/')
}

export const unsetHomeDir = function () {
  // eslint-disable-next-line fp/no-delete
  delete env.TEST_HOME_DIR
}
