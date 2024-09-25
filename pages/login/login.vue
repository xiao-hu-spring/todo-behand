<template>
	<view class="login">
		<view class="content">
			<!-- 头部logo -->
			<view class="header">
				<image src="/static/icon.png"></image>
			</view>
			<!-- 主体表单 -->
			<view class="main">
				<div class="form-input">
					<input   class="form-input-box"   type="text" v-model="phoneData">
				</div>
				<div class="form-input">
					<input class="form-input-box" type="password"  v-if="!showpassword"  v-model="passData">
					
				</div>
				
			
			</view>
			<wButton class="wbutton" text="登 录" :rotate="isRotate" @click="startLogin"></wButton>

			<!-- 其他登录 -->
			<view class="other_login cuIcon">
				<view class="login_icon">
					<view class="cuIcon-weixin" @tap="login_weixin"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-weibo" @tap="login_weibo"></view>
				</view>
				<view class="login_icon">
					<view class="cuIcon-github" @tap="login_github"></view>
				</view>
			</view>

			<!-- 底部信息 -->
			<view class="footer">
				<navigator url="forget" open-type="navigate">找回密码</navigator>
				<text>|</text>
				<navigator url="register" open-type="navigate">注册账号</navigator>
			</view>
		</view>
	</view>
</template>

<script>
let _this;
import wInput from '../../components/watch-login/watch-input.vue'; //input
import wButton from '../../components/watch-login/watch-button.vue'; //button
import {
	fetch
} from '../../utils/fetch';
export default {
	data() {
		return {
			//logo图片 base64

			phoneData: '',//用户/电话
			passData: '', //密码
			isRotate: false, //是否加载旋转
			isFocus: true ,// 是否聚焦
			showpassword:false
		};
	},
	components: {
		wInput,
		wButton,
	},
	mounted() {
		_this = this;
		this.isLogin();
	},
	methods: {
		isLogin() {
			//判断缓存中是否登录过，直接登录
			try {
				const value = uni.getStorageSync('access_token');
				const value2=uni.getStorageSync('refresh_token')
				if (value&&value2) {
					//有登录信息
					console.log("已登录用户：",value);
					uni.reLaunch({
						url: '/pages/index/index',
					});
				}
			} catch (e) {
				// error
			}
		},
		startLogin(e) {
			console.log(e)
			//登录
			if (this.isRotate) {
				//判断是否加载中，避免重复点击请求
				return false;
			}
			if (!this.phoneData) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '用户名不能为空'
				});
				return;
			}
			if (!this.passData.length) {
				uni.showToast({
					icon: 'none',
					position: 'bottom',
					title: '密码不正确'
				});
				return;
			}
			_this.isRotate = true
			setTimeout(function () {
				_this.isRotate = false
			}, 3000)
			uni.showLoading({
				title: '登录中'
			});
			this.getLogin()
				.then(res => {
					console.log(res)
					const {access_token,refresh_token} =res.custom
					uni.setStorageSync("access_token", access_token)
					uni.setStorageSync("refresh_token", refresh_token)
					const value=uni.getStorageSync('access_token')
					console.log(value)
					//简单验证下登录（不安全）
					// if(true){

						uni.showToast({
							icon: 'success',
							position: 'bottom',
							title: '登录成功'
						});
						uni.reLaunch({
							url: '/pages/index/index'
						});
					// }else{
					
					// }
					uni.hideLoading();
				}).catch(err => {
						_this.passData=""
						uni.showToast({
							icon: 'error',
							position: 'bottom',
							title: err
						});


					uni.hideLoading();
				})

		},
		login_weixin() {
			//微信登录
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: '...'
			});
		},
		login_weibo() {
			//微博登录
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: '...'
			});
		},
		login_github() {
			//github登录
			uni.showToast({
				icon: 'none',
				position: 'bottom',
				title: '...'
			});
		},
		getLogin() {
			return new Promise((resolve, reject) => {
				fetch({
					url: 'user/login',
					data: {
						"username": this.phoneData,
						"password": this.passData
					},
					success: function (res) {
						
						if (res.status.code == 0) {
						
							reject('账号或密码错误')
						}
						resolve(res)
					},
					fail:(err)=>{
						console.log('err',err)
						reject(err)
					}
				})
			})
		}
	}
}
</script>

<style>
@import url("../../components/watch-login/css/icon.css");
@import url("./css/main.css");
</style>
