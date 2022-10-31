<template>
	<view>
		<u-navbar leftIconColor="#fefefe" bgColor="#ffffff00" :autoBack="true" title="" class="nav_bar">
			<view class="u-nav-slot" slot="right">
				<view class="icon_container" @click="heartClickHandler">
					<u-icon name="heart" size="20" color="#fefefe" v-show="!nftInfo.liked"></u-icon>
					<u-icon name="heart-fill" size="20" color="#e6103b" v-show="nftInfo.liked"></u-icon>
				</view>
				<view class="icon_container">
					<u-icon name="more-dot-fill" size="20" color="#fefefe"></u-icon>
				</view>
			</view>
		</u-navbar>
		<u-image height="auto" width="100vw" :src="nftInfo.image" :fade="true" duration="450" mode="widthFix"
			:radius="4"></u-image>
		<view class="desc_container">
			<view class="title_container">
				<u-text class="title" :text="nftInfo.name" size="18" color="#2B2D41"></u-text>
				<view class="title-right_container">
					<Like :info="likeInfo" @toggleLike="heartClickHandler('child')" />
					<u-button text="分享" color="#2E2F3A" size="small" @click="shareHandler"></u-button>
				</view>
			</view>

			<u-gap height="22"></u-gap>
			<u-row>
				<u-col span="6">
					<navigator :url="`/pages/profileOther/profileOther?id=${nftInfo.author_id}`">
						<u-text class="preson_title" text="发行方" size="12" color="#8e8e8e"></u-text>
						<view class="person_container">
							<u-avatar size="32" :src="nftInfo.author_avatar"></u-avatar>
							<u-text class="person_name" :text="`@${nftInfo.author_name}`" size="12" color="#2B2D41">
							</u-text>
						</view>
					</navigator>
				</u-col>
				<u-col span="6">
					<navigator :url="`/pages/profileOther/profileOther?id=${nftInfo.owner_id}`">
						<u-text class="preson_title" text="持有者" size="12" color="#8e8e8e"></u-text>
						<view class="person_container">
							<u-avatar size="32" :src="nftInfo.owner_avatar"></u-avatar>
							<u-text class="person_name" :text="`@${nftInfo.owner_name}`" size="12" color="#2B2D41">
							</u-text>
						</view>
					</navigator>

				</u-col>
			</u-row>
			<u-gap height="26"></u-gap>
			<u-text class="main_title" text="详情" size="18" color="#151517"></u-text>
			<u-gap height="8"></u-gap>
			<u-text class="main_content" :text="nftInfo.description" size="14" color="#7c7c7c"></u-text>
			<u-gap height="22"></u-gap>
			<u-text class="main_title" text="购买需知" size="18" color="#151517"></u-text>
			<u-gap height="8"></u-gap>
			<u-text class="main_content"
				text="1、目标成为最大的服务型中文Crypto交易者社区由兔子和粉丝们共同发起成立，我们共同研讨、学习和完成实盘盈利. 2、目标成为最大的服务型中文Crypto交易者社区由兔子和粉丝们共同发起成立，我们共同研讨、学习和完成实盘盈利. 3、目标成为最大的服务型中文Crypto交易者社区由兔子和粉丝们共同发起成立，我们共同研讨、学习和完成实盘盈利. "
				size="14" color="#7c7c7c"></u-text>
			<u-gap height="86"></u-gap>
		</view>
		<l-painter v-if="isShowPainter" :isRenderImage="true" :board="drawJson" @success="renderImage"
			custom-style="position: fixed; left: 200%;" useCORS></l-painter>

		<u-popup :show="share_popup" mode="center" @close="close">
			<view class="share_img_container">
				<u-image mode="widthFix" :showLoading="true" :src="share_image" width="375px" height="557px"></u-image>
			</view>

		</u-popup>

		<u-popup :show="share_popup" :round="10">
			<view class="share_way_container">
				<view v-for="way in shareWayList" :key="way.name">
					<u-icon :name="way.icon" size="28" :color="way.color"></u-icon>
					<text>{{way.name}}</text>
				</view>
			</view>

		</u-popup>
		<!--  #ifdef  APP-PLUS -->
		<view class="btn_group">
			<text>¥ {{nftInfo.price}}</text>
			<u-button color="#2E2F3A" text="购买" size="large" @click="buyHandler"></u-button>
		</view>
		<!--  #endif -->
		<!--  #ifndef  APP-PLUS -->

		<!-- 	<wx-open-launch-app id="launch-btn" appid="wxb24995f3cd67c573" extinfo="">
			<script type="text/wxtag-template">
				<style>.btn { padding: 12px }</style>
				    <button class="btn">App内查看</button>
				  </script>
		</wx-open-launch-app> -->
		<!--  #endif -->

	</view>
</template>

