import { env } from 'node:process'

import test from 'ava'

import {
  runFixture,
  setEmptyHomeDir,
  unsetHomeDir,
} from './helpers/main.test.js'

import preferredNodeVersion from 'preferred-node-version'

test('Validates versions in files', async (t) => {
  await t.throwsAsync(runFixture('invalid_version'), { message: /file/u })
})

test.serial('Validates versions in environment variables', async (t) => {
  setEmptyHomeDir()
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
