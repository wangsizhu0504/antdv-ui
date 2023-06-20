module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jasmine: true,
    jest: true,
    es6: true,
  },
  extends: ['@kriszu/eslint-config'],
  plugins: ['markdown'],
  overrides: [
    {
      files: ['*.md'],
      processor: 'markdown/markdown',
      rules: {
        'no-console': 'off',
      },
    },
    {
      files: ['*.vue'],
      rules: {
        'vue/component-tags-order': 'off',
        'vue/block-tag-newline': 'off',
      },
    },
  ],
  rules: {
    'prefer-promise-reject-errors': 'off',
    'vue/no-reserved-component-names': 'off',
    'prefer-rest-params': 'off',
    '@typescript-eslint/no-this-alias': 'off',
    'no-void': 'off',
  },
}
