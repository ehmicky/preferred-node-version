import test from 'ava'

import { runFixture } from './helpers/main.js'
import { TEST_VERSION } from './helpers/versions.js'

test('Trim version file content', async (t) => {
  const { version } = await runFixture('trim')
  t.is(version, TEST_VERSION)
})
