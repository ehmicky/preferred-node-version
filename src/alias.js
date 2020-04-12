// nvm allows several aliases like `lts/*`
export const getVersionRange = function (rawVersion) {
  const versionRange = ALIASES[rawVersion]

  if (versionRange === undefined) {
    return rawVersion
  }

  return versionRange
}

const ALIASES = {
  node: '*',
  stable: '*',
  unstable: '0.11',
}
