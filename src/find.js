import { promises as fs } from 'fs'
import { join } from 'path'

import pLocate from 'p-locate'

import { getSearchDirs } from './dirs.js'
import {
  isPackageJson,
  fileHasEnginesNode,
  PACKAGE_JSON_FILE,
} from './package.js'

// Find any file indicating the current directory's Node.js version
// Use p-locate instead of find-up for performance (more parallelism)
export const findNodeVersionFile = function (cwd) {
  const searchFiles = getSearchFiles(cwd)
  return pLocate(searchFiles, isNodeVersionFile)
}

const getSearchFiles = function (cwd) {
  const searchDirs = getSearchDirs(cwd)
  const searchFiles = searchDirs.flatMap((searchDir) =>
    // eslint-disable-next-line max-nested-callbacks
    NODE_VERSION_FILES.map((filename) => join(searchDir, filename)),
  )
  return searchFiles
}

// List of files indicating Node.js version
const NODE_VERSION_FILES = [
  '.naverc',
  '.node-version',
  '.nvmrc',
  PACKAGE_JSON_FILE,
]

// Check if the file exists.
// For `package.json`, also checks it has an `engines.node`.
const isNodeVersionFile = async function (path) {
  if (!(await isExistingFile(path))) {
    return false
  }

  if (isPackageJson(path) && !(await fileHasEnginesNode(path))) {
    return false
  }

  return true
}

const isExistingFile = async function (path) {
  try {
    const fileStat = await fs.stat(path)
    return fileStat.isFile()
  } catch (error) {
    return false
  }
}
