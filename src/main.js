import nodeVersionAlias from 'node-version-alias'

import { getError } from './error.js'
import { findVersion } from './find.js'
import { getOpts } from './options.js'

export const preferredNodeVersion = async function (opts) {
  const { cwd, nodeVersionAliasOpts } = getOpts(opts)
  const { filePath, envVariable, rawVersion } = await findVersion(cwd)

  if (rawVersion === undefined) {
    return {}
  }

  try {
    const version = await nodeVersionAlias(rawVersion, nodeVersionAliasOpts)
    return { filePath, envVariable, rawVersion, version }
  } catch (error) {
    throw getError(error, filePath, envVariable)
  }
}

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = preferredNodeVersion
