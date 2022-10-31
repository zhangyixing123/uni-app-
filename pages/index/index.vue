<template>
	<view class="padding_0_24">
		<u-gap height="44"></u-gap>
		<view class="block-title_container">
			<u-text class="block-title" text="推荐" size="24" color="#151517"></u-text>
			<u-swiper :list="bannerList" :height="200" @click="bannerClickHanlder"></u-swiper>
		</view>
		<u-gap height="26"></u-gap>
		<view class="block-title_container">
			<u-text class="block-title" text="排行榜" size="24"></u-text>
			<u-scroll-list :indicator="false">
				<view v-for="(item, index) in saleList" :key="index" class="mini_card">
					<u-avatar :src="item.image"></u-avatar>
					<view>
						<u-text class="main_title" :text="item.name" size="12" color="#151517"></u-text>
						<u-text class="sub_title" :text="`销量 ${item.amount}`" size="12" color="#8E8E8E"></u-text>
					</view>
				</view>
			</u-scroll-list>
		</view>
		<u-gap height="19"></u-gap>
		<view class="block-title_container">
			<view class="block-title_group">
				<u-text text="推荐藏品" size="24"></u-text>
				<navigator url="/pages/allNFTs/allNFTs">
					<u-text suffixIcon="arrow-right" iconStyle="font-size: 14px" color="#BC42FF" size="14" text="全部">
					</u-text>
				</navigator>
			</view>

			<view>
				<NftCard v-for="(item, index) in recommList" :home="true" :info="item" :key="index" class="nft_card" />
			</view>

			<!-- <u-scroll-list :indicator="false">
				<NftCard v-for="(item, index) in recommList" :info="item" :key="index" class="nft_card" />
			</u-scroll-list> -->
		</view>
		<Tabbar />
	</view>

</template>

<script>
	import Tabbar from '../../components/Tabbar/Tabbar.vue';
	import NftCard from '../../components/NftCard/NftCard.vue';

	import {
		bannerListReq,
		saleListReq,
		recommListReq,
		allNftsReq
	} from '../../api/index.js';
	export default {
		components: {
			Tabbar,
			NftCard
		},
		data() {
			return {
				bannerList: [],
				saleList: [],
				recommList: []
			};
		},
		onLoad() {

		},
		onShow() {
			uni.hideTabBar();
			this.getBannerList();
			this.getSaleList();
			this.getRecommList();
		},
		methods: {
			getBannerList() {
				bannerListReq().then(res => {

					if (res) {
						let bannerList = [];
						res.map(banner => {
							bannerList.push({
								url:banner.image,
								id:banner.id
							});
						});
						if (bannerList.length > 0) this.bannerList = bannerList;
					}
				});
			},
			getSaleList() {
				saleListReq().then(res => {
					if (res) {
						this.saleList = res;
					}
				});
			},
			getRecommList() {
				allNftsReq({
					page: 1,
					page_size: 10,
					sort: 'index'
				}).then(res => {
					const {
						result
					} = res;
					if (result && result.length > 0) {
						this.recommList = result;
					}
				});
			},
			bannerClickHanlder(e) {
				const {
					bannerList
				} = this;
				
				const {
					id
				} = bannerList[e];
				uni.navigateTo({
					url: '/pages/nftDetail/nftDetail?id=' + id
				})
			}
		}
	};
</script>

<style scoped>
	.padding_0_24 {
		padding: 0 48rpx;
	}

	.block-title_container .block-title>>>span {
		font-weight: 600;
		line-height: 26px;
		text-align: center;
		letter-spacing: 0.005em;
	}

	.block-title_container .block-title {
		padding: 26rpx 28rpx;
		width: auto;
	}

	.mini_card {
		display: flex;
		background: #FEFEFE;
		border: 1px solid #EBEBF0;
		border-radius: 24px;
		padding: 16rpx;
		margin-right: 26rpx;
		min-width: 143px;
	}

	.mini_card .u-avatar {
		margin-right: 10px;
	}

	.mini_card .main_title>>>span,
	.mini_card .sub_title>>>span {
		font-weight: 500;
		line-height: 20px;
		letter-spacing: 0.005em;
	}

	.block-title_group {
		display: flex;
		padding: 26rpx 28rpx;
	}

	.block-title_group .u-text>>>span {
		text-align: center;
		letter-spacing: 0.005em;
	}

	.block-title_group .u-text:first-child>>>span {
		line-height: 26px;
		font-weight: 600;
	}

	.block-title_group .u-text:last-child>>>span {
		line-height: 22px;
		font-weight: 500;
	}

	.block-title_group .u-text:last-child {
		justify-content: flex-end !important;
	}

	.block-title_group .u-text:last-child>>>.u-icon__icon {
		color: #bc42ff !important;
	}

	.nft_card {
		margin-bottom: 48rpx;
	}

	.nft_card>>>.u-transition {
		width: 584rpx;
		height: 520rpx;
		margin: auto;
	}
</style>
