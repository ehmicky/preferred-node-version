import { env } from 'process'

import test from 'ava'
import { each } from 'test-each'

import preferredNodeVersion from '../src/main.js'

import { setHomeDir, unsetHomeDir } from './helpers/main.js'
import { TEST_VERSION } from './helpers/versions.js'

each(
  [
    { name: 'NODIST_NODE_VERSION', value: TEST_VERSION },
    { name: 'NODE_VERSION', value: TEST_VERSION },
  ],
  ({ title }, { name, value }) => {
    test.serial(
      `Can use environment variables for Node.js versions | ${title}`,
      async (t) => {
        setHomeDir()
        // eslint-disable-next-line fp/no-mutation
        env[name] = value

        try {
          const { version } = await preferredNodeVersion({ cwd: '/' })
          t.is(version, TEST_VERSION)
        } finally {
          // eslint-disable-next-line fp/no-delete
          delete env[name]
          unsetHomeDir()
        }
      },
    )
  },
)

test.serial('Ignores empty environment variables', async (t) => {
  setHomeDir('/')
  // eslint-disable-next-line fp/no-mutation
  env.NODE_VERSION = ' '

  try {
    const { version } = await preferredNodeVersion({ cwd: '/' })
    t.is(version, undefined)
  } finally {
    // eslint-disable-next-line fp/no-delete
    delete env.NODE_VERSION
    unsetHomeDir()
  }
})
