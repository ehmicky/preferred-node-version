import { join } from 'node:path'

import pLocate from 'p-locate'
import { isFile } from 'path-type'

import { getSearchDirs } from './dirs.js'
import { loadVersionFile, NODE_VERSION_FILES } from './load.js'

// Find any file indicating the current directory's Node.js version
// Use p-locate instead of find-up for performance (more parallelism)
export const getFilePath = (cwd, globalOpt) => {
  const searchFiles = getSearchFiles(cwd, globalOpt)
  return pLocate(searchFiles, isNodeVersionFile)
}

const getSearchFiles = (cwd, globalOpt) => {
  const searchDirs = getSearchDirs(cwd, globalOpt)
  const searchFiles = searchDirs.flatMap(addNodeVersionFiles)
  return searchFiles
}

const addNodeVersionFiles = (searchDir) =>
  NODE_VERSION_FILES.map((filename) => join(searchDir, filename))

// Check if the file exists and contains a Node.js version
const isNodeVersionFile = async (filePath) =>
  (await isFile(filePath)) && (await loadVersionFile(filePath)) !== undefined
