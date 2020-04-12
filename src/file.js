import { safeReadFile } from './fs.js'
import { isPackageJson, loadPackageJson } from './package.js'
import { getFilePath } from './path.js'

// Retrieve Node.js version stored in environment variable
export const getVersionFile = async function (cwd) {
  const filePath = await getFilePath(cwd)

  if (filePath === undefined) {
    return {}
  }

  const rawVersion = await getRawVersion(filePath)
  return { filePath, rawVersion }
}

const getRawVersion = async function (nodeVersionFile) {
  const content = await safeReadFile(nodeVersionFile, 'utf8')
  const contentA = content.trim()

  if (!isPackageJson(nodeVersionFile)) {
    return contentA
  }

  return loadPackageJson(contentA)
}
