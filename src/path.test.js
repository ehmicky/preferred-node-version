import { chmod, stat } from 'node:fs/promises'
import { chdir, cwd as getCwd, platform } from 'node:process'

import test from 'ava'

import { FIXTURES_DIR, runFixture } from './helpers/main.test.js'
import { TEST_VERSION } from './helpers/versions.test.js'

import preferredNodeVersion from 'preferred-node-version'

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

    // We must change the permissions during the test only because `git`
    // requires read permissions to `git commit`
    const { mode } = await stat(nvmrcPath)
    await chmod(nvmrcPath, 0)

    try {
      const { version } = await runFixture(fixture)
      t.is(version, TEST_VERSION)
    } finally {
      await chmod(nvmrcPath, mode)
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
