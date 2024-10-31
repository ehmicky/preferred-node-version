import test from 'ava'
import { each } from 'test-each'

import { FIXTURES_DIR, FIXTURES_DIR_URL } from './helpers/main.test.js'
import { RESOLVED_VERSION_RANGE } from './helpers/versions.test.js'

import preferredNodeVersion from 'preferred-node-version'

each(
  [
    true,
    { fetch: 0 },
    { cwd: true },
    { files: 'path' },
    { files: [true] },
    { files: [''] },
  ],
  ({ title }, options) => {
    test(`Validates options | ${title}`, async (t) => {
      await t.throwsAsync(preferredNodeVersion(options))
    })
  },
)

each(
  [`${FIXTURES_DIR}/version_range`, new URL('version_range', FIXTURES_DIR_URL)],
  ({ title }, cwd) => {
    test(`Allow cwd to be string or URL | ${title}`, async (t) => {
      const { version } = await preferredNodeVersion({ cwd })
      t.is(version, RESOLVED_VERSION_RANGE)
    })
  },
)
