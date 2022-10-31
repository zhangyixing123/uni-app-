<template>
	<view>
		<u-navbar title="银行卡" :placeholder="true" class="nav_bar" :autoBack="true" leftIconColor="#151517"></u-navbar>

		<view class="custom_container">
			<u-form labelPosition="top" :model="cardInfo" :rules="rules" ref="form">
				<u-form-item label="姓名" labelWidth="auto" prop="name">
					<u-input :adjustPosition="false" v-model="cardInfo.name" placeholder="">
					</u-input>
				</u-form-item>
				<u-form-item label="银行卡号" labelWidth="auto" prop="no">
					<u-input :adjustPosition="false" v-model="cardInfo.no" placeholder="">
					</u-input>
				</u-form-item>
				<u-form-item label="所属银行" labelWidth="auto" prop="bank">
					<u-input :adjustPosition="false" v-model="cardInfo.bank" @focus="showBankList" placeholder="">
					</u-input>
				</u-form-item>
				<u-form-item label="开户银行" labelWidth="auto" prop="address">
					<u-input :adjustPosition="false" v-model="cardInfo.address" placeholder="">
					</u-input>
				</u-form-item>

				<u-picker :show="show" :columns="bankList" keyName="name" @cancel="bankCancelHandler"
					@confirm="bankConfirmHandler" @change="bankChangeHandler"></u-picker>
			</u-form>
			<u-gap height="27"></u-gap>
			<view class="btn_group">
				<u-button color="#2E2F3A" text="绑定银行卡" size="large" @click="updateCardHandler"></u-button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		bankListReq,
		cardBindReq
	} from '../../api/index.js'
	export default {
		data() {
			return {
				bankList: [],
				show: false,
				cardInfo: {
					name: '',
					no: '',
					bank: '',
					bankId: '',
					address: ''
				},
				rules: {
					name: {
						type: 'string',
						required: true,
						message: '请填写正确的姓名',
						trigger: ['blur', 'change']
					},
					no: {
						type: 'string',
						required: true,
						message: '请填写正确的卡号',
						trigger: ['blur', 'change']
					},
					bank: {
						type: 'string',
						required: true,
						message: '请选择所属银行',
						trigger: ['blur']
					},
					address: {
						type: 'string',
						required: true,
						message: '请填写开户银行信息',
						trigger: ['blur']
					},
				},
			};
		},
		onLoad() {
			this.getBankList();
		},
		methods: {
			getBankList() {
				bankListReq().then(res => {
					this.bankList = [res];
				})
			},
			showBankList() {
				this.show = true;
			},
			bankChangeHandler(e) {
				const {
					id,
					name
				} = e.value[0];

				this.cardInfo = {
					...this.cardInfo,
					bank: name,
					bankId: id
				}
				this.show = false;

			},
			bankConfirmHandler(e) {
				const {
					id,
					name
				} = e.value[0];

				this.cardInfo = {
					...this.cardInfo,
					bank: name,
					bankId: id
				}

				this.show = false;

			},
			bankCancelHandler() {
				this.show = false;
			},
			updateCardHandler() {
				this.$refs.form.validate().then(res => {
					const {
						name,
						no,
						bank,
						bankId,
						address,
					} = this.cardInfo;
					cardBindReq({
						name,
						bank_id: bankId,
						bank_name: address,
						bank_num: no
					}).then(res => {
						uni.navigateBack()
					})
				}).catch(errors => {})

			}
		}
	};
</script>

<style scoped>

</style>
