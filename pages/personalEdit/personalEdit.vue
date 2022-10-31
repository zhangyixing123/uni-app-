<template>
	<view class="custom_container">
		<u-navbar title="基础设置" :placeholder="true" class="nav_bar" :autoBack="true" leftIconColor="#151517"></u-navbar>
		<view class="profile_header">
			<u-image height="120px" width="100%" src="https://gd-hbimg.huaban.com/ad21a32653a7d7a864261ab61d7b2e38a85fa4f681957-KGvJoR_fw658" :fade="true"
				duration="450" mode="aspectFill" :radius="4"></u-image>
			<view class="avatar_container">
				<u-avatar size="80" :src="userInfo.avatar" class="avatar"></u-avatar>
			</view>
			<u-upload  multiple class="edit_icon" :previewImage="false" :fileList="fileList1" @afterRead="afterRead" name="1" :maxCount="1" width="32" height="32">
				<u-icon name="/static/profile_icon/pen.png"></u-icon>
			</u-upload>
		
		</view>
		
		

		<u-gap height="45"></u-gap>

		<u-form labelPosition="top" :model="userInfo" ref="form">
			<u-form-item label="用户名" labelWidth="auto">
				<u-input :adjustPosition="false" v-model="userInfo.nickname" placeholder="输入你的用户名"></u-input>
			</u-form-item>
		</u-form>
		<u-gap height="85"></u-gap>
		
		<view class="btn_group">
			<u-button color="#2E2F3A" text="保存设置" size="large" @click="updatePersonalInfo"></u-button>
		</view>
	</view>
</template>

<script>
	import {
		avatarUploadReq,
		accountUpdateReq
	} from '../../api/index.js';
	export default {
		data() {
			return {
				userInfo: {
					nickname: '',
					avatar: ''
				},
				fileList1: [],
			};
		},
		onLoad() {
			let accountInfo = uni.getStorageSync('account')
			accountInfo = JSON.parse(accountInfo)
			const {
				nickname,
				avatar
			} = accountInfo;
			this.userInfo = {
				nickname,
				avatar
			}
		},

		methods: {
			deletePic(event) {
				this.fileList1.splice(event.index, 1);
			},
			async afterRead(event) {
				// const result = await this.uploadFilePromise(event.file.url);
			
				let lists = [].concat(event.file)
				let fileListLen = this[`fileList${event.name}`].length
				
				console.log(fileListLen)
				// lists.map((item) => {
				// 	this[`fileList${event.name}`].push({
				// 		...item,
				// 		status: 'uploading',
				// 		message: '上传中'
				// 	})
				// })
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url)
					// let item = this[`fileList${event.name}`][fileListLen]
					// this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
					// 	status: 'success',
					// 	message: '',
					// 	url: result
					// }))
					fileListLen++
				}
				
			},
			uploadFilePromise(url) {
				avatarUploadReq(url).then(res=>{
					
					console.log(res)
					this.userInfo.avatar = res;
				})
			},
			updatePersonalInfo(){
				const {
					nickname,
					avatar
				} = this.userInfo;
				accountUpdateReq({
					nickname,
					avatar
				}).then(()=>{
					uni.navigateBack()
				})
			}
			
		}
	};
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

	.edit_icon {
		background-color: #BC42FF;
		width: 30px;
		height: 30px;
		border-radius: 50%;
		border: 1px solid #ffffff;
		display: flex;
		align-items: center;
		justify-content: center;
		position: absolute;
		left: calc(50% + 20px);
		bottom: -40px;
	}

	.edit_icon>>>.u-upload__wrap {
		flex-shrink: 0;
		flex-grow: 0;
		flex-basis: auto;
	}
</style>
