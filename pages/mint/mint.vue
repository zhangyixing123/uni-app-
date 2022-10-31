<template>
	<view>
		<u-navbar title="上传作品" :placeholder="true" class="nav_bar" :autoBack="true" leftIconColor="#151517"></u-navbar>
		<view class="mint_container">
			<u-upload :sizeType="['original']" :fileList="fileList" @afterRead="afterRead" @delete="deletePic" name="6"
				:maxCount="1" capture="album" width="320" height="189">
				<view class="custom-upload_container" :class="{'isError': ImageErr}">
					<view>
						<u-icon size="11" name="plus" color="#00C566"></u-icon>
						<u-text class="tips" text="增加图片（最多1张）" size="12" color="#00C566"></u-text>
					</view>
				</view>
			</u-upload>

			<u-form labelPosition="top" :model="mintInfo" :rules="rules" ref="form">
				<u-form-item label="作品名称" prop="name" labelWidth="auto">
					<u-input :adjustPosition="false" v-model="mintInfo.name" placeholder="Pln uranus #06"></u-input>
				</u-form-item>
				<u-form-item label="销售价格" prop="price" labelWidth="auto">
					<u-input :adjustPosition="false" v-model="mintInfo.price" placeholder="¥ 12" type="number">
					</u-input>
				</u-form-item>
				<u-form-item label="销售份数" prop="count" labelWidth="auto">
					<u-input  v-model="mintInfo.count" placeholder="" type="number"></u-input>
				</u-form-item>
				<u-form-item label="创作故事" prop="desc" labelWidth="auto">
					<u-textarea  v-model="mintInfo.desc" placeholder="请输入内容" confirmType="done">
					</u-textarea>
				</u-form-item>
			</u-form>
			<u-gap height="100"></u-gap>

		</view>

		<view class="btn_group">
			<u-button type="info" size="large">
				<slot>
					<view style="display: flex;flex-direction: column;">
						<u-text text="铸件费 ¥ 9.9" size="10" color="#000000"></u-text>
						<!-- <u-text text="¥ 9.9" size="15" color="#BC42FF"></u-text> -->
					</view>
				</slot>
			</u-button>
			<u-button color="#BC42FF" text="上链发售" size="large" @click="orderPayHandler"></u-button>
		</view>
		
		<u-action-sheet
			:show="sheetShow"
			@close="sheetShow = false"
			:actions="actions"
			cancelText="取消"
		>
		</u-action-sheet>
		<u-popup :safeAreaInsetBottom="true" :safeAreaInsetTop="true" mode="center" :show="show" round="10"
			:overlay="true" borderRadius="8">
			<view class="popup_container">
				<u-image class="image" height="100" width="134" src="/static/popup_icon/mint_success.png" :fade="true"
					duration="450" mode="widthFix" :radius="4"></u-image>
				<u-gap height="32"></u-gap>
				<u-text class="title_1" size="18" color="#2B2D41" text="上传成功" align="center"></u-text>
				<u-gap height="4"></u-gap>
				<u-text class="title_2" size="12" color="#8e8e8e" text="目标成为最大的服务型中文Crypto交易者社区" align="center">
				</u-text>
				<u-text class="title_2" size="12" color="#8e8e8e" text="由兔子和粉丝们共同发起成立。" align="center"></u-text>
				<u-gap height="16"></u-gap>
				<u-text class="title_3" size="12" color="#151517" text="作品链接" align="center"></u-text>
				<u-text class="title_4" size="10" color="#8e8e8e" text="https://www.www.com/akjakjsdjlsjd"
					align="center"></u-text>
				<u-gap height="8"></u-gap>
				<view class="copy_container">
					<u-image src="/static/popup_icon/copy.png" width="13" height="13" :fade="true" duration="450"
						mode="aspectFit">
					</u-image>
					<u-text text="复制链接"></u-text>
				</view>
				<u-gap height="32"></u-gap>
				<u-button color="#2E2F3A" text="上传更多" size="large" @click="resetInfo"></u-button>
				<u-gap height="8"></u-gap>
				<u-button type="info" text="进入作品页" size="large" @click="linkToCollection"></u-button>


			</view>
		</u-popup>

	</view>
