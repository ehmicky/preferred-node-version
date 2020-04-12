import { promises as fs } from 'fs'

// I/O errors are silently skipped
export const safeReadFile = async function (path) {
  try {
    return await fs.readFile(path, 'utf8')
  } catch {
    return ''
  }
}

export const isExistingFile = async function (path) {
  try {
    const fileStat = await fs.stat(path)
    return fileStat.isFile()
  } catch (error) {
    return false
  }
}
