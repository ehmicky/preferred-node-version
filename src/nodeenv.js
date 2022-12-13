// Load .nodeenvrc
// The format is INI. However there are no well-maintained INI parsed in Node.js
// so we instead do a hacky string search.
export const loadNodeEnvRc = (content) => {
  const result = VERSION_REGEXP.exec(content)

  if (result === null) {
    return
  }

  return result[1]
}

// Matches a line with `node = VERSION`
// Ignores whitespace, case and quotes.
const VERSION_REGEXP = /^\s*node\s*=\s*["']?([^\s"']+)["']?\s*$/imu
