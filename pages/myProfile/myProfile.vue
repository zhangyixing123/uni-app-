<template>
	<view>
		<u-navbar title="设置" :placeholder="true" class="nav_bar" :autoBack="true" leftIconColor="#151517">
			<navigator class="u-nav-slot" slot="right" url="/pages/mint/mint">
				<u-text class="author_name" text="铸件" size="9" color="#ffffff" align="center"></u-text>
			</navigator>
		</u-navbar>

		<view class="profile_container person_container">
			<navigator class="avatar" url="/pages/personalEdit/personalEdit">
				<u-avatar size="100" :src="accountInfo.avatar" ></u-avatar>
			</navigator>
			<u-gap height="20"></u-gap>
			<u-text class="author_name" :text="accountInfo.nickname" size="18" color="#151517" align="center"></u-text>
			<view class="inv_container" @click="copyUid">
				<u-text :text="`邀请码：${accountInfo.uid}`"  size="14" color="#151517" align="center"></u-text>
				<u-icon class="icon" name="../../static/popup_icon/copy.png"></u-icon>
			</view>
			<u-gap height="38"></u-gap>
		</view>

		<view class="profile_container">
			<u-cell-group>
				<u-cell v-for="cell in celllist" :key="cell.title" :icon="cell.icon" :title="cell.title" 
					:url="cell.url">
				</u-cell>
			</u-cell-group>
			<u-gap height="114"></u-gap>
			
			<u-text @click="logout" class="log_out" text="退出登录" size="16" color="#EB5757" align="center"></u-text>
		</view>

	</view>
</template>

<script>
	import { accountInfoReq } from '../../api/index.js';
	export default {
		data() {
			return {
				accountInfo: { nickname:'',avatar:'',uid:'' },
				celllist: [{
						title: '手机号',
						icon: '/static/profile_icon/user.png',
						url: '/pages/contactInfo/contactInfo'
					},
					{
						title: 'BSN地址',
						icon: '/static/profile_icon/lock.png',
						url: '/pages/BSNAddress/BSNAddress'
					},
					{
						title: '实名认证',
						icon: '/static/profile_icon/bell.png',
						url: '/pages/realNameAuth/realNameAuth'
					},
					{
						title: '银行卡管理',
						icon: '/static/profile_icon/setting.png',
						url: '/pages/cardManage/cardManage'
					},
					{
						title: '我的账户',
						icon: '/static/profile_icon/bell.png',
						url: '/pages/myAccount/myAccount'
					},
					{
						title: '关于我们',
						icon: '/static/profile_icon/setting.png',
						url: '/pages/aboutUs/aboutUs'
					},
					
				]
			};
		},
		onLoad() {
			
		},
		onShow() {
			this.getAccountInfo();
		},
		methods: {
			getAccountInfo(){
				accountInfoReq().then(res=>{
					const {
						avatar,
						nickname,
						bsn_address,
						phone,
						name,
						id_card_num,
						id_card_negative_image_url,
						id_card_positive_image_url,
						amount,
						uid
					} = res;
					const accountInfo = {
						avatar,
						nickname,
						bsn_address,
						phone,
						name,
						id_card_num,
						id_card_negative_image_url,
						id_card_positive_image_url,
						amount,
						uid
					}
					
					uni.setStorageSync('account',JSON.stringify(accountInfo))
					this.accountInfo = accountInfo;
					
					// avatar: ""
					// bsn_address: "0x6805aa98e54229"
					// create_time: 1660014081
					// del_time: 0
					// id: 2
					// id_card_negative_image_url: ""
					// id_card_num: ""
					// id_card_positive_image_url: ""
					// name: ""
					// nickname: ""
					// phone: "15968339496"
					// pid: 0
					// role: 0
					// status: 0
					// uid: "sTPwgnjS"
					// update_time: 0
				});
			},
			logout(){
				try {
					uni.clearStorageSync();
					uni.reLaunch({
						url:'/pages/login/login'
					})
				} catch (e) {
					// error
				}
				
			},
			copyUid(){
				const {uid} = this.accountInfo;
				uni.setClipboardData({
					data: uid,
					success:()=>{
						uni.$u.toast('复制成功！');
					}
				})
			}
		}
	};
</script>

<style scoped>
	.nav_bar>>>.u-navbar__content__right {
		right: 48rpx;
		top: 0px;
		padding: 0 !important;
	}

	.u-nav-slot {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FF7438;
		border: 1px solid #F5F5F5;
		border-radius: 50%;
		padding: 0 !important;
		width: 32px;
		height: 32px;
	}

	.profile_container {
		padding: 48rpx 48rpx calc(env(safe-area-inset-bottom) / 2 + 24rpx);
	}

	.person_container {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.profile_container .author_name {
		font-weight: 500;
		line-height: 26px;
		letter-spacing: 0.005em;
	}

	>>>.u-cell-group .u-cell__body {
		padding: 16px 0;
	}

	>>>.u-cell-group .u-cell__body .u-icon__img {
		height: 20px !important;
		margin-right: 36rpx;
	}

	/* >>>.u-cell__right-icon-wrap {
		display: none;
	}

	>>>.u-cell-group__wrapper>.u-line {
		display: none;
	} */

	.profile_container .log_out {
		font-weight: 500;
		line-height: 24px;
		letter-spacing: 0.005em;
	}
	
	.inv_container {
		display: flex;
	}
	
	.inv_container .icon {
		margin-left: 10px;
	}
</style>
