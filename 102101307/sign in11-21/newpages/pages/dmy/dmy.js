// newpages/pages/dmy/dmy.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        number:'110010102',
        sname:'彭于晏',
        sname1:'peng yu yan',

    },
    jump2:function(){
        console.log('dianl')
        wx.navigateTo({
          url: '/newpages/pages/dmy2/dmy2',
        })
    },
    jumpover:function(){
        wx.navigateTo({
          url: '/newpages/pages/jly/jly',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

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