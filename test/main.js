import test from 'ava'
import isPlainObj from 'is-plain-obj'

import preferredNodeVersion from '../src/main.js'

import { setHomeDir, unsetHomeDir } from './helpers/main.js'

test.serial('Returns an empty object if nothing was found', async (t) => {
  setHomeDir('/')

  try {
    const result = await preferredNodeVersion({ cwd: '/' })
    t.true(isPlainObj(result))
    t.is(Object.keys(result).length, 0)
  } finally {
    unsetHomeDir()
  }
})
