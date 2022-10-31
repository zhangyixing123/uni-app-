<template>
	<view>
		<u-navbar title="编辑作品" :placeholder="true" class="nav_bar" :autoBack="true" leftIconColor="#151517"></u-navbar>
		<view class="mint_container">
			<u-upload :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="6" multiple :maxCount="1"
				width="320" height="189">
				<view class="custom-upload_container">
					<view>
						<u-icon size="11" name="plus" color="#00C566"></u-icon>
						<u-text class="tips" text="增加图片（最多1张）" size="12" color="#00C566"></u-text>
					</view>
				</view>
			</u-upload>

			<u-form labelPosition="top" :model="mintInfo" :rules="rules" ref="form">
				<u-form-item label="作品名称" prop="name" labelWidth="auto">
					<u-input :adjustPosition="false"v-model="mintInfo.name" placeholder="Pln uranus #06"></u-input>
				</u-form-item>
				<u-form-item label="销售价格" prop="price" labelWidth="auto">
					<u-input :adjustPosition="false" v-model="mintInfo.price" placeholder="¥ 12" type="number"></u-input>
				</u-form-item>
				<u-form-item label="创作故事" prop="desc" labelWidth="auto">
					<u-textarea :adjustPosition="false" v-model="mintInfo.desc" placeholder="请输入内容" confirmType="done"></u-textarea>
				</u-form-item>
			</u-form>
			
			
		</view>
		<view class="btn_group">
			<u-button color="#BC42FF" text="确认编辑" size="large"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList: [],
				mintInfo: {
					name: '',
					price: '',
					desc:''
				},
				rules: {
					name: {
						type: 'string',
						required: true,
						message: '请填写作品名称',
						trigger: ['blur', 'change']
					},
					price: {
						type: 'number',
						required: true,
						message: '请填写销售价格',
						trigger: ['blur', 'change']
					},
				}
			};
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this[`fileList${event.name}`].splice(event.index, 1);
			},
			async afterRead(event) {
				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file);
				let fileListLen = this[`fileList${event.name}`].length;
				lists.map(item => {
					this[`fileList${event.name}`].push({
						...item,
						status: 'uploading',
						message: '上传中'
					});
				});
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url);
					let item = this[`fileList${event.name}`][fileListLen];
					this[`fileList${event.name}`].splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}));
					fileListLen++;
				}
			},
			uploadFilePromise(url) {
				return new Promise((resolve, reject) => {
					let a = uni.uploadFile({
						url: 'http://www.example.com/upload', // 仅为示例，非真实的接口地址
						filePath: url,
						name: 'file',
						formData: { user: 'test' },
						success: res => {
							setTimeout(() => {
								resolve(res.data.data);
							}, 1000);
						}
					});
				});
			},
		}
	};
</script>

<style scoped>
	.mint_container {
		padding: 48rpx 48rpx calc(env(safe-area-inset-bottom) / 2 + 24rpx);
	}

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

	.u-form>>>.u-form-item__body__left__content__label {
		font-weight: 600;
		font-size: 14px;
		line-height: 22px;
		letter-spacing: 0.005em;
		color: #2E2F3A;
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
