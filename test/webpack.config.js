const path = require('path')

module.exports = {
	mode: 'development',
	entry: path.resolve(__dirname, 'entry.js'),
	output: {
		path: path.resolve(__dirname),
		filename: 'output.js',
		library: 'test',
		libraryTarget: 'umd',
		libraryExport: 'default',
		umdNamedDefine: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'index.js',
						options: {
							regex: new RegExp(/\((.*)\)/, 'g'),
							output: path.resolve(__dirname, 'matches.json'),
						},
					},
				],
			},
		],
	},
	resolveLoader: {
		modules: [path.resolve(__dirname, '..')],
		mainFields: ['loader', 'main', 'index'],
	},
}
