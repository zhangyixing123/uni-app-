<script>
	import {
		mapState,
		mapMutations
	} from 'vuex';
	export default {
		computed: {
			...mapState({
				value: state => state.tabbar.active,
				tablist: state => state.tabbar.list
			}),
		},
		onLaunch: function() {
			// console.log('App Launch');
			// uni.hideTabBar();
			const token = uni.getStorageSync('token') || "";
			if (!token) {
				uni.navigateTo({
					url: '/pages/welcome/welcome',
					fail: res => {
						console.log(res);
					}
				});
				this.changeActiveIndex(0);
			} else {
				// const pages = getCurrentPages();
				// const page = pages[pages.length - 1];
				// console.log(page.route)
				const {
					value,
					tablist
				} = this;
				const {
					url
				} = tablist[value];
				uni.switchTab({
					url
				});
			}
		},
		onShow: function() {

		},
		onHide: function() {
			// console.log('App Hide');
		},
		methods: {
			...mapMutations(['changeActiveIndex']),
		}
	};
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "@/uni_modules/uview-ui/index.scss";
</style>

<style>
	/*每个页面公共css */
	page {
		font-family: 'Inter';
		font-style: normal;
		background-color: #fefefe;
	}

	/* navbar */
	

	.nav_bar>>>.u-navbar__content__left {
		background: #FEFEFE;
		border: 1px solid #F5F5F5;
		border-radius: 50%;
		padding: 0 !important;
		width: 46px;
		height: 46px;
		left: 48rpx !important;
		top: 0px !important;
		z-index: 971;
		
	}
	

	.nav_bar>>>.u-navbar__content__left .u-icon {
		margin: auto;
	}
	
	.nav_bar>>> .u-navbar__content__right {
		z-index: 971;
	}

	.custom-primary_btn {
		background: #2E2F3A;
		border-radius: 4px;
	}

	>>>.u-button {
		border-radius: 8px !important;
	}

	.custom_container {
		padding: 48rpx 48rpx calc(env(safe-area-inset-bottom) / 2 + 24rpx);
	}
	
	.u-divider {
		width: 100%;
	}
</style>