</template>

<script>
	const UPPay = uni.requireNativePlugin('UP-Pay');
	
	import {
		prodUploadReq,
		prodMCreateReq
	} from '../../api/index.js';

	import {
		BASEURL
	} from '../../utils/constant.js';
	export default {
		data() {
			return {
				fileList: [],
				ImageErr: false,
				mintInfo: {
					name: '',
					price: '',
					desc: '',
					count: '',
					file: ''
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
				},
				show: false,
				sheetShow: false,
				actions: [{
						name: '微信支付',
					},
					{
						name: '支付宝支付',
					},
					{
						name: '选项3',
					},
				],
			};
		},
		onLoad() {
			UPPay.initialize({
				appId:"8a81c1be818ca2270181f6c390a204c5",//开放平台appid
				universalLink:"https://app.gyxxx.com/",//微信通用连接(ios端),
				aliMiniPayScheme:"gyscheme",//支付宝小程序AppScheme(ios端),
				cloudPayScheme:"ysfupppay"//云闪付UrlScheme(ios端)
			});
		},
		onShow() {
			// this.upYunpay();
		},
		methods: {
			// 删除图片
			deletePic(event) {
				this.fileList.splice(event.index, 1);
			},
			async afterRead(event) {

				// 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
				let lists = [].concat(event.file);
				let fileListLen = this.fileList.length;
				lists.map(item => {
					this.fileList.push({
						...item,
						status: 'uploading',
						message: '上传中'
					});
				});
				for (let i = 0; i < lists.length; i++) {
					const result = await this.uploadFilePromise(lists[i].url);
					let item = this.fileList[fileListLen];
					this.fileList.splice(fileListLen, 1, Object.assign(item, {
						status: 'success',
						message: '',
						url: result
					}));
					this.ImageErr = false;
					fileListLen++;
				}
			},
			uploadFilePromise(url) {


				return new Promise((resolve, reject) => {
					let a = prodUploadReq(url).then(res => {
						this.mintInfo = {
							...this.mintInfo,
							file: res,
						};
						resolve(res);
					})
				});
			},
			resetInfo() {
				this.fileList = [];
				this.mintInfo = {
					name: '',
					price: '',
					desc: '',
					count: '',
					file: ''
				};
				this.show = false;
			},
			linkToCollection() {
				uni.switchTab({
					url: '/pages/collection/collection'
				});
			},
			orderPayHandler() {
				const {
					fileList
				} = this;

				if (!(fileList.length > 0 && fileList[0].status === 'success')) {
					this.ImageErr = true;
					return;
				}


				this.$refs.form.validate().then(res => {
					const {
						name,
						price,
						desc,
						count,
						file
					} = this.mintInfo;


					prodMCreateReq({
						name,
						price: parseFloat(price),
						image: file,
						count: parseInt(count),
						description: desc,
						pay_type:2
					}).then((res) => {
						console.log(res)
						this.show = true;
						// this.upYunpay()
						// this.sheetShow = true;
						// console.log(res)
						// const url= res.appPayRequest.qrCode
						// plus.runtime.openURL(url,()=>{
						// 	// 调用失败 callback
						// });  
						
						// const url= res.appPayRequest.qrCode
						// plus.runtime.openWeb(url,()=>{
						// 	// 调用失败 callback
						// }); 
						 
						 // this.upWxPay(res.appPayRequest)
						 
						
						
					})
				}).catch(errors => {})
				// uni.navigateTo({ url: '/pages/pay/pay' });
			},
			upWxPay(appPayRequest) {
				//银联综合支付(微信)
				console.log(appPayRequest)
				
				// "appid": "",
				// "noncestr": "KoILqTtUlXZvlMYMlBVOtomPrOQItWsq",
				// "package": "Sign=WXPay",
				// "partnerid": "526196802",
				// "prepayid": "ori=32FY3d96ce61d2bd41e-1",
				// "sign": "42BD220CDD11CA73E8A4D5D79B6C349D",
				// "timestamp": "20220822194520"
				
				var params = {
					// "package":"Sign=WXPay",
					// "sign":"F45D3849A6421E5ED49CE2C29F83C8CF",
					// "partnerid":"466003135",
					// "prepayid":"ori=130FU20220311101444518",
					// "noncestr":"BgqaiZiuJYwawlXcStbQgVzLIeOQQWQQ",
					// "timestamp":"20220311221444",
					
					// "appid":"wx5789f26e37b6ae3b",
					// "miniuser":"gh_744d2ebca056",//固定不变
					// "minipath":"pages/appPay/index"//固定不变
					
					...appPayRequest
				};
				var payChannel = "01";//支付渠道 01微信 04支付宝小程序
				var payData = JSON.stringify(params);//服务端下单获取
				UPPay.upPay(payChannel, payData, function(res){
					console.log(res);
					var returnCode = res.resultCode;
					var resultInfo = res.resultInfo;
				});
			},
			upAliPay(appPayRequest) {
				//银联综合支付(支付宝)
				var params = {
					
					// "msgType":"trade.appPreOrder",
					// "noncestr":"lSvXoGuhZptpBuHLtCsKjqDIqUDYTDCu",
					// "package":"Sign=ALI",
					// "prepayid":"ori=11VC022041311135464687j",
					// "sign":"B763B59FC79A308F3390CC18D444B0FE",
					// "timestamp":"20220413112539"
					
					
					// "miniuser":"2019010762862511",//固定不变
					// "minipath":"pages/appPay/index/index",//固定不变
					// "appScheme":"iOS:gyscheme;Android:gyscheme",
					...appPayRequest
				};
				var payChannel = "04";//支付渠道 01微信 04支付宝小程序
				var payData = JSON.stringify(params);//服务端下单获取
				UPPay.upPay(payChannel, payData, function(res){
					console.log(res);
					var returnCode = res.resultCode;
					var resultInfo = res.resultInfo;
				});
			},
			upYunpay(){
				var params = {
				    tn:"499192794496866394405"
				};
				var payData = JSON.stringify(params);//服务端下单获取
				UPPay.ysfPay(payData, function(res){
				    console.log(res);
				    var returnCode = res.resultCode;
				    var resultInfo = res.resultInfo;
				});
			}

		}
	};
