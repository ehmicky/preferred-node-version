// nvm allows several aliases like `lts/*`
export const replaceAliases = function (versionRange) {
  const aliasedVersionRange = ALIASES[versionRange]

  if (aliasedVersionRange === undefined) {
    return versionRange
  }

  return aliasedVersionRange
}

const ALIASES = {
  node: '*',
  stable: '*',
  unstable: '0.11',
}
