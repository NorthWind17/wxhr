// pages/job/job.js
var util = require("../../utils/util.js");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        addressList: [{said: -1,saname: "地点"}],
        jobTypeList : [{sdoid: -1,sdoname: "职位类别"}],
        jobList: [],
        addressIndex : 0,
        jobTypeIndex : 0,
        searchContent: '',
        page: 1,
        mid: 0,
        aval: -1,
        jval: -1,
        pagesize: 10
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        const that = this;
        const page = that.data.page;
        const mid = options.mid;
        const aval = that.data.aval;
        const jval = that.data.jval;
        const searchContent = that.data.searchContent;
        
        that.setData({
            mid: options.mid,
        })
        if (mid == 37){
            wx.setNavigationBarTitle({
                title: '社会招聘'  //修改title
            })
        } else if (mid == 38){
            wx.setNavigationBarTitle({
                title: '校园招聘'
            })
        }
        //地区
        wx.request({
            url: 'https://health.shihuidapharma.com/api/common/sys_area_list.ashx',
            method: 'GET',
            data: { psaid: 0 },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    addressList: that.data.addressList.concat(res.data)
                })
            }
        });
        //职位类型
        wx.request({
            url: 'https://health.shihuidapharma.com/api/common/sys_dictionary_option_list.ashx',
            method: 'GET',
            data: { sdid: 2},
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                that.setData({
                    jobTypeList: that.data.jobTypeList.concat(res.data)
                });
            }
        });
        //初始列表
        that.getJobList(page,searchContent,aval,jval);
    },
    getAddressList: function(){
        const that = this;
        wx.request({
            url: 'https://health.shihuidapharma.com/api/common/sys_area_list.ashx',
            method: 'GET',
            data: { psaid: 0 },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                const addressList = res.data;
                that.setData({
                    addressList: res.data
                })
            }
        });
    },
    bindChangeAddress: function (e) {
        const that = this;
        const page = 1;
        const jval = that.data.jval;
        const searchContent = that.data.searchContent;
        const aval = that.data.addressList[e.detail.value].said;//当前选择的地址ID
        that.setData({
            addressIndex: e.detail.value,
            aval: that.data.addressList[e.detail.value].said,
            page: page
        });
        that.getJobList(page, searchContent, aval, jval);
    },
    bindChangeJob: function (e) {
        const that = this;
        const page = 1;
        const jobTypeIndex = e.detail.value;
        const searchContent = that.data.searchContent;
        const aval = that.data.aval;
        const jval = that.data.jobTypeList[e.detail.value].sdoid;//当前选择的职位ID
        that.setData({
            jobTypeIndex: e.detail.value,
            jval: that.data.jobTypeList[e.detail.value].sdoid,
            page: page
        });
        that.getJobList(page, searchContent, aval, jval);
    },
    //侦测输入内容
    getVal: function (e) {
        const searchContent = e.detail.value;
        this.setData({
            searchContent: searchContent
        });
    },
    getJobList: function (page, val, aval, jval){
        const that = this;
        const mid = that.data.mid;
        const pagesize = that.data.pagesize;
        wx.request({
            url: 'https://health.shihuidapharma.com/api_website/job/job_list.ashx',
            method: 'GET',
            data: { page: page, pagesize: pagesize, mid: mid, name: encodeURIComponent(val), said: aval, jtype: jval },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].jpublishtime = res.data[i].jpublishtime.replace(/\//g, '-').substring(0, res.data[i].jpublishtime.length - 9);
                }
                that.setData({
                    jobList: res.data
                    // jobList: that.data.jobList.concat(res.data)
                })
            }
        });
    },
    getManyJobList: function (page, val, aval, jval) {
        const that = this;
        const mid = that.data.mid;
        const pagesize = that.data.pagesize;
        wx.request({
            url: 'https://health.shihuidapharma.com/api_website/job/job_list.ashx',
            method: 'GET',
            data: { page: page, pagesize: pagesize, mid: mid, name: encodeURIComponent(val), said: aval, jtype: jval },
            header: {
                'content-type': 'application/json'
            },
            success: function (res) {
                for (var i = 0; i < res.data.length; i++) {
                    res.data[i].jpublishtime = res.data[i].jpublishtime.replace(/\//g, '-').substring(0, res.data[i].jpublishtime.length - 9);
                }
                that.setData({
                    jobList: that.data.jobList.concat(res.data)
                })
            }
        });
    },
    searchBtn: function () {
        const that = this;
        const page = 1;
        const searchContent = that.data.searchContent;
        const aval = that.data.aval;
        const jval = that.data.jval;
        that.setData({
            page: page
        })
        this.getJobList(page, searchContent,aval,jval);
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
        const that = this;
        const page = that.data.page + 1;
        const searchContent = that.data.searchContent;
        const aval = that.data.aval;
        const jval = that.data.jval;
        that.setData({
            page: page,
        });
        that.getManyJobList(page, searchContent, aval, jval);
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})