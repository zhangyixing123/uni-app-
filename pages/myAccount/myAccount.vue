<template>
	<view class="custom_container">
		<u-navbar title="我的账户" :placeholder="true" class="nav_bar" :autoBack="true" leftIconColor="#151517"></u-navbar>

		<view class="balance_container">
			<u-text text="账户余额" color="#ffffff" size="12" align="center" class="title_1"></u-text>
			<u-gap height="12"></u-gap>
			<u-text mode="price" :text="balance" color="#ffffff" size="24" align="center" class="title_2"></u-text>

			<!-- <u-count-to :startVal="0" :endVal="balance" :decimals="2" color="#ffffff" size="24" separator=","></u-count-to> -->

			<navigator class="balance_icon" url="/pages/withdrawal/withdrawal">
				<u-icon size="20" name="rmb-circle-fill" color="#ffffff"></u-icon>
			</navigator>

		</view>

		<u-gap height="10"></u-gap>
		<u-sticky bgColor="#fff" offset-top="95">
			<u-gap height="15"></u-gap>
			<!-- <u-subsection :list="tablist" :current="1" keyName="name"></u-subsection> -->
			<u-tabs :list="tablist" @click="tabClickHandler" lineColor="#BC42FF" :scrollable="false"></u-tabs>
		</u-sticky>

		<u-gap height="15"></u-gap>
		

		<view v-show="activeTab === 0">
			<u-list @scrolltolower="getInList">
				<u-list-item v-for="item in list_i" :key="item.id">
					<u-cell :title="item.remark" :label="$u.timeFormat(item.create_time, 'yyyy年mm月dd日hh时MM分ss秒')">
						<u-text slot="value" class="u-slot-value" :text="`¥ ${item.amount}`"
							color="#BC42FF"></u-text>
					</u-cell> 
				</u-list-item>
				<u-divider text="没有更多了..." :hairline="true" v-show="pageSize_i*page_i >= count_i"></u-divider>
			</u-list>
			
		</view>


		<view v-show="activeTab === 1">
			<u-list @scrolltolower="getOutList" class="nfts_list">
				<u-list-item v-for="item in list_o" :key="item.id">
					<u-cell :title="item.remark" :label="$u.timeFormat(item.create_time, 'yyyy年mm月dd日hh时MM分ss秒')">
						<u-text slot="value" class="u-slot-value" :text="`¥ ${item.amount}`"
							color="#BC42FF"></u-text>
					</u-cell> 
				</u-list-item>
				<u-divider text="没有更多了..." :hairline="true" v-show="pageSize_o*page_o >= count_o"></u-divider>
			</u-list>
			
		</view>

		

	</view>
</template>

<script>
	import {
		tradeHistoryReq
	} from '../../api/index.js'
	export default {
		data() {
			return {
				balance: '',
				tablist: [{
					name: '收入',
				}, {
					name: '支出'
				}],
				activeTab: 0,
				list_i: [],
				page_i: 1,
				pageSize_i: 20,
				isReq_u: false,
				count_i: 21,


				list_o: [],
				page_o: 1,
				pageSize_o: 20,
				isReq_u: false,
				count_o: 21
			};
		},
		onShow() {
			let accountInfo = uni.getStorageSync('account');
			accountInfo = JSON.parse(accountInfo);
			const {
				amount
			} = accountInfo;
			this.balance = amount;

			this.page_i = 1;
			this.getInList()
		},
		methods: {
			tabClickHandler(e) {
				const {
					index
				} = e;
				this.activeTab = index;
				switch (index) {
					case 0:
						this.getInList();
						break;
					case 1:
						this.getOutList();
						break;
				}
			},
			getInList() {
				const {
					page_i,
					pageSize_i,
					isReq_i,
					count_i
				} = this;
				if (pageSize_i * page_i >= count_i) return;
				if (isReq_i) return;

				this.isReq_i = true;
				tradeHistoryReq({
					page: page_i,
					page_size: pageSize_i,
					type: 0
				}).then(res => {
					const {
						result,
						count
					} = res;
					this.count_i = count;
					if (result && result.length > 0) {
						if (page_i === 1) {
							this.list_i = result;
						} else {
							this.list_i.splice(this.list_i.length, 0, ...result);
						}
					}
					this.page_i++;
					this.isReq_i = false;
				}).catch(() => {
					this.isReq_i = false;
				});
			},
			getOutList() {
				const {
					page_o,
					pageSize_o,
					isReq_o,
					count_o
				} = this;
				if (pageSize_o * page_o >= count_o) return;
				if (isReq_o) return;

				this.isReq_o = true;
				tradeHistoryReq({
					page: page_o,
					page_size: pageSize_o,
					type: 1
				}).then(res => {
					const {
						result,
						count
					} = res;
					this.count_o = count;
					if (result && result.length > 0) {
						if (page_o === 1) {
							this.list_o = result;
						} else {
							this.list_o.splice(this.list_o.length, 0, ...result);
						}
					}
					this.page_o++;
					this.isReq_o = false;
				}).catch(() => {
					this.isReq_o = false;
				});
			}
		}
	};
</script>

<style>
	.balance_container {
		background: linear-gradient(to bottom right, #c376e2, #BC42FF);
		border-radius: 8px;
		padding: 20px;
		position: relative;
	}

	.title_1>>>span {
		font-weight: 400;
		line-height: 14px;
	}

	.title_2>>>span {
		font-weight: 600;
		line-height: 28px;
	}

	.balance_icon {
		position: absolute;
		right: 10px;
		top: 10px;
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
	>>>.u-cell__body__content {
		flex: auto;
	}
		.u-slot-value {
			justify-content: flex-end !important;
		}
</style>
