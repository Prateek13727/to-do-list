const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	entry: {
		main: './src/index.js',
	},
	output: {
		filename: '[name].js',
		path: path.resolve('./dist'),
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude:  /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: [
					{ loader: 'style-loader'},
					{ loader: 'css-loader'},
					{ loader: 'postcss-loader'}
				]
			},
			{
				test: /\.(png|jp(e*)g|svg)$/,
				use: [
					{ 
						loader: 'url-loader',
						options: {
							limit: 8000,
							name: "./images/[name].[ext]"
						}
					},
				]	
			}
		]
	},
	optimization: {
	    splitChunks: {
	       chunks: 'all'
		}
	},
	plugins: [
		new MiniCssExtractPlugin({
      filename: "styles.css",
      chunkFilename: "styles.css"
    }),
		new HtmlWebpackPlugin({
			template: 'index.html'
		}),
		new CleanWebpackPlugin(['dist'])
	]
}