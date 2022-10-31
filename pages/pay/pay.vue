<template>
	<view class="content">
		<!-- <image class="logo" src="/static/logo.png"></image> -->
		<button type="primary" @click="wxMiniPay()">自建微信小程序支付</button>
		<button type="primary" @click="upWxPay()">微信支付</button>
		<button type="primary" @click="upAliPay()">支付宝支付</button>
		<button type="primary" @click="ysfPay()">云闪付</button>
	</view>
</template>

<script>
	//插件对象
	var UPPay = uni.requireNativePlugin('UP-Pay');
	export default {
		data() {
			return {
				title: 'Hello'
			}
		},
		onLoad() {
			//初始化
			UPPay.initialize({
				appId:"8a81c1be818ca2270181f6c390a204c5",//开放平台appid
				universalLink:"https://app.gyxxx.com/",//微信通用连接(ios端),
				aliMiniPayScheme:"gyscheme",//支付宝小程序AppScheme(ios端),
				cloudPayScheme:"ysfupppay"//云闪付UrlScheme(ios端)
			});
		},
		methods: {
			wxMiniPay() {
				//自建微信小程序支付
				UPPay.wxMiniPay({
					userName:"gh_03250926625d",//填小程序原始id
					path:"pages/app_pay/app_pay",//拉起小程序页面的可带参路径，不填默认拉起小程序首页，对于小游戏，可以只传入 query 部分，来实现传参效果，如：传入 "?foo=bar"。
					miniprogramType:0//MINIPTOGRAM_TYPE_RELEASE = 0; MINIPROGRAM_TYPE_TEST = 1;MINIPROGRAM_TYPE_PREVIEW = 2;
				}, function(res){
					console.log(res);
				});
			},
			upWxPay() {
				//银联综合支付(微信)
				var params = {
					"package":"Sign=WXPay",
					"appid":"wx5789f26e37b6ae3b",
					"sign":"F45D3849A6421E5ED49CE2C29F83C8CF",
					"partnerid":"466003135",
					"prepayid":"ori=130FU20220311101444518",
					"noncestr":"BgqaiZiuJYwawlXcStbQgVzLIeOQQWQQ",
					"timestamp":"20220311221444",
					"miniuser":"gh_744d2ebca056",//固定不变
					"minipath":"pages/appPay/index"//固定不变
				};
				var payChannel = "01";//支付渠道 01微信 04支付宝小程序
				var payData = JSON.stringify(params);//服务端下单获取
				UPPay.upPay(payChannel, payData, function(res){
					console.log(res);
					var returnCode = res.resultCode;
					var resultInfo = res.resultInfo;
				});
			},
			upAliPay() {
				//银联综合支付(支付宝)
				var params = {
					"miniuser":"2019010762862511",//固定不变
					"msgType":"trade.appPreOrder",
					"package":"Sign=ALI",
					"minipath":"pages/appPay/index/index",//固定不变
					"appScheme":"iOS:gyscheme;Android:gyscheme",
					"sign":"B763B59FC79A308F3390CC18D444B0FE",
					"prepayid":"ori=11VC022041311135464687j",
					"noncestr":"lSvXoGuhZptpBuHLtCsKjqDIqUDYTDCu",
					"timestamp":"20220413112539"
				};
				var payChannel = "04";//支付渠道 01微信 04支付宝小程序
				var payData = JSON.stringify(params);//服务端下单获取
				UPPay.upPay(payChannel, payData, function(res){
					console.log(res);
					var returnCode = res.resultCode;
					var resultInfo = res.resultInfo;
				});
			},
			ysfPay() {
				//云闪付
				var params = {
					tn:""
				};
				var payData = JSON.stringify(params);//服务端下单获取
				UPPay.ysfPay(payData, function(res){
					console.log(res);
					var returnCode = res.resultCode;
					var resultInfo = res.resultInfo;
				});
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
