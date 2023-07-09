import nodeVersionAlias from 'node-version-alias'

import { getError } from './error.js'
import { findVersion } from './find.js'
import { getOpts } from './options.js'

export { NODE_VERSION_FILES } from './load.js'

// Get the preferred Node.js version of a user or project by looking up its
// `.nvmrc` (or similar files) or `package.json` `engines.node`.
const preferredNodeVersion = async (opts) => {
  const { cwd, globalOpt, files, nodeVersionAliasOpts } = getOpts(opts)
  const { filePath, envVariable, rawVersion } = await findVersion({
    cwd,
    globalOpt,
    files,
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

export default preferredNodeVersion
