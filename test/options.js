import test from 'ava'
import { each } from 'test-each'

import preferredNodeVersion from '../src/main.js'

each([{ fetch: 0 }, { mirror: 0 }, { cwd: true }], ({ title }, options) => {
  test(`Validates options | ${title}`, async (t) => {
    await t.throwsAsync(preferredNodeVersion(options))
  })
})
