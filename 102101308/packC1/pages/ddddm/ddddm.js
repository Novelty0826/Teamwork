// packC/pages/ddddm/ddddm.js

const dict = {
    classname: '',
    building: '',
    classroom: '',
    classdate: '',
    classtime: '',
    course_id: ''
  };
  
  Page({
  
      /**
       * 页面的初始数据
       */
      data: {
          classname:'',
          building:'',
          classroom:'',
          classdate:'',
          classtime:'',
          course_id:''
      },
      gotodddsy:function(){
        wx.redirectTo({
          url: '/packC/pages/dddsy2/dddsy2',
        })
      },
      jumptodmy:function(){
          console.log('dianl')
          wx.redirectTo({
            url: '/packC1/pages/qbdm/qbdm'+this.data.course_id,
          })
      },
      jumptodmy1:function(){
          console.log('dianl')
          wx.redirectTo({
            url: '/packC1/pages/dddccdm/dddccdm'+this.data.course_id,
          })
      },
      jumptojl:function(){
          console.log('dianl')
          wx.navigateTo({
            url: '/packC1/pages/dddjl/dddjl',
          })
      },
      
      /**
       * 生命周期函数--监听页面加载
       */
    //   onLoad(options) {
  
    //     this.setData({classname:options.classname}),
    //     dict.classname=options.classname,
    //     this.setData({building:options.building}),
    //     dict.building=options.building,
    //     this.setData({classroom:options.classroom}),
    //     this.setData({classdate:options.classdate}),
    //     this.setData({classtime:options.classtime}),
    //     this.setData({course_id:options.cid}),
    //     dict.classroom=options.classroom,
    //     dict.classdate=options.classdate,
    //     dict.classtime=options.classtime,
    //     dict.course_id=options.cid,
    //     console.log(dict),
    //     app.globalData.place = this.data.building + this.data.classroom
    //     app.globalData.time = this.data.classdate + this.data.classtime
    //   },
  
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
  
      },
  
  
      
  
      
  })