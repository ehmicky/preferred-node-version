import isPlainObj from 'is-plain-obj'

// Retrieve `engines.node` from `package.json`
export const loadPackageJson = function (content) {
  if (!seemsValidPackageJson(content)) {
    return
  }

  const packageJson = safeJsonParse(content)

  if (!objectHasEnginesNode(packageJson)) {
    return
  }

  return packageJson.engines.node
}

// Performance optimization. Quickly check if `package.json` looks like it has
// an `engines.node` before parsing it
const seemsValidPackageJson = function (content) {
  return PACKAGE_JSON_VALID_WORDS.every((word) => content.includes(word))
}

const PACKAGE_JSON_VALID_WORDS = ['"engines"', '"node"']

const safeJsonParse = function (content) {
  try {
    return JSON.parse(content)
  } catch {}
}

const objectHasEnginesNode = function (packageJson) {
  return (
    isPlainObj(packageJson) &&
    isPlainObj(packageJson.engines) &&
    typeof packageJson.engines.node === 'string' &&
    packageJson.engines.node.trim() !== ''
  )
}
