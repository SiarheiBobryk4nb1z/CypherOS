module.exports = {
	root: true,
	env: {
		es6: true
	},
	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint'],
	extends: ['plugin:@typescript-eslint/recommended'],
	rules: {
		"@typescript-eslint/indent": ["error", "tab"],
		"@typescript-eslint/no-explicit-any": ["off"]
	}
};
