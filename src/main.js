import normalizeNodeVersion from 'normalize-node-version'

import { nodeVersionAlias } from './alias.js'
import { getError } from './error.js'
import { findVersion } from './find.js'
import { getOpts } from './options.js'

export const preferredNodeVersion = async function (opts) {
  const { cwd, normalizeOpts, allNodeOpts } = getOpts(opts)
  const { filePath, envVariable, rawVersion } = await findVersion(cwd)

  if (rawVersion === undefined) {
    return {}
  }

  try {
    const versionRange = await nodeVersionAlias(rawVersion, allNodeOpts)
    const version = await normalizeNodeVersion(versionRange, normalizeOpts)
    return { filePath, envVariable, rawVersion, versionRange, version }
  } catch (error) {
    throw getError(error, filePath, envVariable)
  }
}

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = preferredNodeVersion
