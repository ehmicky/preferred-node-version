import test from 'ava'
import { each } from 'test-each'

import { runFixture } from './helpers/main.js'
import { TEST_VERSION } from './helpers/versions.js'

test('Trim version file content', async (t) => {
  const { version } = await runFixture('trim')
  t.is(version, TEST_VERSION)
})

each(
  [
    'naverc',
    'node-version',
    'n-node-version',
    'nodeenvrc',
    'nodeenvrc_trim',
    'nodeenvrc_case',
    'nodeenvrc_single_quotes',
    'nodeenvrc_double_quotes',
    'nvmrc',
    'package',
    'package_invalid_json',
    'package_empty',
    'package_not_object',
    'package_no_engines',
  ],
  ({ title }, fixture) => {
    test(`Load version files | ${title}`, async (t) => {
      const { version } = await runFixture(fixture)
      t.is(version, TEST_VERSION)
    })
  },
)
