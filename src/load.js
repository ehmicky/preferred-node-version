import { basename } from 'path'

import { safeReadFile } from './fs.js'
import { loadPackageJson } from './package.js'

// Load Node.js version file
export const loadVersionFile = async function (filePath) {
  const content = await safeReadFile(filePath, 'utf8')
  const contentA = content.trim()

  if (contentA === '') {
    return
  }

  const filename = basename(filePath)
  const loadFunction = LOAD_FUNCTIONS[filename]
  const rawVersion = await loadFunction(contentA)
  return rawVersion
}

// When whole version file content is the version itself
const identity = function (content) {
  return content
}

// List of files indicating Node.js version.
// Each file has its own way of locating the version.
const LOAD_FUNCTIONS = {
  // Used by n
  '.n-node-version': identity,
  // Used by nave
  '.naverc': identity,
  // Used by nvs
  '.node-version': identity,
  // Used by nvm and many other tools
  '.nvmrc': identity,
  // package.json `engines.node`
  'package.json': loadPackageJson,
}
export const NODE_VERSION_FILES = Object.keys(LOAD_FUNCTIONS)
