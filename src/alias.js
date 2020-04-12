import { execFile } from 'child_process'
import { platform } from 'process'
import { promisify } from 'util'

import { validRange } from 'semver'

const pExecFile = promisify(execFile)

// Most Node.js version managers allow aliases like `lts/*` or `latest`
export const nodeVersionAlias = async function (rawVersion) {
  const versionRange = ALIASES[rawVersion]

  if (versionRange !== undefined) {
    return versionRange
  }

  if (validRange(rawVersion) !== null) {
    return rawVersion
  }

  const customAlias = await getCustomAlias(rawVersion)

  if (customAlias !== undefined) {
    return customAlias
  }

  throw new Error(`Invalid Node.js version: ${rawVersion}`)
}

const ALIASES = {
  // Latest version (nave, nvm-windows, n, nvs, nodebrew, nodist, fish-nvm)
  latest: '*',
  // Latest version (nvm, nave, nodebrew)
  stable: '*',
  // Latest version (nvm)
  node: '*',
  // Latest version (n, fish-nvm)
  current: '*',
  // Alias from nvm. Now that iojs is merged to Node.js, it is always this
  // version.
  iojs: '4.0.0',
  // Old deprecated nvm alias
  unstable: '0.11',
}

// Retrieve nvm custom alias
const getCustomAlias = function (rawVersion) {
  return runNvmCommand(`nvm_alias ${rawVersion}`)
}

// nvm requires Bash and reading the user's `.profile` to source `nvm.sh`
const runNvmCommand = async function (command) {
  if (platform === 'win32') {
    return ''
  }

  try {
    const { stdout } = await pExecFile('bash', ['-ic', command])
    return stdout.trim()
    // Among possible errors:
    //   - Setup issue: Bash or nvm not installed, Bash setup error, etc.
    //   - Alias does not exist
  } catch (error) {
    return ''
  }
}
