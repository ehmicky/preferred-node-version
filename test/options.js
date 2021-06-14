import test from 'ava'
// eslint-disable-next-line node/no-missing-import, import/no-unresolved
import preferredNodeVersion from 'preferred-node-version'
import { each } from 'test-each'

each([{ fetch: 0 }, { mirror: 0 }, { cwd: true }], ({ title }, options) => {
  test(`Validates options | ${title}`, async (t) => {
    await t.throwsAsync(preferredNodeVersion(options))
  })
})
