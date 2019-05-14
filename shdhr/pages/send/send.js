// pages/send/send.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        jemail: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this;
        const jid = options.jid;
        that.setData({
            jid: options.jid
        });
        wx.setNavigationBarTitle({
            title: '施慧达药业招聘'
        })
        wx.request({
            url: 'https://health.shihuidapharma.com/api_website/job/job_info.ashx',
            method: 'GET',
            data: { jid: jid },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                const jemail = res.data.jemail;
                that.setData({
                    jemail: jemail
                })
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})