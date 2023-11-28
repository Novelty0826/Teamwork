// pages/dljm/dljm.js
const app=getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        msg1:'',
        msg2:'',
        msg4:'选择用户类型  ',
        items: ['教师端', '督导队端', '辅导员端'],
        index:0,

    },
    pickerchange(e){
        this.setData({
            index:e.detail.value
        })
        
     },
    //输入框的事件处理函数
    inputhandler1(e){
        //console.log(e.detail.value)
        this.setData({
            msg1:e.detail.value
        })
        //console.log(this.data.msg1)
    },
    
    inputhandler2(e){
        //console.log(e.detail.value)
        this.setData({
            msg2:e.detail.value
        })
    },
     jump1:function(){
              console.log(this.data.msg1,this.data.msg2,
                this.data.index)
              if(this.data.msg1==''||this.data.msg2=='')
              {
                wx.showToast({
                  title: '请输入完整内容',
                  icon:'none'
                })
              }
              else{
                wx.request({
                            url: 'http://192.168.145.56:5000/apis/login/',
                            data: {username:this.data.msg1,password:this.data.msg2,
                            type:this.data.index},
                            //其中index=0时，表示教师端，index=1时，表示督导队端，index=2时，表示辅导员端
                            method: 'POST',     
                            success: function(res){
                                console.log(res.data)
                                
                                if(res.data.status==='success')
                                {
                                  console.log(res.data.data.id,res.data.data.username,res.data.data.type,res.data.status)
                  app.globalData.rid=res.data.data.id;//返回的id存到全局变量中
                                  wx.navigateTo({
                                     url: '/packA/pages/jssy/jssy',
                                   })
                                }
                                else if(res.data.status==='fail'){
                                  wx.showToast({
                                    title: res.data.msg,
                                    icon:'none'
                                  })
                                }
                            }
                          })
              }
              
              
          },
    // jump2:function(){
    //     console.log('dianl')
    //     wx.navigateTo({
    //       url: '/pages/zcjm/zcjm',
    //     })
    // },

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