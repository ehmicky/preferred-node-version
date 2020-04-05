import { cwd as getCwd } from 'process'

export const getOpts = function (opts = {}) {
  const optsA = { ...DEFAULT_OPTS, ...opts }
  return optsA
}

const DEFAULT_OPTS = {
  cwd: getCwd(),
}
