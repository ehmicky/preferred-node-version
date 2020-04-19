import test from 'ava'
import { each } from 'test-each'

import preferredNodeVersion from '../src/main.js'

import { runFixture, setHomeDir } from './helpers/main.js'
import { TEST_VERSION } from './helpers/versions.js'

const HOME_DIR = setHomeDir()

test('Look for version files in current directory', async (t) => {
  const { version } = await runFixture('nvmrc')
  t.is(version, TEST_VERSION)
})

test('Look for version files in parent directories', async (t) => {
  const { version } = await runFixture('deep/subdir/subdir')
  t.is(version, TEST_VERSION)
})

each(['/', `${HOME_DIR}/subdir/subdir`], ({ title }, cwd) => {
  test(`Look for version files in home directory | ${title}`, async (t) => {
    const { version } = await preferredNodeVersion({ cwd })
    t.is(version, TEST_VERSION)
  })
})
