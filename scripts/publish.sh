#!/bin/sh

set -e

echo " install package dependencies"

pnpm i

# echo " update version"
# pnpm update:version

echo "set token"
npm run token

echo "build packages"
pnpm build

cd dist/antdv
npm publish
cd -

echo "✅ Publish completed"
