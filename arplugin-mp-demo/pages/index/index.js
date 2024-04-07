Page({
	data: {},
	goRouter(e) {
		const id = e.currentTarget.id;
		wx.navigateTo({
			url: `/pages/${id}/index`,
		});
	},
});
