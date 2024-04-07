async function download(url) {
	if (url instanceof ArrayBuffer) return url;
	return new Promise((resolve, reject) => {
		wx.request({
			url: url,
			responseType: 'arrayBuffer',
			success: (res) => {
				const { data } = res;
				resolve(data);
			},
			fail: (res) => {
				reject(res);
			},
		});
	});
}

module.exports = { download };
