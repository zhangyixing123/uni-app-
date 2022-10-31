export default {
	state: {
		token: uni.getStorageSync('token') || '',
		time: uni.getStorageSync('tokenTime') || '',
	},
	mutations: {
		changeToken(state, token) {
			uni.setStorageSync('token', token);
			// TODO 过期时间
			// uni.setStorageSync('tokenTime')
			state.token = token;
		}
	},
};
