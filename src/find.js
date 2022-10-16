import { getVersionEnvVariable } from './env.js'
import { loadVersionFile } from './load.js'
import { getFilePath } from './path.js'

// Retrieve Node.js version before normalization
export const findVersion = async function (cwd, globalOpt) {
  const { filePath, rawVersion } = await getVersionFile(cwd, globalOpt)

  if (rawVersion !== undefined) {
    return { filePath, rawVersion }
  }

  return getVersionEnvVariable()
}

// Retrieve Node.js version file
const getVersionFile = async function (cwd, globalOpt) {
  const filePath = await getFilePath(cwd, globalOpt)

  if (filePath === undefined) {
    return {}
  }

  const rawVersion = await loadVersionFile(filePath)
  return { filePath, rawVersion }
}