<script>
	import Like from '../../components/Like/Like.vue';
	import {
		prodDetailReq,
		prodLikeReq
	} from '../../api/index.js'

	import {
		getDrawJson
	}
	from '../../utils/utils.js'

	import lPainter from '../../components/LimePainter/index.vue'

	// import wx from 'weixin-js-sdk'
	export default {
		components: {
			Like,
			lPainter
		},
		data() {
			return {
				id: null,
				nftInfo: {
					author_avatar: '',
					author_id: '',
					author_name: '',
					create_time: '',
					description: '',
					id: '',
					image: '',
					liked: '',
					likes: '',
					name: '',
					owner_avatar: '',
					owner_id: '',
					owner_name: '',
					price: '',
					sales: '',
					stock: '',
					token_id: ''
				},
				isShowPainter: false,
				drawJson: null,
				share_popup: false,
				share_image: '',
				shareWayList: [{
						name: '保存图片',
						icon: 'download',
						color: '#333333f1'
					},
					{
						name: '微信',
						icon: 'weixin-fill',
						color: '#09bb07'
					},
					{
						name: '朋友圈',
						icon: require('@/static/share/timeline.png'),
						color: ''
					},
					{
						name: '口令',
						icon: 'tags-fill',
						color: '#bc42ff'
					}
				]
			}
		},
		computed: {
			likeInfo() {
				const {
					likes,
					liked,
					id
				} = this.nftInfo;
				return {
					isLike: liked,
					count: likes,
					id
				}
			}
		},
		onLoad(options) {
			const {
				id
			} = options;

			this.id = id;
			this.getNftDetail()
		},
		methods: {
			close() {
				this.share_popup = false;
			},
			getNftDetail() {
				const {
					id
				} = this;
				prodDetailReq(id).then(res => {
					this.nftInfo = res;
				})
			},
			heartClickHandler(type) {
				const {
					id,
					liked,
					likes
				} = this.nftInfo;
				if (type) {
					// if(liked)this.nftInfo.likes=likes-1;
					// else this.nftInfo.likes=likes+1;
					this.nftInfo.liked = !liked;
				} else {
					prodLikeReq(id).then(() => {
						if (liked) this.nftInfo.likes = likes - 1;
						else this.nftInfo.likes = likes + 1;
						this.nftInfo.liked = !liked;
					})
				}
			},
			buyHandler() {

			},
			shareHandler() {
				this.drawJson = getDrawJson({
					avatar: this.nftInfo.author_avatar, //'../../static/test/avatar.jpeg',
					nickname: this.nftInfo.author_name,
					cover: this.nftInfo.image, //'../../static/test/cover.png',
					price: this.nftInfo.price,
					name: this.nftInfo.name,
					mp_qrcode: '../../static/test/avatar.jpeg',

				})
				this.isShowPainter = true
				// uni.share({
				// 	provider: "weixin",
				// 	scene: "WXSceneSession",
				// 	type: 2,
				// 	imageUrl: "https://bjetxgzv.cdn.bspapp.com/VKCEYUGU-uni-app-doc/d8590190-4f28-11eb-b680-7980c8a877b8.png",
				// 	success: function(res) {
				// 		console.log("success:" + JSON.stringify(res));
				// 	},
				// 	fail: function(err) {
				// 		console.log("fail:" + JSON.stringify(err));
				// 	}
				// });
			},
			renderImage(e) {
				this.share_image = e
				this.isShowPainter = false

				this.share_popup = true
				console.log(e)
			},
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

	.nav_bar>>>.u-navbar__content__right {
		right: 48rpx;
		top: 0px;
		padding: 0 !important;
	}

	.u-nav-slot {
		display: flex;
	}

	.icon_container {
		background: linear-gradient(98.21deg, rgba(255, 255, 255, 0.264) -2.97%, rgba(255, 255, 255, 0.066) 103.09%);
		backdrop-filter: blur(20px);
		width: 48px;
		height: 48px;
		border-width: 0;
		border-radius: 50%;
		padding: 0 !important;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.icon_container:first-child {
		margin-right: 16rpx;
	}

	.icon_container:last-child {
		transform: rotate(90deg);
	}

	.desc_container {
		padding: 32rpx 48rpx calc(env(safe-area-inset-bottom) / 2 + 24rpx);
	}

	.title_container,
	.title-right_container {
		display: flex;
		align-items: center;
	}

	.title_container .title {
		flex: auto;
	}

	.title_container .title>>>span {
		font-weight: 600;
		line-height: 26px;
		letter-spacing: 0.005em;
	}

	.title-right_container .u-button {
		margin-left: 32rpx;
	}

	.preson_title>>>span {
		font-weight: 400;
		line-height: 20px;
		letter-spacing: 0.005em;
		margin-bottom: 16rpx;
	}

	.person_container {
		display: flex;
		align-items: center;
	}

	.person_container .person_name>>>span {
		font-weight: 500;
		line-height: 20px;
		letter-spacing: 0.005em;
		margin-left: 16rpx;
	}

	.main_title>>>span {
		font-weight: 600;
		line-height: 22px;
		letter-spacing: 0.005em;
	}

	.main_content>>>span {
		font-weight: 400;
		line-height: 22px;
		letter-spacing: 0.005em;

	}

	.btn_group {
		position: fixed;
		display: flex;
		bottom: 0;
		width: calc(100vw - 98rpx);
		background-color: #fefefe;
		padding: 48rpx 48rpx calc(env(safe-area-inset-bottom) / 2 + 24rpx);
	}

	.btn_group uni-text {
		flex: 1;
		margin-right: 16px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.btn_group .u-button:first-child {
		flex: 1;
		margin-right: 16px;
	}

	.btn_group .u-button:last-child {
		flex: 2;
	}

	.share_img_container {}

	.share_way_container {
		display: flex;
		padding: 40rpx;
		justify-content: space-around
	}

	.share_way_container>view {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.share_way_container>view>>>.u-icon {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		background-color: #ebebebf1;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
