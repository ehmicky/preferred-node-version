import { versions, cwd as getCwd, chdir } from 'process'

import test from 'ava'
import { each } from 'test-each'

import preferredNodeVersion from '../src/main.js'

const FIXTURES_DIR = `${__dirname}/fixtures`

// We use old Node.js versions to ensure new ones are not published, making
// those tests fail
const VERSIONS = {
  nave: '4.1.2',
  nvmrc: '4.2.6',
  nodeVersion: '4.3.2',
  current: versions.node,
}

each(
  [
    { fixture: 'naverc', result: VERSIONS.nave },
    { fixture: 'node-version', result: VERSIONS.nodeVersion },
    { fixture: 'nvmrc', result: VERSIONS.nvmrc },
    { fixture: 'mixed', result: VERSIONS.nodeVersion },
    { opts: { cwd: '/' }, result: VERSIONS.current },
  ],
  ({ title }, { opts, fixture, result }) => {
    test(`Resolve aliases | ${title}`, async (t) => {
      const cwd =
        fixture === undefined ? undefined : `${FIXTURES_DIR}/${fixture}`
      const output = await preferredNodeVersion({ cwd, ...opts })
      t.is(output, result)
    })
  },
)

test.serial('Option cwd defaults to the current directory', async (t) => {
  const currentCwd = getCwd()
  chdir(`${FIXTURES_DIR}/nvmrc`)

  try {
    const versionRange = await preferredNodeVersion()
    t.is(versionRange, VERSIONS.nvmrc)
  } finally {
    chdir(currentCwd)
  }
})
