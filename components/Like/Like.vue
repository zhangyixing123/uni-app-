<template>
	<view @tap.stop="heartClickHandler">
		<u-icon v-show="!likeInfo.isLike" name="heart" color="#151517" size="18" :label="likeInfo.count" :stop="true"></u-icon>
		
		<u-icon v-show="likeInfo.isLike" name="heart-fill" color="#e6103b" size="18" :label="likeInfo.count"></u-icon>
	</view>
</template>

<script>
	import {
		prodLikeReq
	} from '../../api/index.js'
	export default {
		name: "Like",
		props: ['info'],
		data() {
			return {
				likeInfo:this.info
			};
		},
		watch: {
			info(newval){
				this.likeInfo = newval;
			}
		},
		methods: {
			heartClickHandler() {
				const {
					id,
					count,
					isLike
				} = this.likeInfo;
				prodLikeReq(id).then(() => {
					if (isLike) this.likeInfo.count = count - 1;
					else this.likeInfo.count = count + 1;

					this.likeInfo.isLike = !isLike;
				})
				
				this.$emit('toggleLike')
			}
		}
	}
</script>

<style>

</style>
