var webpack=require('webpack');
module.exports={
	entry:['babel-polyfill','./src/index.js'],
	output:{
		filename:'bundle.js',
		path:'./'
	},
	// css-loader使你能够使用类似@import 和 url(…)的方法实现 require()的功能；
	// style-loader将所有的计算后的样式加入页面中；
	module:{
		loaders:[
			{
				test:/\.json$/,
				loader:'json'
			},
			{
				test:/\.jsx?$/,
				loader:'babel',
				exclude:/node_module/,
				query:{
					presets:['es2015','react','stage-0'],
					plugins:["transform-es2015-parameters","transform-es2015-arrow-functions"]
				}
			},
			{
				test:/\.css$/,
				loader:'style!css'
			},
			{
				test:/\.scss$/,
				loader:'style!css!sass'
			}

		]
	},
	devServer: {
		
	    historyApiFallback: true,
	    inline:true,
	 	hot:true
	},
	devtool: '#eval-source-map'

}