import { validRange } from 'semver'

import { getLts } from './lts.js'
import { getNvmSystemVersion, getNvmCustomAlias } from './nvm.js'

// Most Node.js version managers allow aliases like `lts/*` or `latest`
export const nodeVersionAlias = async function (rawVersion, allNodeOpts) {
  const versionRange = await getCommonAlias(rawVersion)

  if (versionRange !== undefined) {
    return versionRange
  }

  const versionRangeA = await getAlias(rawVersion, allNodeOpts)

  if (versionRangeA !== undefined) {
    return versionRangeA
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

const getAlias = function (rawVersion, allNodeOpts) {
  if (rawVersion.startsWith('lts')) {
    return getLts(rawVersion, allNodeOpts)
  }

  if (validRange(rawVersion) !== null) {
    return rawVersion
  }

  return getNvmCustomAlias(rawVersion)
}
