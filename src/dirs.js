import { homedir } from 'os'
import { normalize, dirname } from 'path'

// Retrieve list of directories to search:
//   - current directory
//   - any parent directory
//   - home directory
export const getSearchDirs = function (cwd) {
  const cwdA = normalize(cwd)
  const parentDirs = getParentDirs(cwdA)

  if (parentDirs.includes(HOME_DIR)) {
    return parentDirs
  }

  return [...parentDirs, HOME_DIR]
}

const getParentDirs = function (dir) {
  const parentDir = dirname(dir)
  const parentDirs = parentDir === dir ? [] : getParentDirs(parentDir)
  return [dir, ...parentDirs]
}

const HOME_DIR = homedir()
