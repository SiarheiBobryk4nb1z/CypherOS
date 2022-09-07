import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import {uglify} from 'rollup-plugin-uglify';

const getConfig = function (format, isMinify, filename) {
	const config = {
		input: 'src/index.ts',
		output: {
			name: 'ObjectHierarchyAccess',
			format: format,
			file: `dist/${filename}.js`,
		},
		plugins: [
			resolve(),
			typescript(),
			isMinify && uglify({ie8: true})
		],
	};

	return config;
};

export default [
	getConfig('umd', false, 'index'),
	getConfig('umd', true, 'index.min'),
	getConfig('esm', false, 'index.esm')
];
