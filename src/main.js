import { promises as fs } from 'fs'

import normalizeNodeVersion from 'normalize-node-version'

import { getVersionRange } from './alias.js'
import { getOpts } from './options.js'
import { isPackageJson, loadPackageJson } from './package.js'
import { getFilePath } from './path.js'

export const preferredNodeVersion = async function (opts) {
  const { cwd, ...normalizeOpts } = getOpts(opts)
  const filePath = await getFilePath(cwd)

  if (filePath === undefined) {
    return {}
  }

  const rawVersion = getRawVersion(filePath)
  const versionRange = getVersionRange(rawVersion)
  const version = await normalizeNodeVersion(versionRange, {
    ...normalizeOpts,
    cwd,
  })
  return { filePath, rawVersion, versionRange, version }
}

const getRawVersion = async function (nodeVersionFile) {
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
