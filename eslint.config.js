import kriszu from '@kriszu/eslint-config';

export default kriszu({
  vue: true,
  typescript: true,
  regexp: false,
}, {
  rules: {
    'no-console': 'off',
    'no-void': 'off',
    'ts/no-use-before-define': 'off',
    'vue/no-extra-parens': 'off',
    'no-useless-call': 'off',
    'no-cond-assign': 'off',
    'ts/no-unused-expressions': 'off',
    'ts/consistent-type-assertions': 'off',
    'no-template-curly-in-string': 'off',
    'ts/ban-types': 'off',
    'ts/no-loop-func': 'off',
    'ts/parameter-properties': 'off',
    'ts/prefer-for-of': 'off',
    'ts/member-ordering': 'off',
    'ts/unified-signatures': 'off',
    'ts/consistent-indexed-object-style': 'off',
    'vue/no-console': 'off',
    'vue/require-toggle-inside-transition': 'off',
    'vue/custom-event-name-casing': 'off',
    'prefer-promise-reject-errors': 'off',
    'vue/no-reserved-component-names': 'off',
    'prefer-rest-params': 'off',
    'no-invalid-this': 'off',
    'ts/no-this-alias': 'off',
    'ts/no-unused-vars': 'off',
    'n/no-callback-literal': 'off',
    'n/prefer-global/process': 'off',
    'ts/no-explicit-any': 'off',
    'no-unused-vars': 'off',
    'promise/no-return-wrap': 'off',
    'vue/component-tags-order': 'off',
    'vue/block-tag-newline': 'off',
    'node/prefer-global/process': 'off',
    'ts/default-param-last': 'off',
    'jsdoc/empty-tags': 'off',
    'ts/no-empty-interface': 'off',
    'no-prototype-builtins': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
});
