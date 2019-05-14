//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        menuList: [],
        imgUrls: [],
        indicatorDots: true,
        autoplay: true,
        circular: true,
        interval: 2000,
        duration: 1000
    },
    onLoad: function () {
        //     console.log('form发生了reset事件')
        //页面显示时执行这里面的方法 生命周期以后会讲
        const wid = app.globalData.wid;
        var that = this;
        wx.setNavigationBarTitle({
            title: '施慧达药业招聘'  //修改title
        })
        wx.request({
        url: 'https://health.shihuidapharma.com/api_website/website/homepage_module_list.ashx',
        method: 'GET',
        data: {wid: wid},
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function (res) {
            for (var i = 0; i < res.data.length; i++) {
            res.data[i].murl = res.data[i].murl.replace('.html', '');
            }
            that.setData({
            menuList: res.data
            })
        }
        })
        wx.request({
        url: 'https://health.shihuidapharma.com/api_website/website/homepage_banner_list.ashx',
        method: 'GET',
        data: { wid: wid},
        header: {
            'content-type': 'application/json' // 默认值
        },
        success: function (res) {
            for (var i = 0; i < res.data.length; i++) {
            res.data[i].hburl = res.data[i].hburl.replace('.html', '');
            }

            that.setData({
            imgUrls: res.data
            })
        }
        })
    },
    onShareAppMessage: function () {

    }
})

