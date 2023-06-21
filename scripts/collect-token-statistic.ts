import path from 'node:path'
import chalk from 'chalk'
import { renderToString } from 'vue/server-renderer'

import fs from 'fs-extra'
import { glob } from 'glob'
import ProgressBar from 'progress'
import { createSSRApp, createVNode, defineComponent, ref } from 'vue'
import { statistic } from '../components/theme/util/statistic'
import { DesignTokenProvider } from '../components/theme/internal'
import seedToken from '../components/theme/themes/seed'

console.log(chalk.green('🔥 Collecting token statistics...'))

const EmptyElement = createVNode('div')

const styleFiles = glob.sync(
  path.join(
    process.cwd(),
    'components/!(version|config-provider|locale-provider|auto-complete|col|row|time-picker|)/style/index.?(ts|tsx)',
  ),
)

const bar = new ProgressBar('🚀 Collecting by component: [:bar] :component (:current/:total)', {
  complete: '=',
  incomplete: ' ',
  total: styleFiles.length,
})

styleFiles.forEach((file) => {
  const pathArr = file.split('/')
  const styleIndex = pathArr.lastIndexOf('style')
  const componentName = pathArr[styleIndex - 1]
  bar.tick(1, { component: componentName })
  let useStyle = () => {}
  if (file.includes('grid')) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { useColStyle, useRowStyle } = require(file)
    useStyle = () => {
      useRowStyle()
      useColStyle()
    }
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    useStyle = require(file).default
  }
  const Component = defineComponent({
    setup() {
      // @ts-expect-error
      useStyle(ref('file'), ref())
      return () => EmptyElement
    },
  })
  renderToString(
    createSSRApp({
      setup() {
        return () => createVNode(Component)
      },
    }),
  )
  // Render wireframe
  renderToString(
    createSSRApp({
      setup() {
        return () =>
          createVNode(
            DesignTokenProvider,
            { value: { token: { ...seedToken, wireframe: true } } },
            () => createVNode(Component),
          )
      },
    }),
  )
});

(() => {
  const tokenPath = `${process.cwd()}/components/version/token.json`
  fs.writeJsonSync(tokenPath, statistic, 'utf8')

  console.log(chalk.green('✅  Collected token statistics successfully, check it in'), tokenPath)
})()
