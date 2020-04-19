import { promises as fs } from 'fs'
import { platform, cwd as getCwd, chdir } from 'process'

import test from 'ava'

import preferredNodeVersion from '../src/main.js'

import { runFixture, FIXTURES_DIR } from './helpers/main.js'
import { TEST_VERSION } from './helpers/versions.js'

test('Prioritize closer directories', async (t) => {
  const { version } = await runFixture('priority/subdir')
  t.is(version, TEST_VERSION)
})

test('Ignore version directories', async (t) => {
  const { version } = await runFixture('directory/subdir')
  t.is(version, TEST_VERSION)
})

test('Ignore invalid version files', async (t) => {
  const { version } = await runFixture('ignore_invalid/subdir')
  t.is(version, TEST_VERSION)
})

if (platform !== 'win32') {
  test.serial('Ignore version files with wrong permissions', async (t) => {
    const fixture = 'ignore_permissions/subdir'
    const nvmrcPath = `${FIXTURES_DIR}/${fixture}/.nvmrc`

    const { mode } = await fs.stat(nvmrcPath)
    await fs.chmod(nvmrcPath, 0)

    try {
      const { version } = await runFixture(fixture)
      t.is(version, TEST_VERSION)
    } finally {
      await fs.chmod(nvmrcPath, mode)
    }
  })
}

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
