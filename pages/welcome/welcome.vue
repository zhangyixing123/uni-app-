<template>
	<view>
		<view class="welcome_container">
			<u-image src="/static/welcome/welcome.png" width="100%" height="100%" :fade="true" duration="450"
				mode="aspectFill">
			</u-image>
		</view>
		<u-gap height="40"></u-gap>
		<u-text class="title_1" text="真艺术真价值" align="center" color="#151517" size="28"></u-text>
		<u-gap height="48"></u-gap>
		<u-text class="title_2" text="民生数藏，带来真艺术真价值" align="center" color="#8e8e8e" size="14"></u-text>

		<view class="btn_group">
			<u-button color="#BC42FF" text="登录" size="large" @click="linkToLogin"></u-button>
		</view>
	</view>
</template>

<script>
	
	export default {
		
		data() {
			return {

			}
		},
		methods: {
			linkToLogin() {
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		}
	}
</script>

<style>
	.welcome_container>>>.u-transition {
		width: 100vw;
		height: 700rpx;
	}

	.title_1>>>span {
		font-weight: 600;
		line-height: 36px;
		letter-spacing: 0.005em;
	}

	.title_2>>>span {
		font-weight: 400;
		line-height: 22px;
		letter-spacing: 0.005em;
	}

	.btn_group {
		position: fixed;
		display: flex;
		bottom: 36px;
		width: calc(100vw - 98rpx);
		background-color: #fefefe;
		padding: 48rpx 48rpx calc(env(safe-area-inset-bottom) / 2 + 24rpx);

	}

	/* .u-button>>>.u-button__text {
		font-size: 24px !important;
	} */
</style>
