<template>
	<view class="content">
		<div class="head">
			<img src="./img/icon_cb.png" alt="" srcset="">
			日程
			<img src="./img/icon_search.png" alt="" srcset="">
		</div>



		<div class="calendar" >
			<div class="title">
				<img src="./img/icon_left.png" alt="" srcset="" @click="changeMonth(-1)">
				{{year}}年{{month}}月
				<img src="./img/icon_right.png" alt="" srcset="" @click="changeMonth(1)">
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

				<swiper class="swiper"  
				ref="swiperRef" 
			>
			<swiper-item v-for="(item, index) in swiperlist">
				<div class="days">
					<!-- <div class="day b" v-for="(item, index) in before">
						<div class="cell">{{ item }}</div>
					</div> -->
					<div :class="i.ismonth?'day':'day b'" v-for="(i, d) in item.days" @click="Daydetail(i)">
						<div :class="i.today ? 'cell today' : i.chose ? 'chose cell' : 'cell'">{{
							i.day }}
						</div>
						<div class="dot"></div>
					</div>
					<!-- <div class="day e" v-for="(item, index) in end">
						<div class="cell">{{ item }}</div>
					</div> -->
				</div>
			</swiper-item>
			
		</swiper>
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

	const year=ref(new Date().getFullYear())
	const month=ref(new Date().getMonth()+1)

const swiperlist=ref([])
/**
 * @description 渲染月份天数
 * **/
const InitCalendar = (year, month) => {
	const weekindex = (new Date(year, month - 1, 1).getDay() + 6) % 7;
	const daycount = new Date(year, month, 0).getDate();
	console.log(weekindex, daycount)
	//渲染到数组中
	let mi = []
	let before=[]
	let end=[]
	mi = Array.from({ length: daycount }, (_, index) => index + 1)

	before = Array.from({ length: weekindex }, (item, index) => item = new Date(year, month - 1, 0).getDate() - (weekindex - 1 - index)).map((x)=>{
		let dayobj = {
			day: x,
			today: false,
			nl: '',
			level: "",
			dot: false,
			year:new Date(year,month-1,0).getFullYear(),
			month:new Date(year,month-1,0).getMonth()+1,
			chose:false,
			ismonth:false
		}
		return dayobj
	})
	let today = new Date(new Date().getFullYear(), new Date().getMonth() + 1, new Date().getDate())
	mi = mi.map((x) => {
		let dayobj = {
			day: x,
			today: false,
			nl: '',
			level: "",
			dot: false,
			year:year,
			month:month,
			chose:false,
			ismonth:true
		}
		if (new Date(year, month, x).getTime() == today.getTime()) {
			dayobj.today = true
		}
		return dayobj
	})
	end = Array.from({ length: 42 - daycount - weekindex }, (_, index) => index + 1).map((x)=>{
		let dayobj = {
			day: x,
			today: false,
			nl: '',
			level: "",
			dot: false,
			year:new Date(year,month+1,0).getFullYear(),
			month:new Date(year,month+1,0).getMonth()+1,
			chose:false,
			ismonth:false
		}
		return dayobj
	})
	swiperlist.value.push({
		year: year,
		month: month,
		days:before.concat(mi.concat(end))
	})
	console.log('swiperlist',swiperlist.value)
}	
//
const changeMonth=(num)=>{
	if(num==1){
		if(month.value==12){
			year.value=year.value+1
			month.value=1
		}else{
			month.value=month.value+1
		}
	}else{
		if(month.value==1){
			year.value=year.value-1
			month.value=12
		}else{
			month.value=month.value-1
		}
	}
	InitCalendar(year,month)




}

const Daydetail=(i)=>{
	let choseDay
	swiperlist.value=  swiperlist.value.map((x)=>{
		let days= x.days.map((y)=>{
			if(new Date(y.year,y.month).getTime()==new Date(i.year,i.month).getTime()&&y.day==i.day){
				y.chose=true
				choseDay=y
			}else{
				
				y.chose=false
			}
			return y
		})
		x.days=days
		return x

	})
	console.log(choseDay)
}




onLoad(() => {
	InitCalendar(year.value, month.value)

})



</script>

<style lang="scss" scoped>
@import './css/index.scss'
</style>