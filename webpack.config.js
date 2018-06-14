const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = env => {
	const config = {
		entry: "./src/client/index.jsx",
		output: {
			path: path.resolve(__dirname, "dist", "client"),
			filename: "index.js"
		},
		module: {
			rules: [
				{
					test: /\.jsx$/, use: "babel-loader"
				}
			]
		},
		plugins: [
			new CopyWebpackPlugin([{
				from: "**/*",
				to: "..",
				ignore: ["*.jsx"],
				context: "src"
			}])
		]
	};

	if (env && env.config) {
		const configFileName = `config-${env.config}.json`;
		config.plugins.push(new CopyWebpackPlugin([{
			from: configFileName,
			to: "../config.json"
		}]));
	}

	return config;
};