import fs from 'node:fs';
import globby from 'globby';
import matter from 'gray-matter';

(async () => {
  const paths = await globby('site/example/*/index.*.md');
  const components = {};
  paths.forEach((path) => {
    const content = fs.readFileSync(path).toString();
    const pathList = path.split('/');
    const componentName = pathList[pathList.length - 2];

    const { data } = matter(content);
    components[componentName] = { ...components[componentName], ...data };
  });
  const TEMPLATE = `
export default [
  ${Object.keys(components).map(
    component => `
  {
    path: '${component}:lang(-cn)?',
    meta: ${JSON.stringify(components[component])},
    component: () => import('../../example/${component}/demo/index.vue'),
  }`,
  )}
];`;

  // const engine = new ESLint({
  //   fix: true,
  //   useEslintrc: false,
  //   baseConfig: require(path.join(process.cwd(), 'eslint.config.js')),
  // })

  // const report = await engine.lintText(TEMPLATE)

  fs.writeFileSync('site/src/router/demoRoutes.ts', TEMPLATE);
})();
