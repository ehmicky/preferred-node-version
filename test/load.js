import { writeFile, unlink } from 'fs/promises'

import test from 'ava'
import { each } from 'test-each'

import { runFixture, FIXTURES_DIR } from './helpers/main.js'
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

// We need to generate invalid `package.json` dynamically. Otherwise ESLint
// throws an error.
test('Ignore invalid package.json', async (t) => {
  const packageJsonPath = `${FIXTURES_DIR}/package_invalid_json/subdir/package.json`
  await writeFile(packageJsonPath, '{"engines":{"node"},"test"}')

  try {
    const { version } = await runFixture('package_invalid_json/subdir')
    t.is(version, TEST_VERSION)
  } finally {
    await unlink(packageJsonPath)
  }
})
