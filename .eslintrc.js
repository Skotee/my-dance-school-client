module.exports = {
	'env': {
		'browser': true,
		'es2021': true,
		'node': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended',
		'react-app',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:import/errors',
    'plugin:import/warnings',
    "plugin:import/typescript"
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaFeatures': {
			'jsx': true
		},
		'ecmaVersion': 12,
		'sourceType': 'module'
	},
	'plugins': [
		'react',
		'@typescript-eslint'
	],
	'rules': {
		'linebreak-style': [
			'warn',
			'windows'
		],
		'quotes': [
			'warn',
			'single'
		],
		'semi': [
			'warn',
			'never'
		],
		'max-len': ['warn', { code: 100 }],
		'global-require': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-wrap-multilines': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/forbid-prop-types': 'off',
    'react/prop-types': 'off',
    'react/display-name': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': 'off',
		'implicit-arrow-linebreak': 'off',
    'no-unused-vars': 'warn',
    'no-console': 'warn',
    'no-nested-ternary': 'off',
    'no-param-reassign': 'off',
    'arrow-parens': 'off',
    'no-confusing-arrow': 'off',
    'no-use-before-define': [0],
    'no-empty-function': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    '@typescript-eslint/no-use-before-define': [1],
    '@typescript-eslint/no-namespace': 'off',
    //'no-shadow': 'off',
    //'@typescript-eslint/no-shadow': ['error'],
	}
}
