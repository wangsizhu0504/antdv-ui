#!/bin/sh

set -e

pnpm i --frozen-lockfile
pnpm update:version

echo "🧹 Cleaning..."
pnpm clean

echo "📦 Building..."
pnpm build

cd dist/antdv-ui
echo "📦 Publishing..."
npm publish --provenance
cd -

echo "✅ Publish completed"
