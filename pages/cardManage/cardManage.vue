<template>
	<view>
		<u-navbar title="银行卡" :placeholder="true" class="nav_bar" :autoBack="true" leftIconColor="#151517">
			<navigator class="u-nav-slot" slot="right" url="/pages/cardEdit/cardEdit">
				<u-icon name="man-add" size="20" color="#151517"></u-icon>
			</navigator>
		</u-navbar>

		<view class="custom_container">
			<u-list @scrolltolower="scrolltolower" height="">
				<u-list-item v-for="(card, index) in cardList" :key="index">
					<u-cell
					    :title="card.bank_num"
					    :label="`${card.name}  |  ${card.bank_office_name}`"
					>
					<u-text @click="cardUnbindHandler(card)" slot="value" class="u-slot-value" text="解绑"
						color="#BC42FF"></u-text>
					</u-cell>
				</u-list-item>
			</u-list>
		</view>
	</view>
</template>

<script>
	import {
		accountBankListReq,
		cardUnbindReq
	} from '../../api/index.js'
	export default {
		data() {
			return {
				cardList: [],
				page: 1,
				pageSize: 10
			}
		},
		onShow() {
			this.page = 1;
			this.getCardList()
		},
		methods: {
			getCardList() {
				const {
					page,
					pageSize
				} = this;
				accountBankListReq({
					page,
					page_size: pageSize
				}).then(res => {
					const {
						result
					} = res
					if (page === 1) {
						this.cardList = result;
					} else {
						this.cardList.splice(this.cardList.length, 0, ...result)
					}
					this.page++;
				})
			},
			scrolltolower() {
				this.getCardList()
			},
			cardUnbindHandler(card) {
				const {
					id
				} = card;
				cardUnbindReq(id).then(res => {
					const {
						cardList
					} = this;
					let index = -1;
					cardList.map((card, i) => {
						if (card.id === id) index = i;
					})
					
					this.cardList.splice(index,1);
				})
			}
		}
	};
</script>

<style scoped>
	.u-nav-slot {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #FEFEFE;
		border: 1px solid #F5F5F5;
		border-radius: 50%;
		padding: 0 !important;
		width: 46px;
		height: 46px;
	}
>>>.u-cell__body__content {
	flex: auto;
}
	.u-slot-value {
		justify-content: flex-end !important;
	}
</style>
