<template>
	<view class="custom_container">
		<!-- https://qr.alipay.com/bax05549yvrjybno8mkq00f4  支付宝支付 -->
		<u-navbar title="支付" :placeholder="true" class="nav_bar" :autoBack="true" leftIconColor="#151517"></u-navbar>

		<view class="options_container">
			<u-cell-group :border="false">
				<u-cell v-for="way in payWayList" :key="way.type" :icon="way.icon" :title="way.name" @click="choosePayWay(way.type)">
					<view slot="value" class="uncheck_radio" v-show="way.type !== curWay"></view>
					<u-icon name="checkmark-circle-fill" color="#BC42FF" slot="value" class="checked_radio" v-show="way.type === curWay"></u-icon>
				</u-cell>
			</u-cell-group>
		</view>
		
		<view class="btn_group">
			<u-button color="#BC42FF" text="确认支付" size="large" @click="linkToPay"></u-button>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				payWayList: [{
						name: '支付宝',
						type: 'alipay',
						icon: ''
					},
					{
						name: '微信',
						type: 'wxpay'
					}
				],
				curWay: null
			};
		},
		methods: {
			choosePayWay(way){
				this.curWay = way;
			},
			linkToPay(){
				const url= 'https://qr.alipay.com/bax05549yvrjybno8mkq00f4';
				plus.runtime.openURL(url,()=>{
					// 调用失败 callback
				});  
			}
		}
	};
</script>

<style scoped>
	.options_container {
		border: 1px solid #efefef;
		border-radius: 8px;
		background-color: #ffffff;
	}
	.uncheck_radio {
		width: 12px;
		height: 12px;
		border: 1px solid #cfcfcf;
		border-radius: 50%;
	}
	
	>>>.u-line {
		border-bottom-width: 0!important;
	}
	
	.btn_group {
		position: fixed;
		display: flex;
		bottom: 0;
		left: 0;
		width: calc(100vw - 98rpx);
		background-color: #fefefe;
		padding: 48rpx 48rpx calc(env(safe-area-inset-bottom) / 2 + 24rpx);
	}
</style>
