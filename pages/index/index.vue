<template>
	<view class="content">


	</view>
</template>

<script setup>
	import {
		onLoad
	} from "@dcloudio/uni-app"
	import {
		ref
	} from 'vue';
	const title = ref('test')
	import {
		fetch
	} from '../../utils/fetch';
	onLoad(() => {
		//stream

		const eventSource = new EventSource('http://localhost:9527/todo/stream');
		eventSource.onmessage = ({
			data
		}) => {
			uni.createPushMessage({
				title:'消息推送',
				content:data,
				
			})
			//console.log('New message', JSON.parse(data));
			
		};
	})
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>