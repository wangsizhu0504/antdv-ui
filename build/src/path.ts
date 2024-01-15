import { resolve } from 'node:path'

export const projRoot = resolve(__dirname, '..', '..')
export const pkgRoot = resolve(projRoot, 'packages')
export const compRoot = resolve(pkgRoot, 'components')
export const themeRoot = resolve(pkgRoot, 'theme')
export const hookRoot = resolve(pkgRoot, 'hooks')
export const versionRoot = resolve(pkgRoot, 'version')
export const localeRoot = resolve(pkgRoot, 'locale')
export const directiveRoot = resolve(pkgRoot, 'directives')
export const utilRoot = resolve(pkgRoot, 'utils')

export const antdRoot = resolve(pkgRoot, 'antdv-ui')

export const buildRoot = resolve(projRoot, 'build')

/** `/dist` */
export const buildOutput = resolve(projRoot, 'dist')
/** `/dist/antdv-ui` */
export const antdOutput = resolve(buildOutput, 'antdv-ui')

export const projPackage = resolve(projRoot, 'package.json')
export const antdPackage = resolve(antdRoot, 'package.json')
