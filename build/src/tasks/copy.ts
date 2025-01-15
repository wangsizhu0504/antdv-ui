import type { TaskFunction } from 'gulp'
import type { Module } from '..'
import { copyFile, readdir } from 'node:fs/promises'
import path from 'node:path'
import { copy } from 'fs-extra'
import { parallel } from 'gulp'
import { buildConfig, withTaskName } from '..'
import {
  antdOutput,
  antdPackage,
  buildOutput,
  projRoot,
  themeRoot,
  versionRoot,
} from '../path'

async function copyJSONFiles(sourceDir: string, destDir: string[]) {
  const files = await readdir(sourceDir)

  for (const file of files) {
    const filePath = path.join(sourceDir, file)

    if (path.extname(filePath) === '.json' && file !== 'package.json') {
      await Promise.all(destDir.map((dir) => {
        const destFilePath = path.join(dir, file)
        return copyFile(filePath, destFilePath)
      }))
    }
  }
}

// 复制文件
export function copyFiles() {
  return Promise.all([
    copyFile(
      antdPackage,
      path.join(antdOutput, 'package.json'),
    ),
    // 将项目根目录的README.md复制到antdOutput目录下
    copyFile(
      path.resolve(projRoot, 'README.md'),
      path.resolve(antdOutput, 'README.md'),
    ),
    copyFile(
      path.resolve(projRoot, 'README.zh_CN.md'),
      path.resolve(antdOutput, 'README.zh_CN.md'),
    ),
    copyFile(
      path.resolve(projRoot, 'typings', 'volar.d.ts'),
      path.resolve(antdOutput, 'volar.d.ts'),
    ),
    copyFile(
      path.resolve(themeRoot, 'style', 'reset.css'),
      path.resolve(antdOutput, 'dist', 'reset.css'),
    ),
    copyJSONFiles(path.resolve(versionRoot), [
      path.resolve(antdOutput, 'es/version'),
      path.resolve(antdOutput, 'lib/version'),
    ]),
  ])
}

// 复制types文件
export const copyTypesDefinitions: TaskFunction = (done) => {
  const src = path.resolve(buildOutput, 'types', 'packages')
  const copyTypes = (module: Module) =>
    withTaskName(`copyTypes:${module}`, () =>
      copy(src, buildConfig[module].output.path, { overwrite: true }))

  return parallel(copyTypes('esm'), copyTypes('cjs'))(done)
}
