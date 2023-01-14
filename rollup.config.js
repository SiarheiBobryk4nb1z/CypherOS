import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import {terser} from "rollup-plugin-terser";

const getConfig = function (format, filename) {
	const tsOption = format === 'esm' ? {target: 'ES2015'} : {target: 'ES5'};
	const isMinify = filename.indexOf('.min') >= 0;
	const minifyOption = format === 'esm' ? undefined : {ie8: true};

	const config = {
		input: 'src/index.ts',
		output: {
			name: 'ObjectHierarchyAccess',
			format: format,
			file: `dist/${filename}.js`,
		},
		plugins: [
			resolve(),
			typescript(tsOption),
			isMinify && terser(minifyOption)
		],
	};

	return config;
};

export default [
	getConfig('umd', 'index'),
	getConfig('umd', 'index.min'),
	getConfig('esm', 'index.esm')
];
