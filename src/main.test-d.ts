import preferredNodeVersion, {
  Options,
  PreferredNodeVersion,
  SemverVersion,
} from 'preferred-node-version'
import {
  expectError,
  expectType,
  expectAssignable,
  expectNotAssignable,
} from 'tsd'

const result = await preferredNodeVersion()

await preferredNodeVersion({})
expectAssignable<Options>({})
expectError(await preferredNodeVersion(true))
expectError(await preferredNodeVersion({ unknown: true }))

await preferredNodeVersion({ cwd: '.' })
expectAssignable<Options>({ cwd: '.' })
expectAssignable<Options>({ cwd: new URL('file://example.com') })
expectError(await preferredNodeVersion({ cwd: true }))

preferredNodeVersion({ global: true })
expectAssignable<Options>({ global: true })
expectError(preferredNodeVersion({ global: 'true' }))

await preferredNodeVersion({ mirror: 'https://example.com' })
expectAssignable<Options>({ mirror: 'https://example.com' })
expectError(await preferredNodeVersion({ mirror: true }))

preferredNodeVersion({ fetch: true })
preferredNodeVersion({ fetch: undefined })
expectAssignable<Options>({ fetch: true })
expectError(preferredNodeVersion({ fetch: 'true' }))

expectAssignable<SemverVersion>('1.2.3')
expectAssignable<SemverVersion>('0.0.1')
expectAssignable<SemverVersion>('10.10.10')
expectAssignable<SemverVersion>('1.2.3-beta')
expectNotAssignable<SemverVersion>('1.2.a')
expectNotAssignable<SemverVersion>('1.2')
expectNotAssignable<SemverVersion>('1')

expectType<PreferredNodeVersion>(result)
const { version, rawVersion, filePath, envVariable } = result
expectType<SemverVersion | undefined>(version)
expectType<string | undefined>(rawVersion)
expectType<string | undefined>(filePath)
expectType<string | undefined>(envVariable)
