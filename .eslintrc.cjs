/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
	extends: [
		'eslint:recommended',
		'plugin:vue/vue3-recommended',
		'@electron-toolkit',
		'@electron-toolkit/eslint-config-ts/eslint-recommended',
		'@vue/eslint-config-typescript/recommended',
		'@vue/eslint-config-prettier'
	],
	rules: {
		'vue/require-default-prop': 'off',
		'vue/multi-word-component-names': 'off',
		indent: ['off', 'tab']
	},
	overrides: [
		{
			files: ['src/shared/**/*.ts', 'src/shared/**/*.d.ts'],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off',
				'@typescript-eslint/no-unused-vars': 'off',
				'@typescript-eslint/ban-types': 'off',
				'prefer-rest-params': 'off'
			}
		},
		{
			files: ['src/lib/httpClient/*.ts', 'src/renderer/utils/*.ts', 'src/util/*.ts'],
			rules: {
				'@typescript-eslint/no-explicit-any': 'off'
			}
		}
	]
}
