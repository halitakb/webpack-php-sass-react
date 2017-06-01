var webpack = require('webpack'),
	path = require('path'),
	cssNext=require('postcss-cssnext'),
	reporter=require('postcss-reporter'),
	{ resolve } = require('path'),
	 ExtractTextPlugin = require('extract-text-webpack-plugin'),
	 ExtractSass = new ExtractTextPlugin({
		    filename: "vendor.css",
		    disable: true,
		    allChunks: true
		}),
	ExtractCss = new ExtractTextPlugin({
		    filename: "app.css",
		    disable: true,
		    allChunks: true
		}),
	CleanWebpackPlugin = require('clean-webpack-plugin'),
	nodeModulesPath = [
		path.resolve(__dirname, 'node_modules'),
		path.resolve(__dirname, 'bower_components')
		];

module.exports = {
	entry:{
		app:[
      		 'react-hot-loader/patch',
	         'webpack-dev-server/client?http://localhost:8080',
    		 'webpack/hot/only-dev-server',
			'./src/app.js',
			'./src/assets/scss/app.scss'
		]
	},
	output:{
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
		publicPath: '/'
	},
 	devtool: 'inline-source-map',
	watch: true,
		watchOptions: {
		poll: false,
		aggregateTimeout: 100,
		number: 300
	},
	devServer: {
		contentBase: resolve(__dirname, 'src'),
		publicPath: '/',
		proxy:{
		"/": "http://localhost:8000"
		},
		stats: 'errors-only',
		historyApiFallback: true
	},
	module:{
		rules:[
			{
				test: /\.(svg|eot|ttf|woff|woff2|wav|mp3)$/,
				use: 'file-loader'
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				use:[
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
				test: /\.css$/,
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
							loader: "postcss-loader",
								options:{
									importLoaders:1,
									modules: true
								}
						}
					]
				})
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
					]
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
		ExtractSass,
		ExtractCss,
        new webpack.HotModuleReplacementPlugin(),
        new webpack.LoaderOptionsPlugin({
			  minimize: false,
			  debug: true,
			  options: {
			    context: __dirname,
			     postcss: [
		          cssNext({
		            browsers: ['last 1 version']
		          }),
		          reporter
		        ]
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