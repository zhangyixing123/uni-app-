import store from '@/store/index.js';

import { BASEURL } from './constant.js';

const upload = ({
	url = '',
	filePath = '',
	formData = {}
}) => {
	
	let header = {
        'content-type': 'multipart/form-data'
	};
	
	console.log(filePath)
	
	if (store.state.user.token)
		header['Authorization'] = store.state.user.token ;

	const HOSTURL = BASEURL + 'api/';
	console.log(HOSTURL + url)
	return new Promise((resolve, reject) => {
		uni.uploadFile({
			url: HOSTURL + url, // 仅为示例，非真实的接口地址
			filePath,
			name: 'file',
			fileType:'image',
			timeout: 60*1000,
			formData,
			header,
			success: res => {
				const data = JSON.parse(res.data);
				const code = data.code;
				if (code === 0) {
					// 将请求结果resolve出去
					resolve(data.data);
				} else {
					// 配置统一的 相应结果 如果 !=10000(失败) 将会统一的提示动作 不需要提示的时候直接注释掉else即可
					reject(res);
					console.error(res)
				}
			},
			fail: err => {
				reject(err);
				console.error(err)
				
			}
		});
	});
};

export default upload;
