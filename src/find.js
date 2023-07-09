import { getVersionEnvVariable } from './env.js'
import { loadVersionFile } from './load.js'
import { getFilePath } from './path.js'

// Retrieve Node.js version before normalization
export const findVersion = async ({ cwd, globalOpt, files }) => {
  const { filePath, rawVersion } = await getVersionFile({
    cwd,
    globalOpt,
    files,
  })

  if (rawVersion !== undefined) {
    return { filePath, rawVersion }
  }

  return getVersionEnvVariable()
}

// Retrieve Node.js version file
const getVersionFile = async ({ cwd, globalOpt, files }) => {
  const filePath = await getFilePath({ cwd, globalOpt, files })

  if (filePath === undefined) {
    return {}
  }

  const rawVersion = await loadVersionFile(filePath)
  return { filePath, rawVersion }
}
