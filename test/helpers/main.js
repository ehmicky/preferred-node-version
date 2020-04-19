import preferredNodeVersion from '../../src/main.js'

export const FIXTURES_DIR = `${__dirname}/fixtures`

// Run the main function against a fixture directory
export const runFixture = function (fixture) {
  const cwd = `${FIXTURES_DIR}/${fixture}`
  return preferredNodeVersion({ cwd })
}
