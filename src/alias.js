import { validRange } from 'semver'

import { getNvmSystemVersion, getNvmCustomAlias } from './nvm.js'

// Most Node.js version managers allow aliases like `lts/*` or `latest`
export const nodeVersionAlias = async function (rawVersion) {
  const versionRange = await getCommonAlias(rawVersion)

  if (versionRange !== undefined) {
    return versionRange
  }

  if (validRange(rawVersion) !== null) {
    return rawVersion
  }

  const customAlias = await getNvmCustomAlias(rawVersion)

  if (customAlias !== undefined) {
    return customAlias
  }

  throw new Error(`Invalid Node.js version: ${rawVersion}`)
}

const getCommonAlias = function (rawVersion) {
  const versionRange = ALIASES[rawVersion]

  if (versionRange === undefined) {
    return
  }

  if (typeof versionRange !== 'function') {
    return versionRange
  }

  return versionRange()
}

const ALIASES = {
  // Latest version (nave, nvm-windows, n, nvs, nodebrew, nodist, fish-nvm)
  latest: '*',
  // Latest version (nvm, nave, nodebrew)
  stable: '*',
  // Latest version (nvm)
  node: '*',
  // Latest version (n, fish-nvm)
  current: '*',
  // Version if nvm was not installed
  system: getNvmSystemVersion,
  // Alias from nvm. Now that iojs is merged to Node.js, it is always this
  // version.
  iojs: '4.0.0',
  // Old deprecated nvm alias
  unstable: '0.11',
}
