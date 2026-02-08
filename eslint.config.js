import { configs } from 'eslint-plugin-unicorn'
import eslintPluginImport from 'eslint-plugin-import'
import eslintjs from '@eslint/js'
import { configs as __configs } from 'typescript-eslint'

export default [
	eslintjs.configs.recommended,
	configs['flat/recommended'],
	// eslintPluginImport.configs.recommended,
	// eslintPluginImport.configs.typescript,
	...__configs.recommendedTypeChecked,
	{
		plugins: {
			import: eslintPluginImport,
		},
	},
	{
		files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
		ignores: ['**/*.test.ts', '**/*.spec.ts', '**/__tests__/**/*.ts'],
		rules: {
			'@typescript-eslint/explicit-module-boundary-types': ['off'],
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					varsIgnorePattern: '^_|^onStart$|^onGameTick$|^onNpcAnimationChanged$|^onActorDeath$|^onHitsplatApplied$|^onInteractingChanged$|^onChatMessage$',
				},
			],
			'@typescript-eslint/no-explicit-any': 'warn',
			'unicorn/numeric-separators-style': 'off',
			'unicorn/prefer-spread': 'off',
			'unicorn/no-null': 'off',
			'unicorn/no-array-for-each': 'off', // TODO: Force array for each
			'unicorn/no-array-callback-reference': 'off', // TODO: Only for specific query files
		},
		languageOptions: {
			ecmaVersion: 'latest',
			parserOptions: {
				tsconfigRootDir: './',
				project: './tsconfig.json',
				sourceType: 'module',
				ecmaVersion: 'latest',
			},
		},
	},
	// {
	// 	files: ['**/*.test.ts', '**/*.spec.ts', '**/__tests__/**/*.ts'],
	// 	rules: {
	// 		'@typescript-eslint/explicit-module-boundary-types': ['warn'],
	// 		'@typescript-eslint/no-unused-vars': [
	// 			'error',
	// 			{
	// 				varsIgnorePattern:
	// 					'^_|^onStart$|^onGameTick$|^onNpcAnimationChanged$|^onActorDeath$|^onHitsplatApplied$|^onInteractingChanged$|^onChatMessage$',
	// 			},
	// 		],
	// 		'@typescript-eslint/no-explicit-any': 'warn',
	// 		'unicorn/numeric-separators-style': 'off',
	// 		'unicorn/prefer-spread': 'off',
	// 		'unicorn/no-null': 'off',
	// 		'unicorn/no-array-for-each': 'off',
	// 		'unicorn/no-array-callback-reference': 'off',
	// 	},
	// 	languageOptions: {
	// 		ecmaVersion: 'latest',
	// 		parserOptions: {
	// 			tsconfigRootDir: './',
	// 			project: './tsconfig.spec.json',
	// 			sourceType: 'module',
	// 			ecmaVersion: 'latest',
	// 		},
	// 	},
	// },
	{
		ignores: [
			'**/generated/**',
			'**/dist/**',
			'**/build/**',
			'**/tmp/**',
			'**/node_modules/**',
			'types/**',
			'tsconfig.json',
			'tsconfig.*.json',
			'.prettierrc',
			'.prettierignore',
			'.editorconfig',
			'eslint.config.js',
			'project.json',
			'package.json',
			'**/rollup.cjs',
			'**/tsconfig.json',
			'**/tsconfig.*.json',
			'**/rollup.cjs',
			'**/*.js',
			'scripts',
			'**/*.d.ts',

			// Test files - fully disabled
			'**/*.test.ts',
			'**/*.spec.ts',
			'**/__tests__/**',
			'**/__mocks__/**',
		],
	},
]
