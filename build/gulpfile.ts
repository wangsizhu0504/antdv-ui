import { mkdir } from 'node:fs/promises'
import { parallel, series } from 'gulp'
import {
  antdOutput,
} from './src/path'
import { run, runTask, withTaskName } from './src'

export default series(
  withTaskName('clean', () => run('pnpm run clean')),
  withTaskName('createOutput', () => mkdir(antdOutput, { recursive: true })),

  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle'),
    runTask('generateTypesDefinitions'),
  ),

  parallel(
    runTask('copyTypesDefinitions'),
    runTask('copyFiles'),
  ),
)

export * from './src'
