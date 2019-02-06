'use strict';

const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
	mode: 'development',
	entry: './src/client/index.jsx',
	devtool: 'inline-source-map',
	watch: true,
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
		}]),
		new WebpackShellPlugin({
			onBuildEnd: ['npm run start-server']
		})
	],
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, 'dist', 'client')
	}
};
