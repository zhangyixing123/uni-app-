<template>
	<view  class="all_nft-container"  >
		<u-navbar title="全部" :placeholder="true" class="nav_bar" :autoBack="true" leftIconColor="#151517"></u-navbar>
		<u-sticky bgColor="#fff" offset-top="95">
			<u-gap height="15"></u-gap>
			<u-tabs :list="tablist" @click="tabClickHandler" lineColor="#BC42FF" :scrollable="false">
				<!-- <view slot="center" style="padding-left: 4px;" >
					<u-icon name="arrow-up-fill" color="#BC42FF" size="10"></u-icon>
					<u-icon name="arrow-down-fill" color="#606266C2" size="10"></u-icon>
				</view> -->
			</u-tabs>
		</u-sticky>
		<u-gap height="12"></u-gap>
		<u-list @scrolltolower="scrolltolower" class="nfts_list">
			<u-list-item v-for="nft in nftList" :key="nft.id">
				<NftCard class="nft_card" :info="nft" />
			</u-list-item>
			<u-divider text="没有更多了..." :hairline="true" v-show="pageSize*page >= count"></u-divider>
		</u-list>
		<!-- <Tabbar /> -->

	</view>
</template>

<script>
	// import Tabbar from '../../components/Tabbar/Tabbar.vue';
	import NftCard from '../../components/NftCard/NftCard.vue';
	import {
		allNftsReq
	} from '../../api/index.js';

	export default {
		components: {
			// Tabbar,
			NftCard
		},
		data() {
			return {
				tablist: [{
					name: '推荐',
					// sort: '+',
					// isShow: true
				}, {
					name: '点赞',
					sort: '+',
					isShow: false
				}, {
					name: '价格',
					sort: '+',
					isShow: false
				}, {
					name: '时间',
					sort: '+',
					isShow: false
				}],
				page: 1,
				pageSize: 20,
				isReq: false,
				count: 21,
				nftList: [],
				activeTab: 0,
			};
		},
		onShow() {
			this.page = 1;
			this.getAllNftList();
		},
		methods: {
			getAllNftList() {
				// index 推荐排序、price 价格排序、create_time 创建时间、sales 销量。   倒序就在对应字段前面加个-号就行了，如 sort=-index

				const {
					page,
					pageSize,
					isReq,
					count,
					activeTab,
					tablist
				} = this;

				if (pageSize * page >= count) return;
				if (isReq) return;

				const sortList = ['index', 'likes', 'price', 'create_time'];

				let sort = sortList[activeTab];

				const operator = tablist[activeTab].sort;
				if (operator === '-')
					sort = operator + sort;


				this.isReq = true;
				allNftsReq({
					page,
					page_size: pageSize,
					sort
				}).then(res => {
					const {
						result,
						count
					} = res;
					this.count = count;
					if (result && result.length > 0) {
						if (page === 1) {
							this.nftList = result;
						} else {
							this.nftList.splice(this.nftList.length, 0, ...result);
						}
					}
					this.page++;
					this.isReq = false;
				}).catch((err) => {
					this.isReq = false;
					
					
				});

			},
			scrolltolower() {
				this.getAllNftList();
			},
			tabClickHandler(e) {
				const {
					index
				} = e;
				
				
				let {
					tablist
				} = this;
				
				
				tablist = tablist.map(item => {
					item.isShow = false
					return item
				})
				
				if(index > 0){
					let tab = tablist[index];
					
					tab.isShow = true
					
					if (this.activeTab === index) {
						//只是升降序
						tab.sort = (tab.sort === '+' ? '-' : '+');
					} else {
						this.activeTab = index;
					}
					
					this.tablist.splice(index, 1, tab)
				}

				


				this.page = 1;
				this.count = 21;
				this.getAllNftList();
			}
		}
	};
</script>

<style scoped>
	.all_nft-container {
		padding: 48rpx 38rpx calc(env(safe-area-inset-bottom) / 2 + 24rpx);
	}

	/* .scroll-Y {
		height: 300rpx;
		display: flex;
		flex-wrap: wrap;
	} */
	.nft_card {
		margin-bottom: 24rpx;
	}

	.nft_card>>>.u-transition {
		width: 284rpx;
		height: 336rpx;
		margin: auto;
	}

	.nfts_list {
		height: calc(100vh - 164px - env(safe-area-inset-bottom)) !important;
	}

	.nfts_list>>>.uni-scroll-view-content>view {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-between;
		padding-top: 20rpx;
	}
</style>
