// Add more contexts to errors
export const getError = (error, filePath, envVariable) => {
  const errorPrefix = getErrorPrefix(filePath, envVariable)
  error.message = `In ${errorPrefix}: ${error.message}`
  return error
}

const getErrorPrefix = (filePath, envVariable) => {
  if (filePath !== undefined) {
    return `file ${filePath}`
  }

  return `environment variable ${envVariable}`
}
