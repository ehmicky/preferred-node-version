import { homedir as getHomeDir } from 'os'
import { normalize, dirname } from 'path'
import { env } from 'process'

// Retrieve list of directories to search:
//   - current directory
//   - any parent directory
//   - home directory
// If `global` option is `true`, only home directory is searched
export const getSearchDirs = function ({ cwd, globalOpt }) {
  // For tests only
  const homeDir = env.TEST_HOME_DIR === undefined ? HOME_DIR : env.TEST_HOME_DIR

  if (globalOpt) {
    return [homeDir]
  }

  const cwdA = normalize(cwd)
  const parentDirs = getParentDirs(cwdA)

  if (parentDirs.includes(homeDir)) {
    return parentDirs
  }

  return [...parentDirs, homeDir]
}

const getParentDirs = function (dir) {
  const parentDir = dirname(dir)
  const parentDirs = parentDir === dir ? [] : getParentDirs(parentDir)
  return [dir, ...parentDirs]
}

const HOME_DIR = getHomeDir()
