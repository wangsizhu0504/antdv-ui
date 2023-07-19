import path from 'node:path'
import { mkdir, readFile, writeFile } from 'node:fs/promises'
import consola from 'consola'
import glob from 'fast-glob'
import pc from 'picocolors'
import { Project } from 'ts-morph'
import {
  antdRoot,
  buildOutput,

  projRoot,
} from '../path'
import {
  excludeFiles,
  pathRewriter,
} from '../utils'
import type { CompilerOptions, SourceFile } from 'ts-morph'

const TSCONFIG_PATH = path.resolve(projRoot, 'tsconfig.web.json')
const outDir = path.resolve(buildOutput, 'types')

/**
 * fork = require( https://github.com/egoist/vue-dts-gen/blob/main/src/index.ts
 */
export const generateTypesDefinitions = async () => {
  const compilerOptions: CompilerOptions = {
    allowJs: true,
    emitDeclarationOnly: true,
    declaration: true,
    outDir,
    baseUrl: projRoot,
    preserveSymlinks: true,
    skipLibCheck: true,
    noImplicitAny: false,
  }
  const project = new Project({
    compilerOptions,
    tsConfigFilePath: TSCONFIG_PATH,
    skipAddingFilesFromTsConfig: true,
  })

  const sourceFiles = await addSourceFiles(project)
  consola.success('Added source files')

  typeCheck(project)
  consola.success('Type check passed!')

  await project.emit({
    emitOnlyDtsFiles: true,
  })

  const tasks = sourceFiles.map(async (sourceFile) => {
    const relativePath = path.relative(antdRoot, sourceFile.getFilePath())
    consola.trace(
      pc.yellow(
        `Generating types file: ${pc.bold(relativePath)}`,
      ),
    )

    const emitOutput = sourceFile.getEmitOutput()
    const emitFiles = emitOutput.getOutputFiles()
    if (emitFiles.length === 0)
      throw new Error(`Emit no file: ${pc.bold(relativePath)}`)

    const subTasks = emitFiles.map(async (outputFile) => {
      const filepath = outputFile.getFilePath()
      await mkdir(path.dirname(filepath), {
        recursive: true,
      })

      await writeFile(
        filepath,
        pathRewriter('esm')(outputFile.getText()),
        'utf8',
      )
    })
    await Promise.all(subTasks)
  })
  consola.success(
    pc.green(' Types file generated success'),
  )
  await Promise.all(tasks)
}

async function addSourceFiles(project: Project) {
  project.addSourceFileAtPath(path.resolve(projRoot, 'typings/env.d.ts'))

  const globSourceFile = '**/*.{js?(x),ts?(x)}'
  const antdPaths = excludeFiles(
    await glob(globSourceFile, {
      cwd: antdRoot,
      onlyFiles: true,
    }),
  )
  const sourceFiles: SourceFile[] = []
  await Promise.all([
    ...antdPaths.map(async (file) => {
      const content = await readFile(path.resolve(antdRoot, file), 'utf-8')
      sourceFiles.push(
        project.createSourceFile(path.resolve(antdRoot, file), content, { overwrite: true }),
      )
    }),
  ])

  return sourceFiles
}

function typeCheck(project: Project) {
  const diagnostics = project.getPreEmitDiagnostics()
  if (diagnostics.length > 0) {
    consola.error(project.formatDiagnosticsWithColorAndContext(diagnostics))
    const err = new Error('Failed to generate dts.')
    consola.error(err)
    throw err
  }
}
