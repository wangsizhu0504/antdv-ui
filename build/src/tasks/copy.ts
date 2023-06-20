import path from 'node:path'
import { copyFile, readdir } from 'node:fs/promises'
import { copy } from 'fs-extra'
import { parallel } from 'gulp'
import type { TaskFunction } from 'gulp'
import { buildConfig, withTaskName } from '..'
import type { Module } from '..'
import {
  antdOutput,
  antdPackage,
  antdRoot,
  buildOutput,
  projRoot,
} from '../path'

async function copyJSONFiles(sourceDir: string, destDir: string[]) {
  const files = await readdir(sourceDir)

  for (const file of files) {
    const filePath = path.join(sourceDir, file)

    if (path.extname(filePath) === '.json') {
      await Promise.all(destDir.map((dir) => {
        const destFilePath = path.join(dir, file)
        return copyFile(filePath, destFilePath)
      }))
    }
  }
}

// 复制文件
export const copyFiles = () =>
  Promise.all([
    copyFile(antdPackage, path.join(antdOutput, 'package.json')),
    // 将项目根目录的README.md复制到antdOutput目录下
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(antdOutput, 'README.md'),
    ),
    copyFile(
      path.resolve(projRoot, 'global.d.ts'),
      path.resolve(antdOutput, 'global.d.ts'),
    ),
    copyFile(path.resolve(antdRoot, 'style', 'reset.css'),
      path.resolve(antdOutput, 'dist', 'reset.css'),
    ),
    copyJSONFiles(path.resolve(antdRoot, 'version'), [
      path.resolve(antdOutput, 'es/version'),
      path.resolve(antdOutput, 'lib/version'),
    ]),
  ])

// 复制types文件
export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types', 'components')
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path, { overwrite: true }),
    )

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}
