const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	entry: './src/client/index.jsx',
	output: {
		path: path.resolve(__dirname, 'dist', 'client'),
		filename: 'index.js'
	},
	module: {
		rules: [
			{
				test: /\.jsx$/, use: 'babel-loader'
			}
		]
	},
	plugins: [
		new CopyWebpackPlugin([{
			from: '**/*',
			to: '..',
			ignore: ['*.jsx'],
			context: 'src'
		}])
	]
};
