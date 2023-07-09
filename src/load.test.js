import { writeFile, unlink } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

import test from 'ava'
import { each } from 'test-each'

import { runFixture, FIXTURES_DIR } from './helpers/main.test.js'
import { TEST_VERSION } from './helpers/versions.test.js'

import preferredNodeVersion, {
  NODE_VERSION_FILES,
} from 'preferred-node-version'

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

test('Load version files in order', async (t) => {
  const { version } = await runFixture('order')
  t.is(version, TEST_VERSION)
})

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

test('"files" option with absolute path', async (t) => {
  const { version } = await preferredNodeVersion({
    files: [`${FIXTURES_DIR}/naverc/.naverc`],
  })
  t.is(version, TEST_VERSION)
})

test('"files" option with relative path', async (t) => {
  const { version } = await preferredNodeVersion({
    files: ['naverc/.naverc'],
    cwd: FIXTURES_DIR,
  })
  t.is(version, TEST_VERSION)
})

test('"files" option validates filenames', async (t) => {
  const file = fileURLToPath(new URL(import.meta.url))
  await t.throwsAsync(preferredNodeVersion({ files: [file] }))
})

test('"files" option has priority', async (t) => {
  const { version } = await preferredNodeVersion({
    files: [`${FIXTURES_DIR}/priority/subdir/.nvmrc`],
    cwd: `${FIXTURES_DIR}/priority`,
  })
  t.is(version, TEST_VERSION)
})

test('"files" option ignores non-existing files', async (t) => {
  const { version } = await preferredNodeVersion({
    files: ['does_not_exist'],
    cwd: `${FIXTURES_DIR}/nvmrc`,
  })
  t.is(version, TEST_VERSION)
})

test('"files" option ignores directory', async (t) => {
  const helpersDir = fileURLToPath(new URL('helpers', import.meta.url))
  const { version } = await preferredNodeVersion({
    files: [helpersDir],
    cwd: `${FIXTURES_DIR}/nvmrc`,
  })
  t.is(version, TEST_VERSION)
})

test('NODE_VERSION_FILES is exported', (t) => {
  t.true(Array.isArray(NODE_VERSION_FILES))
  t.not(NODE_VERSION_FILES.length, 0)
  t.is(typeof NODE_VERSION_FILES[0], 'string')
})
