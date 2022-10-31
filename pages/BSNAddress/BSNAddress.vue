<template>
	<view>
		<u-navbar title="BSN地址" :placeholder="true" class="nav_bar" :autoBack="true" leftIconColor="#151517"></u-navbar>
		<u-gap height="20"></u-gap>
		<view class="bsn_container">
			<view class="card_container">
				<view class="card_header">
					<view class="avatar_container">
						<u-avatar size="60" :src="accountInfo.avatar" class="avatar"></u-avatar>
					</view>
					<u-gap height="30"></u-gap>
					<u-text :text="`${accountInfo.nickname}的BSN地址码`" align="center" color="#ffffff"></u-text>

				</view>
				<view class="card_body" @touchstart="barcodeTouchStartHandler" @touchend="barcodeTouchEndHandler">
					<u-gap height="25"></u-gap>
					<u-text text="扫一扫下方的二维码图案,获取BSN地址" size="14" align="center" color="#cfcfcf"></u-text>
					<u-gap height="35"></u-gap>
					<u-image :src="bsnQrcode" width="200" height="200">
						<view slot="error" style="font-size: 24rpx;">加载失败</view>
					</u-image>
					<u-gap height="15"></u-gap>
					<u-text text="(长按二维码保存至相册)" size="14" align="center" color="#cfcfcf"></u-text>
				</view>

				<view class="card_footer">
					<view>
						<view class="card_footer_title">
							<u-text text="BSN地址" color="#cfcfcf" size="12"></u-text>
							<u-icon name="file-text" color="#cfcfcf" @click="copyToClipboard"></u-icon>
						</view>
						<u-gap height="10"></u-gap>
						<u-text :text="accountInfo.bsn_address" size="12"></u-text>
					</view>
				</view>
			</view>
			<u-gap height="15"></u-gap>
			<view style="text-indent: 2em;">
				<u-text text="BSN是由国家信息中心牵头，会同中国移动、中国银联等单位联合发起并建立，是基于区块链技术的全球性基础设施网络，是可信、可控、可扩展的联盟链。"  size="14"  color="#cfcfcf"></u-text>
				<u-text text="BSN地址是您在BSN区块链服务网络上唯一的身份证明也是个人数字资产的存储地址，一旦遗失无人可寻回。"  size="14"  color="#cfcfcf"></u-text>
			</view>
			
			
			
			
			

		</view>
	</view>
</template>

<script>
	import { bsnAddressReq } from '../../api/index.js';
	export default {
		data() {
			return {
				accountInfo: {
					avatar:'',
					nickname:'',
					bsn_address:''
				},
				startTime: 0,
				bsnQrcode:''
			};
		},
		
		onShow() {
			let accountInfo = uni.getStorageSync('account');
			accountInfo = JSON.parse(accountInfo);
			const {
				avatar,
				nickname,
				bsn_address
			} = accountInfo;
			this.accountInfo = {
				avatar,
				nickname,
				bsn_address
			};
			
			this.getQrCode();
		},
		methods: {
			getQrCode(){
				bsnAddressReq().then(res=>{
					this.bsnQrcode ='data:image/png;base64,'+ res
				})
			},
			barcodeTouchStartHandler() {
				this.startTime = Date.now();
			},
			barcodeTouchEndHandler() {
				const endTime = Date.now();
				if (endTime - this.startTime < 2000) {
					return;
				}

				uni.saveImageToPhotosAlbum({
					filePath: 'https://cdn.uviewui.com/uview/goods/1.jpg',
					success: res => {
						uni.$u.toast('保存成功！');
					}
				});
			},
			copyToClipboard(){
				const { bsn_address } = this.accountInfo;
				uni.setClipboardData({
					data:bsn_address,
					success:()=>{
						uni.$u.toast('复制成功！');
					}
				});
			}
		}
	};
</script>

<style>
	.bsn_container {
		padding: 48rpx 48rpx calc(env(safe-area-inset-bottom) / 2 + 24rpx);
	}

	.card_container {
		border-radius: 8px;
		box-shadow: 0 0 3px #efefef;
	}

	.card_header {
		position: relative;
		padding: 20rpx 40rpx;
		border: 1px solid #BC42FF;
		background-color: #BC42FF;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}


	.avatar_container {
		position: absolute;
		width: 60px;
		height: 60px;
		left: 0;
		top: -60px;
		right: 0;
		bottom: 0;
		margin: auto;
		border: 3px solid #BC42FF;
		border-radius: 50%;
		display: flex;

	}

	.card_body {

		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #ffffff;
		border: 1px solid #efefef;
/* 		box-shadow: 0 0 3px #efefef;
 */		border-bottom-width: 0;
	}

	.card_footer {

		border-bottom-left-radius: 8px;
		border-bottom-right-radius: 8px;
		padding: 10px;
		background-color: #ffffff;
		border: 1px solid #efefef;
		border-top-width: 0;
	}
	
	.card_footer >view {
		background-color: #fefefe;
		border-color: 1px solid #ffffff;
		
		border-radius: 8px;
		padding: 10px 20px;
	}
	
	.card_footer_title {
		display: flex;
		justify-content: space-between;
	}
</style>
