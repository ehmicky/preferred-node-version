import { promises as fs } from 'fs'
import { version as processVersion } from 'process'

import normalizeNodeVersion from 'normalize-node-version'

import { replaceAliases } from './alias.js'
import { findNodeVersionFile } from './find.js'
import { getOpts } from './options.js'
import { isPackageJson, loadPackageJson } from './package.js'

export const preferredNodeVersion = async function (opts) {
  const { cwd, ...normalizeOpts } = getOpts(opts)
  const nodeVersionFile = await findNodeVersionFile(cwd)

  if (nodeVersionFile === undefined) {
    return processVersion
  }

  const versionRange = loadNodeVersionFile(nodeVersionFile)
  const versionRangeA = replaceAliases(versionRange)
  const version = normalizeNodeVersion(versionRangeA, { ...normalizeOpts, cwd })
  return version
}

const loadNodeVersionFile = async function (nodeVersionFile) {
  const content = await fs.readFile(nodeVersionFile, 'utf8')
  const contentA = content.trim()

  if (!isPackageJson(nodeVersionFile)) {
    return contentA
  }

  return loadPackageJson(contentA)
}

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = preferredNodeVersion
