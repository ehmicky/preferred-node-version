import isPlainObj from 'is-plain-obj'

// Normalize options and assign default values
export const getOpts = function (opts = {}) {
  if (!isPlainObj(opts)) {
    throw new TypeError(`Options must be a plain object: ${opts}`)
  }

  const { cwd = '.', global: globalOpt = false, fetch: fetchOpt, mirror } = opts
  const nodeVersionAliasOpts = { fetch: fetchOpt, mirror }
  return { cwd, globalOpt, nodeVersionAliasOpts }
}
