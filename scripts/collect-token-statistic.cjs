const path = require('node:path');
const chalk = require('chalk');
const fs = require('fs-extra');
const glob = require('glob');
const ProgressBar = require('progress');

const { defineComponent, ref, createVNode, createSSRApp } = require('vue');
const VueServerRenderer = require('vue/server-renderer');
const { DesignTokenProvider } = require('../packages/components/theme/internal');
const seedToken = require('../packages/components/theme/themes/seed');
const { statistic } = require('../packages/components/theme/util/statistic');

console.log(chalk.green('🔥 Collecting token statistics...'));

const EmptyElement = createVNode('div');

const excludeDirs = ['config-provider', 'locale-provider', 'style', 'style-provider', 'auto-complete', 'col', 'row', 'time-picker'];
const styleFiles = glob.sync(
  path.join(
    process.cwd(),
    'packages/components/**/style/index.?(ts|tsx)',
  ),
  {
    ignore: excludeDirs.map(dir =>
      path.join(process.cwd(), `packages/components/${dir}/**/*`),
    ),
  },
);
const bar = new ProgressBar('🚀 Collecting by component: [:bar] :component (:current/:total)', {
  complete: '=',
  incomplete: ' ',
  total: styleFiles.length,
});

styleFiles.forEach(async (file) => {
  const pathArr = file.split('/');
  const styleIndex = pathArr.lastIndexOf('style');
  const componentName = pathArr[styleIndex - 1];
  bar.tick(1, { component: componentName });
  let useStyle = () => { };
  if (file.includes('grid')) {
    // eslint-disable-next-line node/global-require
    const { useColStyle, useRowStyle } = require(file);
    useStyle = () => {
      useRowStyle();
      useColStyle();
    };
  } else {
    // eslint-disable-next-line node/global-require
    useStyle = require(file).default;
  }

  const Component = defineComponent({
    setup() {
      if (!useStyle)console.log(useStyle, file);
      // @ts-expect-error
      useStyle(ref('file'), ref());
      return () => EmptyElement;
    },
  });
  VueServerRenderer.renderToString(
    createSSRApp({
      setup() {
        return () => createVNode(Component);
      },
    }),
  );
  // Render wireframe
  VueServerRenderer.renderToString(
    createSSRApp({
      setup() {
        return () =>
          createVNode(
            DesignTokenProvider,
            { value: { token: { ...seedToken, wireframe: true } } },
            () => createVNode(Component),
          );
      },
    }),
  );
});

(() => {
  const tokenPath = `${process.cwd()}/packages/version/token.json`;
  if (statistic) fs.writeJsonSync(tokenPath, statistic, 'utf8');

  console.log(chalk.green('✅  Collected token statistics successfully, check it in'), tokenPath);
})();
