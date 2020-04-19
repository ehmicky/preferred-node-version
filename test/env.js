import { env } from 'process'

import test from 'ava'
import { each } from 'test-each'

import preferredNodeVersion from '../src/main.js'

import { setHomeDir } from './helpers/main.js'
import { TEST_VERSION } from './helpers/versions.js'

setHomeDir()

each(
  [
    { name: 'NODIST_NODE_VERSION', value: TEST_VERSION },
    { name: 'NODE_VERSION', value: TEST_VERSION },
  ],
  ({ title }, { name, value }) => {
    test.serial(
      `Can use environment variables for Node.js versions | ${title}`,
      async (t) => {
        // eslint-disable-next-line fp/no-mutation
        env[name] = value

        try {
          const { version } = await preferredNodeVersion({ cwd: '/' })
          t.is(version, TEST_VERSION)
        } finally {
          // eslint-disable-next-line fp/no-delete
          delete env[name]
        }
      },
    )
  },
)
