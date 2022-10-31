<template>
	<view class="nft-card_container" @click="navigatorToDetail">
		<view class="drop_tag" v-if="info.is_air_drop" >
			空投
		</view>
		<u-image height="100%" width="100%" :src="info.image" :fade="true" duration="450" :radius="4"></u-image>
		<view class="all_nft-info">
			<view v-if="home" class="home">
				<text class="author">@{{info.author_name}}</text>
				<text class="title">{{info.name}}</text>


				<view class="footer">
					<view>
						<text class="price_name">售价</text>
						<text class="price">¥ {{info.price}}</text>
					</view>
					<Like :info="likeInfo" />
				</view>
			</view>

			<view v-else>
				<u-text class="title" :text="info.name" size="14" color="#151517"></u-text>
				<u-text class="author" :text="`@${info.author_name}`" size="12" color="#8E8E8E"></u-text>

				<u-text class="price" :text="`¥ ${info.price}`" size="12" color="#151517"></u-text>

				<view class="footer">
					<u-text class="price_name" text="售价" size="10" color="#8E8E8E"></u-text>
					<Like :info="likeInfo" />
				</view>
			</view>



		</view>
	</view>
</template>

<script>
	import Like from '../Like/Like.vue'
	export default {
		name: "NftCard",
		props: ['info', 'home'],
		components: {
			Like
		},
		data() {
			return {

			};
		},
		computed: {
			likeInfo() {
				const {
					likes,
					liked,
					id
				} = this.info;
				return {
					isLike: liked,
					count: likes,
					id
				}
			}
		},
		methods: {
			navigatorToDetail() {
				const {
					id
				} = this.info;
				uni.navigateTo({
					url: '/pages/nftDetail/nftDetail?id=' + id
				})
			}
		}
	}
</script>

<style>
	.nft-card_container {
		background: #FEFEFE;
		/* 		border: 1px solid #EBEBF0; */
		border: 1px solid #FEFEFE;
		border-radius: 8px;
		padding: 16rpx;
		box-shadow: 0px 5px 5px #a2a2b621,
			-5px 5px 10px #a2a2b621,
			5px 5px 10px #a2a2b621;
		margin-left: 10rpx;
		margin-right: 10rpx;
		position: relative;
		overflow: hidden;
	}
	
	.drop_tag {
		position: absolute;
		right: -50rpx;
		top: 10rpx;
		width: 150rpx;
		font-size: 12px;
		text-align: center;
		background-color: #bc42ff;
		color: #ffffff;
		padding: 10rpx;
		/* border-radius: 10rpx; */
		transform: rotate(45deg);
		z-index: 12
		
	}

	.all_nft-info {
		padding: 20rpx;
	}

	/* .nft-card_container >>> .u-image__image {
		width: 284rpx!important;
		height: 336rpx!important;
	} */

	.nft-card_container .title>>>span {
		font-weight: 600;
		line-height: 22px;
		letter-spacing: 0.005em;
	}

	.nft-card_container .author>>>span {
		font-weight: 400;
		line-height: 20px;
		letter-spacing: 0.005em;

	}

	.nft-card_container .price>>>span {
		font-weight: 600;
		line-height: 20px;
		letter-spacing: 0.005em;
	}

	.nft-card_container .footer {
		display: flex;
	}

	.nft-card_container .footer .price_name>>>span {
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.005em;
	}

	.home {
		/* display: flex;
		flex-direction: row-reverse;
		align-items: center; */
	}

	.home .author {
		font-size: 12px;
		color: #8e8e8e;
	}

	.home .price {
		color: #151517;
		font-size: 12px;
	}

	.home .title {
		flex: 0 0 auto;
		font-size: 14px;
		color: #151517;
		margin-left: 20rpx;

	}

	.home .price_name {
		font-size: 10px;
		color: #151517;
		margin-right: 20rpx;
	}

	.home .footer view {
		display: flex;
		align-items: center;
	}

	.home .footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>
