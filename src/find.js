import { getVersionEnvVariable } from './env.js'
import { loadVersionFile } from './load.js'
import { getFilePath } from './path.js'

// Retrieve Node.js version before normalization
export const findVersion = async function (cwd) {
  const { filePath, rawVersion } = await getVersionFile(cwd)

  if (rawVersion !== undefined) {
    return { filePath, rawVersion }
  }

  return getVersionEnvVariable()
}

// Retrieve Node.js version file
const getVersionFile = async function (cwd) {
  const filePath = await getFilePath(cwd)

  if (filePath === undefined) {
    return {}
  }

  const rawVersion = await loadVersionFile(filePath)
  return { filePath, rawVersion }
}