</script>

<style scoped>
	.mint_container {
		padding: 48rpx 48rpx calc(env(safe-area-inset-bottom) + 24rpx);
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
		width: calc(100vw - 98rpx);
		background-color: #fefefe;
		padding: 48rpx 48rpx calc(env(safe-area-inset-bottom) / 2 + 24rpx);
	}

	.btn_group .u-button:first-child {
		flex: 1;
		margin-right: 16px;
	}

	.btn_group .u-button:last-child {
		flex: 2;
	}

	.popup_container {
		width: 642rpx;
		height: 500px;
		/* display: flex; 
		flex-direction: column;
		align-items: center;
		justify-content: center; */
		text-align: center;
		padding: 47px 0 0;
	}

	.popup_container .image {
		display: flex;
		align-items: center;
	}

	.title_1>>>span {
		font-weight: 600;
		line-height: 26px;
		letter-spacing: 0.005em;
	}

	.title_2>>>span {
		font-weight: 400;
		line-height: 20px;
		letter-spacing: 0.005em;
	}

	.title_3>>>span {
		font-weight: 500;
		line-height: 20px;
		letter-spacing: 0.005em;
	}

	.title_4>>>span {
		font-weight: 400;
		line-height: 18px;
		letter-spacing: 0.005em;
	}

	.copy_container {
		display: flex;
		align-items: center;
		justify-content: center;
		background: #F2F2F5;
		border-radius: 8px;
		padding: 4px 8px;
		margin: 0 auto;
		width: 86px;
	}

	.copy_container>>>.u-image {
		margin-right: 6px;
	}

	.u-button {
		width: 206px;
		margin: 0 auto;
	}

	.u-button:last-child {
		border-color: #2e2f3a;
	}

	.isError {
		border-color: red;
	}
</style>
