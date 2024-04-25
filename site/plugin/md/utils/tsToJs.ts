import { transformSync } from '@babel/core'

// import { ESLint } from 'eslint'
import transformTypescript from '@babel/plugin-transform-typescript'

// import baseConfig from '../../../../eslint.config.js'

// const engine = new ESLint({
//   fix: true,
//   useEslintrc: false,
//   baseConfig,
// })
async function tsToJs(content: string): Promise<string> {
  if (!content)
    return ''

  const { code } = transformSync(content, {
    configFile: false,
    plugins: [
      [
        transformTypescript,
        {
          isTSX: false,
        },
      ],
    ],
  })
  // const report = await engine.lintText(code)
  // let output = report[0].output
  // output = output ? output.trim() : output
  return code!
}

export default tsToJs
