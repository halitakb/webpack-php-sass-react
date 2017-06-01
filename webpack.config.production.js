var webpack = require('webpack');
var path = require('path');
const { resolve } = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var nodeModulesPath = path.resolve(__dirname, 'node_modules');


module.exports = {
	entry:{
		app:[
			'./src/app.js',
			'./src/app.scss'
		]
	},
	output:{
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/'
	},
 	devtool: 'eval',
	module:{
		rules:[
			{
				test: /\.php$/,
				loaders: [
				      'html-minify-loader',
		              'php-loader'
				]
			},
			{
				test: /\.(svg|eot|ttf|woff|woff2)$/,
				use: 'file-loader'
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				loaders:[
					{
						loader:'file-loader',
						options:{
							name:'images/[name].[hash].[ext]'
						}
					},
					'img-loader'
				]
			},
			{
				test: /\.s[ac]ss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use:[
						{
							loader: "css-loader",
							options:{
								importLoaders:1,
								modules: true
							}
						},
						{
							loader: "sass-loader",
								options:{
									importLoaders:1,
									modules: true
								}
						},
						{
							loader: "postcss-loader",
								options:{
									importLoaders:1,
									modules: true
								}
						}
					],
					publicPath:"/dist/css"
				})
			},
			{
				test: /\.js$/,
				exclude: nodeModulesPath,
				loader: "babel-loader"
			}

		]
	},
	plugins:[
		new CleanWebpackPlugin(['dist'], {
				root:__dirname,
				verbose:true,
				dry:true
			}),
        new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.ProvidePlugin({
             $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            'root.jQuery': 'jquery'
        }),
		new ExtractTextPlugin({
		    filename: "css/app.css",
		    disable: false,
		    allChunks: false
		}),
         new webpack.LoaderOptionsPlugin({
			  minimize: true,
			  debug: false,
			  options: {
			    context: __dirname
			  }
			}),
		new webpack.DefinePlugin({
			'process.env.NODE_ENV': JSON.stringify('development')
		})
	],
	resolve:{
		modules:[
			path.join(__dirname, "src"),
			"node_modules"
		],
		extensions:['.js','.css','.scss','.php']
	}
    
};