import test from 'ava'
import { each } from 'test-each'

import { runFixture } from './helpers/main.js'
import { TEST_VERSION } from './helpers/versions.js'

each(
  [
    'trim',
    'naverc',
    'node-version',
    'n-node-version',
    'nodeenvrc',
    'nodeenvrc_trim',
    'nodeenvrc_case',
    'nodeenvrc_single_quotes',
    'nodeenvrc_double_quotes',
    'nodeenvrc_empty/subdir',
    'nvmrc',
    'package',
    'package_invalid_json/subdir',
    'package_empty/subdir',
    'package_not_object/subdir',
    'package_no_engines/subdir',
    'package_no_engines_node/subdir',
    'package_engines_node_invalid/subdir',
    'package_engines_node_empty/subdir',
  ],
  ({ title }, fixture) => {
    test(`Load version files | ${title}`, async (t) => {
      const { version } = await runFixture(fixture)
      t.is(version, TEST_VERSION)
    })
  },
)
