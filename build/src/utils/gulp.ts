import type { TaskFunction } from 'gulp'
import { buildRoot } from '../path'
import { run } from './process'

export function withTaskName<T extends TaskFunction>(name: string, fn: T) {
  return Object.assign(fn, { displayName: name })
}

export function runTask(name: string) {
  return withTaskName(`shellTask:${name}`, () =>
    run(`pnpm run start ${name}`, buildRoot))
}
