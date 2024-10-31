import test from 'ava'
import { each } from 'test-each'

import { runFixture, setHomeDir } from './helpers/main.test.js'
import { HOME_TEST_VERSION, TEST_VERSION } from './helpers/versions.test.js'

import preferredNodeVersion from 'preferred-node-version'

const HOME_DIR = setHomeDir()

each(
  [
    { expected: TEST_VERSION, globalOpt: false },
    { expected: HOME_TEST_VERSION, globalOpt: true },
  ],
  ({ title }, { expected, globalOpt }) => {
    test(`Look for version files in current directory | ${title}`, async (t) => {
      const { version } = await runFixture('nvmrc', { global: globalOpt })
      t.is(version, expected)
    })

    test(`Look for version files in parent directories | ${title}`, async (t) => {
      const { version } = await runFixture('deep/subdir/subdir', {
        global: globalOpt,
      })
      t.is(version, expected)
    })
  },
)

each(
  ['/', `${HOME_DIR}/subdir/subdir`],
  [true, false],
  ({ title }, cwd, globalOpt) => {
    test(`Look for version files in home directory | ${title}`, async (t) => {
      const { version } = await preferredNodeVersion({ cwd, global: globalOpt })
      t.is(version, HOME_TEST_VERSION)
    })
  },
)
