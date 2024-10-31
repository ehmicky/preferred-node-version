import { expectAssignable, expectNotAssignable, expectType } from 'tsd'

import preferredNodeVersion, {
  NODE_VERSION_FILES,
  type Options,
  type PreferredNodeVersion,
  type SemverVersion,
} from 'preferred-node-version'

const result = await preferredNodeVersion()

await preferredNodeVersion({})
expectAssignable<Options>({})
// @ts-expect-error
await preferredNodeVersion(true)
// @ts-expect-error
await preferredNodeVersion({ unknown: true })

await preferredNodeVersion({ cwd: '.' })
expectAssignable<Options>({ cwd: '.' })
expectAssignable<Options>({ cwd: new URL('file://example.com') })
// @ts-expect-error
await preferredNodeVersion({ cwd: true })

await preferredNodeVersion({ global: true })
expectAssignable<Options>({ global: true })
// @ts-expect-error
await preferredNodeVersion({ global: 'true' })

await preferredNodeVersion({ files: ['path'] })
expectAssignable<Options>({ files: ['path'] })
// @ts-expect-error
await preferredNodeVersion({ files: 'path' })
// @ts-expect-error
await preferredNodeVersion({ files: [true] })

await preferredNodeVersion({ mirror: 'https://example.com' })
expectAssignable<Options>({ mirror: 'https://example.com' })
// @ts-expect-error
await preferredNodeVersion({ mirror: true })

await preferredNodeVersion({ signal: AbortSignal.abort() })
expectAssignable<Options>({ signal: AbortSignal.abort() })
// @ts-expect-error
await preferredNodeVersion({ signal: 'signal' })

await preferredNodeVersion({ fetch: true })
await preferredNodeVersion({ fetch: undefined })
expectAssignable<Options>({ fetch: true })
// @ts-expect-error
await preferredNodeVersion({ fetch: 'true' })

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

expectType<string[]>(NODE_VERSION_FILES)
