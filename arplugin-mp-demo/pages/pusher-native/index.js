// index.js
import { APP_ID, LICENSE_KEY, authFunc } from '../../utils/auth';
import { PushUrl } from '../../utils/config';
const url = 'https://webar-static.tencent-cloud.com/assets/back-new/class.png';
Page({
	data: {
		appId: APP_ID,
		licenseKey: LICENSE_KEY,
		authFunc,
		push_url: PushUrl,
		backgroundUrl: url,
	},
	async onArCreated(event) {
		this.sdk = event.detail;
	},
	toggleBackground: async function () {
		this.setData({
			backgroundUrl: this.data.backgroundUrl ? '' : url,
		});
	},
});
