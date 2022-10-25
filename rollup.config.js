import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import {uglify} from 'rollup-plugin-uglify';

const getConfig = function (format, filename) {
	const tsOption = format === 'esm' ? {target: 'es2015'} : undefined;
	const isMinify = filename.indexOf('.min') >= 0;
	const uglifyOption = format === 'esm' ? undefined : {ie8: true};

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
			isMinify && uglify(uglifyOption)
		],
	};

	return config;
};

export default [
	getConfig('umd', 'index'),
	getConfig('umd', 'index.min'),
	getConfig('esm', 'index.esm')
];
