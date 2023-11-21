// pages/zcjm/zcjm.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg1:'请输入手机号',
        msg2:'输入密码',
        msg3:'确认密码',
        msg4:'选择用户类型  ',
        items: ['教师端', '督导队端', '辅导员端'],
        index:0
    },
     
    pickerchange(e){
       this.setData({
           index:e.detail.value
       })
    },
    jump3:function(){
        console.log('dianl')
        wx.navigateTo({
          url: '/pages/dljm/dljm',
        })
    },
      
    
    showActionSheet: function() {
        wx.showActionSheet({
          itemList: this.data.items,
          success: function(res) {
            console.log('用户选择了：' + res.tapIndex);
          }
        });
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