import { env } from 'process'

import test from 'ava'

import preferredNodeVersion from '../src/main.js'

import { runFixture, setHomeDir, unsetHomeDir } from './helpers/main.js'

test('Validates versions in files', async (t) => {
  await t.throwsAsync(runFixture('invalid_version'), { message: /file/u })
})

test('Validates versions in environment variables', async (t) => {
  setHomeDir('/')
  // eslint-disable-next-line fp/no-mutation
  env.NODE_VERSION = 'invalid'

  try {
    await t.throwsAsync(preferredNodeVersion({ cwd: '/' }), {
      message: /environment variable/u,
    })
  } finally {
    // eslint-disable-next-line fp/no-delete
    delete env.NODE_VERSION
    unsetHomeDir()
  }
})
