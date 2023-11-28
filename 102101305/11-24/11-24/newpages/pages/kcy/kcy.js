// newpages/pages/kcy/kcy.js
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
    jumptodmy:function(){
        console.log('dianl')
        wx.navigateTo({
          url: '/newpages/pages/dmy/dmy?&course_id='+this.data.course_id,
        })
    },
    jumptodmy1:function(){
        console.log('dianl')
        wx.navigateTo({
          url: '/newpages/pages/ccdm/ccdm?&course_id='+this.data.course_id,
        })
    },
    jumptojl:function(){
        console.log('dianl')
        wx.navigateTo({
          url: '/newpages/pages/dmy2/dmy2',
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

      this.setData({classname:options.classname}),
      dict.classname=options.classname,
      this.setData({building:options.building}),
      dict.building=options.building,
      this.setData({classroom:options.classroom}),
      this.setData({classdate:options.classdate}),
      this.setData({classtime:options.classtime}),
      this.setData({course_id:options.cid}),
      dict.classroom=options.classroom,
      dict.classdate=options.classdate,
      dict.classtime=options.classtime,
      dict.course_id=options.cid,
      console.log(dict)
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

    },


    

    
})