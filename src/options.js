import { normalize } from 'path'
import { fileURLToPath } from 'url'

import isPlainObj from 'is-plain-obj'

// Normalize options and assign default values
export const getOpts = function (opts = {}) {
  if (!isPlainObj(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }

  const { cwd = '.', global: globalOpt = false, fetch: fetchOpt, mirror } = opts
  const cwdA = normalizeCwd(cwd)
  const nodeVersionAliasOpts = { fetch: fetchOpt, mirror }
  return { cwd: cwdA, globalOpt, nodeVersionAliasOpts }
}

const normalizeCwd = function (cwd) {
  if (objectToString.call(cwd) === '[object URL]') {
    return fileURLToPath(cwd)
  }

  if (typeof cwd !== 'string') {
    throw new TypeError(`Option "cwd" must be a string or a URL: ${cwd}`)
  }

  return normalize(cwd)
}

const { toString: objectToString } = Object.prototype
