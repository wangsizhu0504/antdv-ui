import process from 'node:process'
import consola from 'consola'

export function errorAndExit(err: Error): never {
  consola.error(err)
  process.exit(1)
}
