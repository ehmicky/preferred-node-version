import { join } from 'path'

import pLocate from 'p-locate'

import { getSearchDirs } from './dirs.js'
import { isExistingFile } from './fs.js'
import { loadVersionFile, NODE_VERSION_FILES } from './load.js'

// Find any file indicating the current directory's Node.js version
// Use p-locate instead of find-up for performance (more parallelism)
export const getFilePath = function (cwd) {
  const searchFiles = getSearchFiles(cwd)
  return pLocate(searchFiles, isNodeVersionFile)
}

const getSearchFiles = function (cwd) {
  const searchDirs = getSearchDirs(cwd)
  // TODO: replace with Array.flatMap() after dropping support for Node 10
  const searchFiles = [].concat(
    ...searchDirs.map((searchDir) =>
      // eslint-disable-next-line max-nested-callbacks
      NODE_VERSION_FILES.map((filename) => join(searchDir, filename)),
    ),
  )
  return searchFiles
}

// Check if the file exists and contains a Node.js version
const isNodeVersionFile = async function (filePath) {
  return (
    (await isExistingFile(filePath)) &&
    (await loadVersionFile(filePath)) !== undefined
  )
}
