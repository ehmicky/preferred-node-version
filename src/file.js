import { promises as fs } from 'fs'

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
  const content = await fs.readFile(nodeVersionFile, 'utf8')
  const contentA = content.trim()

  if (!isPackageJson(nodeVersionFile)) {
    return contentA
  }

  return loadPackageJson(contentA)
}
