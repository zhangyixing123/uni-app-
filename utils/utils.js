export const getDrawJson = (options) => {
	
	return {
			width: '750rpx',
			height: '1114rpx',
			background: '#F6F7FB',
			views: [{
					type: 'view',
					css: {
						left: '40rpx',
						top: '144rpx',
						background: '#fff',
						radius: '16rpx',
						width: '670rpx',
						height: '930rpx',
						shadow: '0 20rpx 48rpx rgba(0,0,0,.05)'
					}
				},
				{
					type: 'image',
					url: options.avatar,
					mode: 'widthFix',
					css: {
						left: '40rpx',
						top: '40rpx',
						width: '84rpx',
						height: '84rpx',
						radius: '50%',
						color: '#999'
					}
				},
				{
					type: 'text',
					text: '艺术家：'+options.nickname,
					css: {
						color: '#333',
						left: '144rpx',
						top: '60rpx',
						fontSize: '32rpx',
						fontWeight: 'bold'
					}
				},
				// {
				// 	type: 'text',
				// 	text: options.name,
				// 	css: {
				// 		color: '#666',
				// 		left: '144rpx',
				// 		top: '90rpx',
				// 		fontSize: '24rpx'
				// 	}
				// },
				{
					type: 'image',
					url: options.cover,
					mode: 'widthFix',
					css: {
						left: '72rpx',
						top: '176rpx',
						width: '606rpx',
						height: '606rpx',
						radius: '12rpx',
						background:'#ffffff'
					}
				},
				{
					type: 'text',
					text: options.name,
					css: {
						color: '#333',
						left: '66rpx',
						top: '864rpx',
						fontSize: '56rpx',
						fontWeight: 'bold'
					}
				},
				{
					type: 'text',
					text: '扫码参与抢购',
					css: {
						maxLines: 2,
						width: '396rpx',
						color: '#333',
						left: '72rpx',
						top: '962rpx',
						fontSize: '36rpx',
						lineHeight: '50rpx'
					}
				},
				{
					type: 'image',
					url: options.mp_qrcode,
					mode: 'widthFix',
					css: {
						left: '500rpx',
						top: '864rpx',
						width: '178rpx',
						height: '178rpx'
					}
				}
			]
		}
	

}
