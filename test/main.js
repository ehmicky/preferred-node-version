import { cwd as getCwd, chdir } from 'process'

import test from 'ava'
import { each } from 'test-each'

import preferredNodeVersion from '../src/main.js'

import { TEST_VERSION } from './helpers/versions.js'

const FIXTURES_DIR = `${__dirname}/helpers/fixtures`

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
