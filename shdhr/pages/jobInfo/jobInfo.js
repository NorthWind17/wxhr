// pages/jobInfo/jobInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        job: [],
        mid: 0,
        jid: 0,
        jtel: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this;
        const mid = options.mid;
        const jid = options.jid;
        that.setData({
            mid: options.mid,
            jid: options.jid
        });
        wx.setNavigationBarTitle({
            title: '岗位详情'  //修改title
        })
        wx.request({
            url: 'https://health.shihuidapharma.com/api_website/job/job_info.ashx',
            method: 'GET',
            data: { jid:jid},
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                res.data.jpublishtime = res.data.jpublishtime.replace(/\//g, '-').substring(0, res.data.jpublishtime.length - 9);
                res.data.jpost = res.data.jpost.replace(/<br\/>/g, "\n");
                res.data.jrequirement = res.data.jrequirement.replace(/<br\/>/g, '\n');
                const jtel = res.data.jtel;
                console.log(res.data)
                that.setData({
                    job: res.data,
                    jtel: jtel
                })
            }
        });
        //获取小程序码
        // wx.request({
        //     method: 'POST',
        //     url: app.apiUrl + '/miniprogram/qrcode',
        //     data: {
        //         appid: app.appid,
        //         page: 'pages/activityInfo/activityInfo',
        //         scene: 'id:' + this.data.activity.id
        //     },
        //     header: {
        //         'content-type': 'application/x-www-form-urlencoded',
        //         'X-TOKEN': app.jwt
        //     },
        //     success(res) {
        //         res = res.data // 这里我是从服务器直接返回保存好的图片url
        //         // 后文介绍保存过程
        //     },
        //     fail() {
        //         wx.hideLoading()
        //     app.$alert('分享失败', 'wrong', _this)
        //             }
        // })
    },
    // onShareAppMessage: function () {
    //     const that = this;
    //     const mid = that.data.mid;
    //     return {

    //         title: '施慧达药业招聘',

    //         desc: '施慧达药业招聘',

    //         path: '/pages/jobInfo/jobInfo?mid={{mid}}'

    //     }

    // },

    call: function(){
        const that = this;
        const jtel = that.data.jtel;
        wx.makePhoneCall({
            phoneNumber: jtel, //电话
            success: function () {
                console.log("拨打电话成功！")
            },
            fail: function () {
                console.log("拨打电话失败！")
            }
        })
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