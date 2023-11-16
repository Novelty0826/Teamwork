// pages/dljm/dljm.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg1:'账号',
        msg2:'密码',
        msg4:'选择用户类型  ',
        items: ['教师端', '督导队端', '辅导员端'],
        index:0

    },
    pickerchange(e){
        this.setData({
            index:e.detail.value
        })
     },
    //输入框的事件处理函数
    inputhandler(e){
        //console.log(e.detail.value)
        this.setData({
            msg:e.detail.value
        })
    },
    inputhandler2(e){
        //console.log(e.detail.value)
        this.setData({
            msg2:e.detail.value
        })
    },
    jump1:function(){
        console.log('dianl')
        wx.navigateTo({
          url: '/pages/jssy/jssy',
        })
    },
    jump2:function(){
        console.log('dianl')
        wx.navigateTo({
          url: '/pages/zcjm/zcjm',
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