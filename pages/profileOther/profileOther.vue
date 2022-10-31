<template>
	<view>
		<u-navbar :title="`${profileInfo.nickname}的发售`" :placeholder="true" class="nav_bar" :autoBack="true" leftIconColor="#151517">
		</u-navbar>
		<view class="profile_container">
			<ProfileHeader :info="profileInfo" />
			<u-gap height="18"></u-gap>
			<u-text class="intr_info" text="目标成为最大的服务型中文Crypto交易者社区由兔子和粉丝们共同发起成立" size="14" color="#7c7c7c"
				align="center"></u-text>
			<u-gap height="56"></u-gap>
		</view>
		<u-gap height="2" bgColor="#F2F2F5"></u-gap>
		<view class="profile_container">
			<u-sticky bgColor="#fff" offset-top="90">
				<u-gap height="10"></u-gap>
				<u-tabs :scrollable="false" :list="tablist" @click="tabClickHandler" lineColor="#BC42FF"></u-tabs>
			</u-sticky>
			<u-gap height="12"></u-gap>
			<view v-show="activeTab === 0">
				<u-list @scrolltolower="getSaleList" class="nfts_list" >
					<u-list-item v-for="nft in nftList_s" :key="nft.id">
						<NftCard class="nft_card" :info="nft"/>
					</u-list-item>
					<u-divider text="没有更多了..." :hairline="true" v-show="pageSize_s*page_s >= count_s"></u-divider>
				</u-list>
				
			</view>
			
			<view v-show="activeTab === 1">
				<u-list @scrolltolower="getHistoryList" class="nfts_list" >
					<u-list-item v-for="nft in nftList_h" :key="nft.id">
						<NftCard class="nft_card" :info="nft"/>
					</u-list-item>
					<u-divider text="没有更多了..." :hairline="true" v-show="pageSize_h*page_h >= count_h"></u-divider>
				</u-list>
				
			</view>
		</view>
	</view>
</template>

<script>
	import ProfileHeader from '../../components/ProfileHeader/ProfileHeader.vue';
	import NftCard from '../../components/NftCard/NftCard.vue';

import {
	otherProfileReq,otherSaleListReq,otherHistoryListReq
} from '../../api/index.js'
	export default {
		components: {
			ProfileHeader,
			NftCard
		},
		data() {
			return {
				tablist: [{
						name: '藏品发售中',
					},
					{
						name: '发售历史',
					}
				],
				profileInfo: {
					avatar: '',
					nickname: ''
				},
				id:'',
				activeTab: 0,
				
				page_s: 1,
				pageSize_s: 20,
				isReq_s: false,
				count_s: 21,
				nftList_s: [],
				
				page_h: 1,
				pageSize_h: 20,
				isReq_h: false,
				count_h: 21,
				nftList_h: [],
			}
		},
		onLoad(options) {
			const {
				id
			} = options;
			this.userId = id;
			this.getOtherProfile();
			this.page_s =1;
			this.getSaleList();
		},
		methods: {
			getOtherProfile(){
				otherProfileReq(this.userId).then(res=>{
					this.profileInfo= {
						avatar: res.avatar,
						nickname: res.nickname
					};
				})
			},
			getSaleList(){
				const {
					page_s,
					pageSize_s,
					isReq_s,
					count_s,
					userId
				} = this;
				if (pageSize_s * page_s >= count_s) return;
				if (isReq_s) return;
							
				this.isReq_s = true;
				otherSaleListReq({
					page:page_s,
					page_size: pageSize_s,
					id:userId
				}).then(res => {
					const {
						result,
						count
					} = res;
					this.count_s = count;
					if (result && result.length > 0) {
						if (page_s === 1) {
							this.nftList_s = result;
						} else {
							this.nftList_s.splice(this.nftList_s.length, 0, ...result);
						}
					}
					this.page_s++;
					this.isReq_s = false;
				}).catch(() => {
					this.isReq_s = false;
				});
			},
			getHistoryList() {
				
				const {
					page_h,
					pageSize_h,
					isReq_h,
					count_h,userId
				} = this;
				if (pageSize_h * page_h >= count_h) return;
				if (isReq_h) return;
							
				this.isReq_h = true;
				otherHistoryListReq({
					page:page_h,
					page_size: pageSize_h,
					id:userId
				}).then(res => {
					const {
						result,
						count
					} = res;
					this.count_h = count;
					if (result && result.length > 0) {
						if (page_h === 1) {
							this.nftList_h = result;
						} else {
							this.nftList_h.splice(this.nftList_h.length, 0, ...result);
						}
					}
					this.page_h++;
					this.isReq_h = false;
				}).catch(() => {
					this.isReq_h = false;
				});
			},
			
			tabClickHandler(e) {
				const{index} = e;
				this.activeTab = index;
				switch (index){
					case 0:
						this.getSaleList();
						break;
					case 1:
						this.getHistoryList();
						break;
				}
			}
		}
	}
</script>

<style scoped>
	.profile_container {
		padding: 48rpx 38rpx calc(env(safe-area-inset-bottom) / 2 + 24rpx);
	}

	.intr_info>>>span {
		text-align: center;
	}


	.nft_card {
		margin-bottom: 24rpx;
	}


	.nft_card>>>.u-transition {
		width: 284rpx;
		height: 336rpx;
		margin: auto;
	}
	
	.nfts_list {
		height: calc(100vh - 164px - env(safe-area-inset-bottom))!important;
	}

	.nfts_list>>>.uni-scroll-view-content>view {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 20rpx;
	}
</style>
