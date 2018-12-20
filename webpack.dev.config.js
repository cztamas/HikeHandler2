const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	mode: 'development',
	entry: './src/client/index.jsx',
	devtool: 'inline-source-map',
	devServer: {
		contentBase: './dist/client/'
	},
	module: {
		rules: [
			{
				test: /\.jsx$/, use: 'babel-loader'
			}
		]
	},
	plugins: [
		new CleanWebpackPlugin(['dist']),
		new CopyWebpackPlugin([{
			from: '**/*',
			to: '..',
			ignore: ['*.jsx'],
			context: 'src'
		}])
	],
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist', 'client')
	}
};
