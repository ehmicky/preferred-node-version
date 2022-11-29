import test from 'ava'
import preferredNodeVersion from 'preferred-node-version'
import { each } from 'test-each'

import { FIXTURES_DIR_URL, FIXTURES_DIR } from './helpers/main.js'
import { RESOLVED_VERSION_RANGE } from './helpers/versions.js'

each([true, { fetch: 0 }, { cwd: true }], ({ title }, options) => {
  test(`Validates options | ${title}`, async (t) => {
    await t.throwsAsync(preferredNodeVersion(options))
  })
})

each(
  [`${FIXTURES_DIR}/version_range`, new URL('version_range', FIXTURES_DIR_URL)],
  ({ title }, cwd) => {
    test(`Allow cwd to be string or URL | ${title}`, async (t) => {
      const { version } = await preferredNodeVersion({ cwd })
      t.is(version, RESOLVED_VERSION_RANGE)
    })
  },
)
