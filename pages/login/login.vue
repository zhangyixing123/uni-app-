<template>
	<view>
		<u-navbar leftIconColor="#fefefe" bgColor="#ffffff00" :autoBack="true" title="登录" class="nav_bar">
		</u-navbar>
		<view class="bg_container">
			<u-gap height="100"></u-gap>
			<u-text class="title_1" text="Hi,欢迎回来! 👋" size="24" color="#fefefe"></u-text>
			<u-gap height="8"></u-gap>
			<u-text class="title_2" text="第一次登录，将自动注册" size="14" color="#DDE5E9"></u-text>
		</view>

		<view class="login_container">
			<u-form labelPosition="top" :model="loginInfo" :rules="rules" ref="form">
				<u-form-item label="手机号码" prop="phone" labelWidth="auto">
					<u-input fontSize="12" :adjustPosition="false" v-model="loginInfo.phone" placeholder="输入你的手机zuobu号码" type="number">
						<template slot="suffix">
							<u-code start-text="发送验证码" ref="uCode" @change="codeChange" seconds="60"
								changeText="X秒重新获取"></u-code>
							<u-text @tap="getCode" color="#FF3838" size="13" :text="tips" class="u-page__code-text">
								{{tips}}
							</u-text>
						</template>
					</u-input>
				</u-form-item>
				<u-form-item label="验证码" prop="veriCode" labelWidth="auto">
					<u-code-input borderColor="#F2F2F5"  v-model="loginInfo.veriCode" maxlength="4" dot size="48" :adjustPosition="false">
					</u-code-input>
				</u-form-item>
				<u-form-item label="邀请码" labelWidth="auto">
					<u-input fontSize="12"  :adjustPosition="false" v-model="loginInfo.inviCode" placeholder="输入你的邀请码"></u-input>
				</u-form-item>
			</u-form>
			<u-gap height="27"></u-gap>
			<view class="btn_group">
				<u-button color="#2E2F3A" text="登录" size="large" @click="linkToIndex"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		veriCodeReq,
		loginReq
	} from '../../api/index.js';

	import {
		mapMutations
	} from 'vuex';
	export default {
		data() {
			return {
				loginInfo: {
					phone: '',
					veriCode: '',
					inviCode: ''
				},
				rules: {
					phone: [{
							type: 'string',
							required: true,
							message: '请填写正确的手机号',
							trigger: ['blur', 'change']
						},
						{
							pattern: (/^1[3456789]\d{9}$/),
							transform(value) {
								return String(value);
							},
							message: '请填写正确的手机号'
						},
					],
					veriCode: {
						type: 'string',
						required: true,
						len: 4,
						message: '请填写4位验证码',
						trigger: ['blur']
					},
				},
				tips: '',
				value: ''

			}
		},
		methods: {
			...mapMutations(['changeToken']),
			codeChange(text) {
				this.tips = text;
			},
			getCode() {
				const {
					phone
				} = this.loginInfo;
				const reg = new RegExp(/^1[3456789]\d{9}$/);

				if (!reg.test(phone)) {
					uni.$u.toast('请输入正确的手机号');
					return false;
				}

				if (this.$refs.uCode.canGetCode) {
					uni.showLoading({
						title: '正在获取验证码'
					})

					veriCodeReq({
						phone
					}).then(res => {
						uni.hideLoading();
						uni.$u.toast('验证码已发送');
						this.$refs.uCode.start();
					}).catch(err => {

					})
				} else {
					uni.$u.toast('倒计时结束后再发送');
				}
			},
			linkToIndex() {
				this.$refs.form.validate().then(res => {
					const {
						phone,
						veriCode,
						inviCode
					} = this.loginInfo
					loginReq({
						phone,
						code: veriCode,
						invitation: inviCode
					}).then(res => {
						this.changeToken(res)
						uni.switchTab({
							url: '/pages/index/index'
						})
					})
				}).catch(errors => {})

			}
		}
	}
</script>

<style scoped>
	.nav_bar>>>.u-navbar__content__left {
		background: linear-gradient(98.21deg, rgba(255, 255, 255, 0.264) -2.97%, rgba(255, 255, 255, 0.066) 103.09%);
		backdrop-filter: blur(20px);
		width: 48px;
		height: 48px;
		border-width: 0;
	}

	.nav_bar>>>.u-navbar__content__title {
		color: #fefefe;
		font-size: 18px;
		font-weight: 600;
		line-height: 26px;
		letter-spacing: 0.005em;

	}

	.bg_container {
		background-color: #BC42FF;
		height: 450rpx;
		width: 100vw;
		padding: 0 48rpx;
	}

	.bg_container .title_1>>>span {
		font-weight: 600;
		line-height: 32px;
		letter-spacing: 0.005em;
	}

	.bg_container .title_2>>>span {
		font-weight: 400;
		line-height: 22px;
		letter-spacing: 0.005em;
	}

	.login_container {
		padding: 32rpx 48rpx calc(env(safe-area-inset-bottom) / 2 + 24rpx);
	}

	>>>.u-form-item__body__right__content__slot {
		justify-content: space-around;
	}
</style>
