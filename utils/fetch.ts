

type RequestBody= {
	url : string,
	data : any,
	header ?: any,
	success : any,
	faile ?: any,
	method ?: any,
	defr ?: boolean
}
let globalRequestBody:any=''
uni.addInterceptor('request', {
	invoke:(args :any)=> {
		if(args.url.indexOf('http')==-1){
			
		args.url = 'http://127.0.0.1:9527/' + args.url
		}
		if(!uni.getStorageSync('access_token')&& args.url.indexOf('login')==-1&&args.url.indexOf('refresh')==-1){
			uni.showToast({
				title:'登录已过期，请重新登录',
				
			})
			//未登录
			uni.navigateTo({
				url:'/pages/login/login',
				animationType:'slide-in-right',
			})
			return false
		}else if(args.url.indexOf('login')==-1||args.url.indexOf('refresh')==-1){
			//GetToken()
			
		}else{

		}
		
		
		
		args.header.Authorization = "Bearer " + uni.getStorageSync('access_token')
	},
	success:(args:any)=> {
		// 请求成功后，修改code值为1
		console.log('args',args.statusCode)
		if(args.statusCode==403){
			GetToken()
		}
		args.data.code = 1
		return args.data

	},
	fail:(err:any)=> {
	    console.log('interceptor-fail',err)
	  },
 

})
export function fetch(requestbody : RequestBody) : any {
	globalRequestBody=requestbody
	uni.request({
		url: requestbody.url,
		data: requestbody.data,
		header: requestbody.header || { Authorization: "" },
		method: requestbody.method || "POST",
		success: (res:any)=>{
			
			if(res.data.custom){				
			requestbody.success({custom:res.data.custom,status:res.data.status})
			}else{
				requestbody.success({status:res.data.status})
			}
		},
		fail: requestbody.faile

	})




}


function  GetToken():void{
	alert(1)
	if(uni.getStorageSync("refresh_token")){
		alert(2)
		//使用refresh_token刷新
		refresh().then((token)=>{
			fetch(globalRequestBody)
		}).catch(()=>{
			//未登录
			uni.navigateTo({
				url:'/pages/login/login',
				animationType:'slide-in-right',
			})
			return
		})
	}else{
		alert(3)
		uni.showToast({
			title:'登录已过期，请重新登录',
			
		})
		uni.navigateTo({
			url:'/pages/login/login',
			animationType:'slide-in-right',
		})
		return
	}
	
}
type token={
	access_token:string,
	refresh_token:string
}

function refresh():Promise<token>{
	return new Promise<token>((resolve,reject)=>{
		fetch({
			url:'user/refresh',
			data:{refresh_token:uni.getStorageSync("refresh_token")},
			success:function(res){
				if(res.status.code==1){
					//刷新成功
					
					uni.setStorageSync("access_token", res.custom.access_token)
					uni.setStorageSync("refresh_token", res.custom.refresh_token)
					const token:token={
						access_token:res.custom.access_token,
						refresh_token:res.custom.refresh_token
					}
					resolve(token)
				}else{
					uni.showToast({
						title:'登录已过期，请重新登录',
						
					})
					reject({})
				}
			}
		})
	})

}