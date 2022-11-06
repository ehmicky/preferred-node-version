import { env } from 'node:process'

// Retrieve Node.js version stored in environment variable.
// Has less priority than version files because harder to localize to a specific
// project.
export const getVersionEnvVariable = function () {
  const envVariable = ENVIRONMENT_VARIABLES.find(isDefined)

  if (envVariable === undefined) {
    return {}
  }

  const rawVersion = getRawVersion(envVariable)
  return { envVariable, rawVersion }
}

const ENVIRONMENT_VARIABLES = [
  // nodist
  'NODIST_NODE_VERSION',
  // Netlify
  'NODE_VERSION',
  // nve-specific. Undocumented.
  'DEFAULT_NODE_VERSION',
]

const isDefined = function (envVariable) {
  const rawVersion = getRawVersion(envVariable)
  return typeof rawVersion === 'string' && rawVersion.trim() !== ''
}

const getRawVersion = function (envVariable) {
  return env[envVariable]
}
