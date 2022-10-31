export default {
	state: {
		list: [{
				text: '首页',
				icon: 'home',
				inactiveIcon: '/static/tab_icon/home.png',
				activeIcon: '/static/tab_icon/home_fill.png',
				url: '/pages/index/index',
			},
			{
				text: '藏品馆',
				icon: 'account',
				inactiveIcon: '/static/tab_icon/account.png',
				activeIcon: '/static/tab_icon/account_fill.png',
				url: '/pages/collection/collection',
			}
		],
		active: uni.getStorageSync('tabbarActive') || 0
	},
	mutations: {
		changeList(state, list) {
			state.list = list;
		},
		changeActiveIndex(state, index) {
			uni.setStorageSync('tabbarActive', index);
			state.active = index;
		}
	},
};
