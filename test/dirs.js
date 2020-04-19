import { promises as fs } from 'fs'
import { homedir } from 'os'

import test from 'ava'
import pathExists from 'path-exists'
import { each } from 'test-each'

import preferredNodeVersion from '../src/main.js'

import { runFixture } from './helpers/main.js'
import { TEST_VERSION } from './helpers/versions.js'

test('Look for version files in current directory', async (t) => {
  const { version } = await runFixture('nvmrc')
  t.is(version, TEST_VERSION)
})

test('Look for version files in parent directories', async (t) => {
  const { version } = await runFixture('deep/subdir/subdir')
  t.is(version, TEST_VERSION)
})

// Home directory is shared, so this must be serial
each(['/', homedir()], ({ title }, cwd) => {
  test.serial(
    `Look for version files in home directory | ${title}`,
    async (t) => {
      const navercPath = `${homedir()}/.naverc`

      if (await pathExists(navercPath)) {
        throw new Error(
          'The tests assumes the current environment does not have any .naverc in the home directory',
        )
      }

      await fs.writeFile(navercPath, TEST_VERSION)

      try {
        const { version } = await preferredNodeVersion({ cwd })
        t.is(version, TEST_VERSION)
      } finally {
        await fs.unlink(navercPath)
      }
    },
  )
})
