#!/bin/sh

set -e

pnpm i --no-frozen-lockfile
pnpm gen:version

echo "🧹 Cleaning..."
pnpm clean

echo "📦 Building..."
pnpm build

cd dist/antdv-ui
echo "📦 Publishing..."
npm publish --provenance
cd -

echo "✅ Publish completed"
