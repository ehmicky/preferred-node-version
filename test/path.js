import test from 'ava'

import preferredNodeVersion from '../src/main.js'

import { TEST_VERSION } from './helpers/versions.js'

const FIXTURES_DIR = `${__dirname}/helpers/fixtures`

test('Prioritize closer directories', async (t) => {
  const cwd = `${FIXTURES_DIR}/priority/subdir`
  const { version } = await preferredNodeVersion({ cwd })
  t.is(version, TEST_VERSION)
})
