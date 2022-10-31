<template>
	<view>
		<u-navbar title="实名认证" :placeholder="true" class="nav_bar" :autoBack="true" leftIconColor="#151517"></u-navbar>
		<view class="custom_container">
			<u-upload :fileList="frontImage" @afterRead="afterRead" @delete="deletePic" name="front" :maxCount="1"
				width="320" height="189">
				<view class="custom-upload_container" :class="{'isError': frontErr}">
					<view>
						<u-icon size="11" name="plus" color="#00C566"></u-icon>
						<u-text class="tips" text="身份证人像面" size="12" color="#00C566"></u-text>
					</view>
				</view>
			</u-upload>
			<u-gap height="20"></u-gap>

			<u-upload :fileList="backImage" @afterRead="afterRead" @delete="deletePic" name="back" :maxCount="1"
				width="320" height="189">
				<view class="custom-upload_container" :class="{'isError': backErr}">
					<view>
						<u-icon size="11" name="plus" color="#00C566"></u-icon>
						<u-text class="tips" text="身份证国徽面" size="12" color="#00C566"></u-text>
					</view>
				</view>
			</u-upload>

			<u-form labelPosition="top" :model="authInfo" :rules="rules" ref="form">
				<u-form-item label="姓名" prop="name" labelWidth="auto">
					<u-input :adjustPosition="false" v-model="authInfo.name" placeholder=""></u-input>
				</u-form-item>
				<u-form-item label="身份证号" prop="idCard" labelWidth="auto">
					<u-input :adjustPosition="false" v-model="authInfo.idCard" placeholder="" type="number"></u-input>
				</u-form-item>
			</u-form>


			<u-gap height="10"></u-gap>
			<view class="btn_group">
				<u-button color="#2E2F3A" text="确认" size="large" @click="updateAuthHandler"></u-button>
			</view>

		</view>

	</view>
</template>

<script>
	import {
		idCardUploadReq,
		accountAuthReq
	} from '../../api/index.js'
	export default {
		data() {
			return {
				frontImage: [],
				frontErr: false,
				backImage: [],
				backErr: false,
				authInfo: {
					name: '',
					idCard: ''
				},
				rules: {
					name: {
						type: 'string',
						required: true,
						message: '请填写真实姓名',
						trigger: ['blur', 'change']
					},
					idCard: [
						{
							type: 'number',
							required: true,
							message: '请填写身份证信息',
							trigger: ['blur', 'change'],
						},
						{
							pattern: (/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/),
							transform(value) {
								return String(value);
							},
							message: '请填写正确的身份证信息'
						},
					]
				},
			};
		},
		onLoad() {
			let accountInfo = uni.getStorageSync('account');
			accountInfo = JSON.parse(accountInfo);
			const {
				name,
				id_card_num,
				id_card_negative_image_url,
				id_card_positive_image_url
			} = accountInfo;
			this.authInfo = {
				name,
				idCard:id_card_num
			};
			
			if(id_card_positive_image_url)
				this.frontImage=[{
					status: 'success',
					message: '',
					url: id_card_positive_image_url
				}]
			
			if(id_card_negative_image_url)
				this.backImage=[{
					status: 'success',
					message: '',
					url: id_card_negative_image_url
				}]
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`${event.name}Image`].splice(event.index, 1);
				
				console.log(this.frontImage)
				console.log(this.backImage)
			},
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file);
				let fileListLen = this[`${event.name}Image`].length;
				lists.map(item => {
					this[`${event.name}Image`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					});
				});
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url);
					let item = this[`${event.name}Image`][fileListLen];
					this[`${event.name}Image`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}));
					this[`${event.name}Err`] = false;
					fileListLen++;
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {

					let a = idCardUploadReq(url).then(res => {
						resolve(res);
					})
				});
			},
			updateAuthHandler() {
				const {
					backImage,frontImage
				} = this;
				
				if(!(frontImage.length > 0 &&  frontImage[0].status === 'success')){
					this.frontErr = true;
					return;
				}
				
				if(!(backImage.length > 0 &&  backImage[0].status === 'success')){
					this.backErr = true;
					return;
				}
				
				const positive_image = frontImage[0].url;
				const negative_image = backImage[0].url;
				
				this.$refs.form.validate().then(res => {
					const {
						name,
						idCard
					} = this.authInfo;
					accountAuthReq({
						name,
						id_card: idCard,
						positive_image,
						negative_image
					}).then(() => {
						uni.navigateBack()
					})
				}).catch(errors => {})
			}
		}
	};
</script>

<style scoped>
	.u-upload {
		align-items: center;
	}

	.custom-upload_container {
		width: 320px;
		height: 189px;
		background: #F2F2F5;
		border: 1px solid #EBEBF0;
		border-radius: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.custom-upload_container>view {
		display: flex;
		border: 1px dashed #00C566;
		border-radius: 5px;
		padding: 8px 12px;
	}

	.custom-upload_container .tips>>>span {
		font-weight: 500;
		line-height: 18px;
		letter-spacing: -0.025em;
		margin-left: 4px;

	}

	.isError {
		border-color: red;
	}
</style>
