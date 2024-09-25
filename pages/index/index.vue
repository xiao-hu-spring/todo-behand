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
	function stream(){
		console.log(1)
		const eventSource = new EventSource('http://47.102.197.217:3005/todo/stream');
		eventSource.onmessage = ({
			data
		}) => {
			uni.createPushMessage({
				title:'消息推送',
				content:data,
				
			})
			//console.log('New message', JSON.parse(data));
			
		};
	}
	onLoad(() => {
		//stream
		stream()
	})
	
</script>

<style lang="scss" scoped>
	@import './css/index.scss'
	
</style>