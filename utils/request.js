import store from '@/store/index.js';

import {
	BASEURL
} from './constant.js';

const request = ({
	url = '',
	data = {},
	method = 'POST',
	isLoading = false,
	isTips = false
}) => {

	let header = {};

	if (store.state.user.token)
		header = {
			'Authorization': store.state.user.token
		};

	const HOSTURL = BASEURL + 'api/';

	return new Promise((resolve, reject) => {
		if (isLoading) {
			uni.showLoading({
				title: '正在加载中...',
				mask: true
			});
		}
		uni.request({
			// 传入的url地址 
			url: HOSTURL + url,
			// 请求方法可填可不填(GET)
			method: method,
			// 请求数据可填可不填 默认空对象
			data: data,
			header: header,
			// 响应成功回调函数
			success: res => {
				const code = res.data.code;
				if (code === 0) {
					// 将请求结果resolve出去
					resolve(res.data.data);
				} else if (code === 4001) {

					reject(res);
					uni.reLaunch({
						url: '/pages/login/login'
					})
					// if (isTips)
					uni.$u.toast(res.data.message);
					
				} else {
					reject(res);
					// if (isTips)
						uni.$u.toast(res.data.message);
				}
			},
			// 如果error也会统一的提示 不需要提示的直接注释fail方法即可
			fail: res => {
				reject(res);
				// if (isTips)
				uni.$u.toast(res.data.message);


			},
			complete: res => {
				if (isLoading) uni.hideLoading();
			}
		});
	});
};
export default request;
