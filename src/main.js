import nodeVersionAlias from 'node-version-alias'

import { getError } from './error.js'
import { findVersion } from './find.js'
import { getOpts } from './options.js'

// Get the preferred Node.js version of a user or project by looking up its
// `.nvmrc` (or similar files) or `package.json` `engines.node`.
export const preferredNodeVersion = async function (opts) {
  const { cwd, globalOpt, nodeVersionAliasOpts } = getOpts(opts)
  const { filePath, envVariable, rawVersion } = await findVersion({
    cwd,
    globalOpt,
  })

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
