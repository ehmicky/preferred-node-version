// Load .nodeenvrc
// The format is INI. However there are no well-maintained INI parsed in Node.js
// so we instead do a hacky string search.
export const loadNodeEnvRc = function (content) {
  const result = VERSION_REGEXP.exec(content)

  if (result === null) {
    return
  }

  return result[1].trim()
}

// Matches a line with `node = VERSION`
// Ignores whitespace, case and quotes.
const VERSION_REGEXP = /^\s*node\s*=\s*["']?([^\s"']+)["']?\s*$/imu
