import normalizeNodeVersion from 'normalize-node-version'

import { getVersionRange } from './alias.js'
import { getVersionEnvVariable } from './env.js'
import { getVersionFile } from './file.js'
import { getOpts } from './options.js'

export const preferredNodeVersion = async function (opts) {
  const { cwd, ...normalizeOpts } = getOpts(opts)
  const { filePath, envVariable, rawVersion } = await findVersion(cwd)

  if (rawVersion === undefined) {
    return {}
  }

  const versionRange = getVersionRange(rawVersion)
  const version = await normalizeNodeVersion(versionRange, {
    ...normalizeOpts,
    cwd,
  })
  return { filePath, envVariable, rawVersion, versionRange, version }
}

const findVersion = async function (cwd) {
  const { filePath, rawVersion } = await getVersionFile(cwd)

  if (rawVersion !== undefined) {
    return { filePath, rawVersion }
  }

  return getVersionEnvVariable()
}

// We do not use `export default` because Babel transpiles it in a way that
// requires CommonJS users to `require(...).default` instead of `require(...)`.
module.exports = preferredNodeVersion
