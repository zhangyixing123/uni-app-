<template>
	<view>
		<u-navbar title="藏品馆" :placeholder="true" class="nav_bar" :autoBack="true" leftIconColor="#151517">
			<navigator class="u-nav-slot" slot="right" url="/pages/myProfile/myProfile">
				<u-icon name="setting" size="20" color="#151517"></u-icon>
			</navigator>
		</u-navbar>
		<view class="profile_container">
			<ProfileHeader :info="profileInfo"/>
			<u-gap height="18"></u-gap>
			<u-text class="intr_info" text="这是你的藏品馆" size="14" color="#7c7c7c" align="center" >
			</u-text>
			<u-text class="intr_info" text="你可以在此处查看你购买的以及已发布的藏品" size="14" color="#7c7c7c" align="center"></u-text>
			<u-gap height="48"></u-gap>
		</view>
		<view class="profile_container">
			
			<u-sticky bgColor="#fff" offset-top="91">
				<u-gap height="20"></u-gap>
				<u-tabs :scrollable="false" :list="tablist" @click="tabClickHandler" lineColor="#BC42FF"></u-tabs>
			</u-sticky>
			<u-gap height="12"></u-gap>
			<view v-show="activeTab === 0">
				<u-list @scrolltolower="getPublishList" class="nfts_list" >
					<u-list-item v-for="nft in nftList_p" :key="nft.id">
						<NftCard class="nft_card" :info="nft"/>
					</u-list-item>
					<u-divider text="没有更多了..." :hairline="true" v-show="pageSize_p*page_p >= count_p"></u-divider>
				</u-list>
				
			</view>
			<view v-show="activeTab === 2">
				<u-list @scrolltolower="getLikeList" class="nfts_list" >
					<u-list-item v-for="nft in nftList_l" :key="nft.id">
						<NftCard class="nft_card" :info="nft"/>
					</u-list-item>
					<u-divider text="没有更多了..." :hairline="true" v-show="pageSize_l*page_l >= count_l"></u-divider>
				</u-list>
				
				
			</view>
			
			<view v-show="activeTab === 1">
				<u-list @scrolltolower="getBuyList" class="nfts_list" >
					<u-list-item v-for="nft in nftList_b" :key="nft.id">
						<NftCard class="nft_card" :info="nft"/>
					</u-list-item>
					<u-divider text="没有更多了..." :hairline="true" v-show="pageSize_b*page_b >= count_b"></u-divider>
				</u-list>
				
				
			</view>
		</view>
		<Tabbar />
	</view>
</template>

<script>
	import ProfileHeader from '../../components/ProfileHeader/ProfileHeader.vue';
	import NftCard from '../../components/NftCard/NftCard.vue';
	import Tabbar from '../../components/Tabbar/Tabbar.vue';
	
	import {accountInfoReq,publishListRqe,likeListReq,buyListReq} from '../../api/index.js';
	export default {
		components: {
			ProfileHeader,
			NftCard,
			Tabbar
		},
		data() {
			return {
				tablist: [{ name: '我发布的', },
					{ name: '我购买的', },
					{ name: '我喜欢的', }
				],
				profileInfo:{
					avatar:'',
					nickname:''
				},
				activeTab: 0,
				
				page_p: 1,
				pageSize_p: 20,
				isReq_p: false,
				count_p: 21,
				nftList_p: [],
				
				page_l: 1,
				pageSize_l: 20,
				isReq_l: false,
				count_l: 21,
				nftList_l: [],
				
				page_b: 1,
				pageSize_b: 20,
				isReq_b: false,
				count_b: 21,
				nftList_b: [],
			};
		},
		onShow() {
			this.getAccountInfo();
			switch (this.activeTab){
				case 0:
				this.getPublishList()
					break;
				case 1:
				this.getBuyList()
					break;
				default:
				this.getLikeList()
					break;
			}
			
		},
		onLoad() {
			
		},
		methods: {
			getAccountInfo(){
				accountInfoReq().then(res=>{
					const {
						avatar,
						nickname
					} = res;
					
					this.profileInfo = {
						nickname,
						avatar
					}
				});
			},
			
			getPublishList() {
				
				const {
					page_p,
					pageSize_p,
					isReq_p,
					count_p
				} = this;
				if (pageSize_p * page_p >= count_p) return;
				if (isReq_p) return;
							
				this.isReq_p = true;
				publishListRqe({
					page:page_p,
					page_size: pageSize_p,
				}).then(res => {
					const {
						result,
						count
					} = res;
					this.count_p = count;
					if (result && result.length > 0) {
						if (page_p === 1) {
							this.nftList_p = result;
						} else {
							this.nftList_p.splice(this.nftList_p.length, 0, ...result);
						}
					}
					this.page_p++;
					this.isReq_p = false;
				}).catch(() => {
					this.isReq_p = false;
				});
			},
			getLikeList(){
				const {
					page_l,
					pageSize_l,
					isReq_l,
					count_l
				} = this;
				if (pageSize_l * page_l >= count_l) return;
				if (isReq_l) return;
							
				this.isReq_l = true;
				likeListReq({
					page:page_l,
					page_size: pageSize_l,
				}).then(res => {
					const {
						result,
						count
					} = res;
					this.count_l = count;
					if (result && result.length > 0) {
						if (page_l === 1) {
							this.nftList_l = result;
						} else {
							this.nftList_l.splice(this.nftList_l.length, 0, ...result);
						}
					}
					this.page_l++;
					this.isReq_l = false;
				}).catch(() => {
					this.isReq_l = false;
				});
			},
			getBuyList(){
				const {
					page_b,
					pageSize_b,
					isReq_b,
					count_b
				} = this;
				if (pageSize_b * page_b >= count_b) return;
				if (isReq_b) return;
							
				this.isReq_b = true;
				buyListReq({
					page:page_b,
					page_size: pageSize_b,
				}).then(res => {
					const {
						result,
						count
					} = res;
					this.count_b = count;
					if (result && result.length > 0) {
						if (page_b === 1) {
							this.nftList_b = result;
						} else {
							this.nftList_b.splice(this.nftList_b.length, 0, ...result);
						}
					}
					this.page_b++;
					this.isReq_b = false;
				}).catch(() => {
					this.isReq_b = false;
				});
			},
			
			tabClickHandler(e){
				const{index} = e;
				this.activeTab = index;
				switch (index){
					case 0:
						this.getPublishList();
						break;
					case 1:
						this.getBuyList();
						break;
					default:
						this.getLikeList();
						break;
				}
			}
		}
	};
</script>

<style scoped>
	.nav_bar>>>.u-navbar__content__left {
		display: none;
	}

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

	.nav_bar>>>.u-navbar__content__right {
		right: 48rpx;
		top: 0px;
		padding: 0 !important;
	}

	.u-nav-slot {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FEFEFE;
		border: 1px solid #F5F5F5;
		border-radius: 50%;
		padding: 0 !important;
		width: 46px;
		height: 46px;
	}
	.nfts_list {
		height: calc(100vh - 140px - env(safe-area-inset-bottom))!important;
	}
	.nfts_list>>>.uni-scroll-view-content>view {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 20rpx;
	}
</style>
