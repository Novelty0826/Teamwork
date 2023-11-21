// pages/jssy/jssy.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        date1:'',
        weekdayNames :['星期日',' 星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        date2:'',
        classname:'软件工程A',
        classroom:'东三305',
        classdate:'周六',
        classtime:'一二节',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    
    onLoad:function(options) {
        const date= new Date();
        const weekdayNames=['星期日',' 星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const W=date.getDay();

       const Y=date.getFullYear();
        const M=(date.getMonth()+1<10?'0'+(data.getMonth()+1):date.getMonth()+1);
        const D=date.getDate()<10?'0'+date.getDate():date.getDate();
        this.setData({
            date1:Y+'年'+M+'月'+D+'日',
            date2: weekdayNames[W]
        })
        

    },
    gotoPage: function() {
        wx.navigateTo({
            url: '/newpages/pages/kcy/kcy' // 跳转到另一个页面的路径
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})