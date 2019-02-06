'use strict';

const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
	entry: ['babel-polyfill', './src/client/index.jsx'],
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
		new CleanWebpackPlugin(['dist']),
		new CopyWebpackPlugin([{
			from: '**/*',
			to: '..',
			ignore: ['*.jsx'],
			context: 'src'
		}]),
		new CopyWebpackPlugin([{
			from: 'img',
			to: 'img',
			ignore: ['*.jsx']
		}])
	]
};
