import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import glob from 'fast-glob';
import { copy, remove } from 'fs-extra';
import { buildOutput } from '../path';
import { pathRewriter, run } from '../utils';

export async function generateTypesDefinitions() {
  await run(
    'npx vue-tsc -p tsconfig.web.json --declaration --emitDeclarationOnly --declarationDir dist/types',
  );
  const typesDir = path.join(buildOutput, 'types', 'packages');
  const filePaths = await glob(`**/*.d.ts`, {
    cwd: typesDir,
    absolute: true,
  });
  const rewriteTasks = filePaths.map(async (filePath) => {
    const content = await readFile(filePath, 'utf8');
    await writeFile(filePath, pathRewriter('esm')(content), 'utf8');
  });
  await Promise.all(rewriteTasks);
  const sourceDir = path.join(typesDir, 'antdv-ui');
  await copy(sourceDir, typesDir);
  await remove(sourceDir);
}
