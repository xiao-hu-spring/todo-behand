module.exports = {
	devServer:{
		port:'8080',
		disableHostCheck:true,
		proxy:{
			'/api':{
				target:'http://localhost:9527',
				changeOrigin:true,
				pathRewrite:{
					'^/api': ''
				}
			}
		}
	}
}
