import { normalize } from 'node:path'
import { fileURLToPath } from 'node:url'

import isPlainObj from 'is-plain-obj'

// Normalize options and assign default values
export const getOpts = (opts = {}) => {
  if (!isPlainObj(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }

  const {
    cwd = '.',
    global: globalOpt = false,
    files = [],
    fetch: fetchOpt,
    mirror,
    signal,
  } = opts
  const cwdA = normalizeCwd(cwd)
  validateFiles(files)
  const nodeVersionAliasOpts = { fetch: fetchOpt, mirror, signal }
  return { cwd: cwdA, globalOpt, files, nodeVersionAliasOpts }
}

const normalizeCwd = (cwd) => {
  if (objectToString.call(cwd) === '[object URL]') {
    return fileURLToPath(cwd)
  }

  if (typeof cwd !== 'string') {
    throw new TypeError(`Option "cwd" must be a string or a URL: ${cwd}`)
  }

  return normalize(cwd)
}

const { toString: objectToString } = Object.prototype

const validateFiles = (files) => {
  if (!Array.isArray(files) || !files.every(isDefinedString)) {
    throw new TypeError(`Option "files" must an array of file paths: ${files}`)
  }
}

const isDefinedString = (file) => typeof file === 'string' && file !== ''
