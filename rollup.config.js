import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import {uglify} from 'rollup-plugin-uglify';

const getConfig = function (isMinify) {
	const config = {
		input: 'src/index.ts',
		output: {
			name: 'object-hierarchy-access',
			format: 'umd',
			file: `dist/index${isMinify ? '.min' : ''}.js`,
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
	getConfig(false),
	getConfig(true)
];
