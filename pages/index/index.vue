<template>
	<view class="content">
		<div class="head">
			<img src="./img/icon_cb.png" alt="" srcset="">
			日程
			<img src="./img/icon_search.png" alt="" srcset="">
		</div>



		<div class="calendar">
			<div class="title">
				<img src="./img/icon_left.png" alt="" srcset="">
				2024年9月
				<img src="./img/icon_right.png" alt="" srcset="">
			</div>
			<div class="contentbox">
				<div class="weeks">
					<div class="week">一</div>
					<div class="week">二</div>
					<div class="week">三</div>
					<div class="week">四</div>
					<div class="week">五</div>
					<div class="week">六</div>
					<div class="week">日</div>
				</div>

				<div class="days">
					<div class="day" v-for="(item,index) in 42">{{ index }}</div>
	
				</div>
			</div>

		</div>

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