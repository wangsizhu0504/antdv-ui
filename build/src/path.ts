import { resolve } from 'node:path'

export const projRoot = resolve(__dirname, '..', '..')
export const antdRoot = resolve(projRoot, 'components')

export const buildRoot = resolve(projRoot, 'build')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')
/** `/dist/antdv` */
export const antdOutput = resolve(buildOutput, 'antdv')

export const projPackage = resolve(projRoot, 'package.json')
export const antdPackage = resolve(antdRoot, 'package.json')
