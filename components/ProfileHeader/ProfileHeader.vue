<template>
	<view class="">
		<view class="profile_header">
			<u-image height="120px" width="100%" src="https://gd-hbimg.huaban.com/ad21a32653a7d7a864261ab61d7b2e38a85fa4f681957-KGvJoR_fw658" :fade="true"
				duration="450" mode="aspectFill" :radius="4"></u-image>
			<view class="avatar_container">
				<u-avatar size="80" :src="info.avatar" class="avatar"></u-avatar>
			</view>
		</view>
		<u-gap height="49"></u-gap>
		<u-text class="author_name" :text="info.nickname" size="18" color="#151517" align="center"></u-text>
	</view>
</template>

<script>
	export default {
		name: "ProfileHeader",
		props:['info'],
		data() {
			return {

			};
		}
	}
</script>

<style scoped>
	.profile_header {
		position: relative;
	}

	.avatar_container {
		width: 89px;
		height: 89px;
		position: absolute;
		left: 0;
		top: 120px;
		right: 0;
		bottom: 0;
		margin: auto;
		background-color: #fefefe;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.profile_container .author_name {
		font-weight: 500;
		line-height: 26px;
		letter-spacing: 0.005em;
	}
</style>
