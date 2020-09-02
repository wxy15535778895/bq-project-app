<template>
	<view>
		<uni-calendar :insert="true" :lunar="true" :selected="selected" :start-date="'2019-3-2'" :end-date="'2019-5-20'"
		 @change="change"></uni-calendar>
	</view>
</template>

<script>
	import uniCalendar from '@/components/uni-calendar/uni-calendar.vue'
	export default {
		components: {
			uniCalendar
		},
		data() {
			return {
				selected: [{
					date: '2019-12-1'
				}, {
					date: '2019-12-3'
				}, {
					date: '2019-12-4'
				}, {
					date: '2019-12-6'
				}],
				longitudemax:'',//最大经度
				longitudemin:'',//最小经度
				latitudemax:'',//最大纬度
				latitudemin:''//最小纬度
				
			};
		},
		 onLoad() {
		                   this.getList();
		               },
		mounted() {
			uni.getLocation({
				type: 'wgs84',
				geocode: true,
				success: function(res) {
					console.log(res);
					this.longitudemax=parseInt(res.longitude)+5
					this.longitudemin=parseInt(res.longitude)-5
					this.latitudemax=parseInt(res.latitude)+5
					this.latitudemin=parseInt(res.latitude)-5
					
				}
			});
		},
		methods: {
			change(e) {
				console.log(e);
				let date={date:e.fulldate}
				this.selected.push(date)
			},
			getList(){
				uni.request({
				                    url: 'http://localhost:3000/data', 
				                    success: (res) => {
				                        console.log(res.data);
				                         this.selected =res.data.selected;
				                    }
				                });
			}
		}
	};
</script>
