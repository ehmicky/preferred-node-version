import { promises as fs } from 'fs'

import isPlainObj from 'is-plain-obj'

// Check whether `package.json` file
export const isPackageJson = function (path) {
  return path.endsWith(PACKAGE_JSON_FILE)
}

export const PACKAGE_JSON_FILE = 'package.json'

// Check whether `package.json` file has `engines.node`
export const fileHasEnginesNode = async function (path) {
  const content = await fs.readFile(path, 'utf8')

  if (!seemsValidPackageJson(content)) {
    return false
  }

  return loadPackageJson(content) !== undefined
}

// Performance optimization. Quickly check if `package.json` looks like it has
// an `engines.node` before parsing it
const seemsValidPackageJson = function (content) {
  return PACKAGE_JSON_VALID_WORDS.every((word) => content.includes(word))
}

const PACKAGE_JSON_VALID_WORDS = ['"engines"', '"node"']

// Retrieve `engines.node` from `package.json`
export const loadPackageJson = function (content) {
  const packageJson = safeJsonParse(content)

  if (!objectHasEnginesNode(packageJson)) {
    return
  }

  return packageJson.engines.node
}

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
