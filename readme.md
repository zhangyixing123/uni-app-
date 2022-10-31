1.hbuilderx导入项目

2.在manifest.json文件中重新获取uniapp应用标识（AppId）（一旦项目正式发行，不可重新获取appID）

3.manifest.json中可修改配置启动页面，应用图标，应用名称等（第一次打包前需要配置应用图标）。

4.点击 发行--> pc web或手机H5 打包之后即可部署分享页面到微信公众号 分享页面路由为域名+/#/pages/nftDetail/nftDetail?id=XX

5.点击 发行 --> 原生app云打包 选择android，ios打包类型，填写对应到证书信息等即可打包获取对应文件。