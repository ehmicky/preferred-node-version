import { promises as fs } from 'fs'
import { platform } from 'process'

import test from 'ava'

import preferredNodeVersion from '../src/main.js'

import { TEST_VERSION } from './helpers/versions.js'

const FIXTURES_DIR = `${__dirname}/helpers/fixtures`

test('Prioritize closer directories', async (t) => {
  const cwd = `${FIXTURES_DIR}/priority/subdir`
  const { version } = await preferredNodeVersion({ cwd })
  t.is(version, TEST_VERSION)
})

test('Ignore version directories', async (t) => {
  const cwd = `${FIXTURES_DIR}/directory/subdir`
  const { version } = await preferredNodeVersion({ cwd })
  t.is(version, TEST_VERSION)
})

test('Ignore invalid version files', async (t) => {
  const cwd = `${FIXTURES_DIR}/ignore_invalid/subdir`
  const { version } = await preferredNodeVersion({ cwd })
  t.is(version, TEST_VERSION)
})

if (platform !== 'win32') {
  test.serial('Ignore version files with wrong permissions', async (t) => {
    const cwd = `${FIXTURES_DIR}/ignore_permissions/subdir`
    const nvmrcPath = `${cwd}/.nvmrc`

    const { mode } = await fs.stat(nvmrcPath)
    await fs.chmod(nvmrcPath, 0)

    try {
      const { version } = await preferredNodeVersion({ cwd })
      t.is(version, TEST_VERSION)
    } finally {
      await fs.chmod(nvmrcPath, mode)
    }
  })
}
