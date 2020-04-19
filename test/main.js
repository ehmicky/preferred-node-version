import { cwd as getCwd, chdir } from 'process'

import test from 'ava'
import { each } from 'test-each'

import preferredNodeVersion from '../src/main.js'

const FIXTURES_DIR = `${__dirname}/helpers/fixtures`

const TEST_VERSION = '6.0.0'

each(['naverc', 'node-version', 'nvmrc'], ({ title }, fixture) => {
  test(`Resolve aliases | ${title}`, async (t) => {
    const cwd = `${FIXTURES_DIR}/${fixture}`
    const { version } = await preferredNodeVersion({ cwd })
    t.is(version, TEST_VERSION)
  })
})

test.serial('Option cwd defaults to the current directory', async (t) => {
  const currentCwd = getCwd()
  chdir(`${FIXTURES_DIR}/nvmrc`)

  try {
    const { version } = await preferredNodeVersion()
    t.is(version, TEST_VERSION)
  } finally {
    chdir(currentCwd)
  }
})
