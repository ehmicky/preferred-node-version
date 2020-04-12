import allNodeVersions from 'all-node-versions'

// Normalize `lts`, `lts/*`, `lts/-num` and `lts/name` aliases used by
// `.nvmrc` and others
export const getLts = async function (rawVersion, allNodeOpts) {
  const majors = await getLtsMajors(allNodeOpts)

  // Can happen when using some Node.js mirrors like Nightly
  if (majors.length === 0) {
    return '*'
  }

  const major = getLtsMajor(rawVersion, majors)

  if (major === undefined) {
    return
  }

  return major.latest
}

const getLtsMajors = async function (allNodeOpts) {
  const { majors } = await allNodeVersions(allNodeOpts)
  return majors.filter(isLts)
}

const isLts = function ({ lts }) {
  return lts !== undefined
}

const getLtsMajor = function (rawVersion, majors) {
  if (LATEST_LTS.has(rawVersion)) {
    return majors[0]
  }

  const result = NUMBER_LTS_REGEXP.exec(rawVersion)

  if (NUMBER_LTS_REGEXP.test(rawVersion)) {
    return majors[result[1] - 1]
  }

  return getNamedLts(rawVersion, majors)
}

// Those aliases mean the latest LTS
// `lts/*` is used by nvm, nave, nvs
// `lts` is used by n, nave, nvs, fish-nvm
// `lts/-0` is used by nvm
const LATEST_LTS = new Set(['lts', 'lts/*', 'lts/-0'])

// `lts/-num` means the numth latest LTS.
// Used by nvm
const NUMBER_LTS_REGEXP = /^lts\/-(\d+)$/u

// `lts/name` means a specific LTS named likewise.
// Used by nvm, nave, nvs, fish-nvm
const getNamedLts = function (rawVersion, majors) {
  const name = rawVersion.replace(LTS_PREFIX, '').toLowerCase()
  return majors.find(({ lts }) => lts === name)
}

const LTS_PREFIX = 'lts/'
