// pages/jssy/jssy.js
const app=getApp();
const rid = app.globalData.rid; 
const today = new Date();
const dayOfWeek = today.getDay();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const formattedDate = `${year}年${month}月${day}日`;
const ri=['周日','周一','周二','周三','周四','周五','周六'];
const riqi=ri[dayOfWeek];
let teachers=[];
let cid=[],classname=[],building=[],classroom=[],classdate=[],classtime=[];


Page({

    /**
     * 页面的初始数据
     */
    data: {
      formattedDate:[],
      zhou:[],
      classname:[],
      building:[],
      classroom:[],
      classdate:[],
      classtime:[],
      cid:[],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    qing:function(){
      cid=[],
      classname=[],
      building=[],
      classroom=[],
      classdate=[],
      classtime=[]
    },
    onLoad:function(options) {
      const date= new Date();
        const weekdayNames=['星期日',' 星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        const W=date.getDay();

       const Y=date.getFullYear();
        const M=(date.getMonth()+1<10?'0'+(data.getMonth()+1):date.getMonth()+1);
        const D=date.getDate()<10?'0'+date.getDate():date.getDate();
        app.globalData.year=Y;
        app.globalData.month=M;
        app.globalData.day=D;
        app.globalData.date=W;
console.log(app.globalData.day);

      this.setData({
        formattedDate:formattedDate,
        zhou:riqi
      })
      let that=this;
        wx.request({
          url: 'http://192.168.145.56:5000/apis/tHome/',
          method:'GET',
          data:{
            user_id:rid,
            week:riqi
          },
          success: function(res){
            teachers = res.data.Course_informations;
            console.log(teachers);
            that.qing();
            for(var i =0;i<teachers.length;i++){
              
                cid.push(teachers[i].course_id),
                classname.push(teachers[i].course),
                building.push(teachers[i].building),
                classroom.push(teachers[i].classroom),
                classdate.push(teachers[i].week),
                classtime.push(teachers[i].time_period)
            }
            that.setData({
              cid:cid,
              classname:classname,
              building:building,
              classroom:classroom,
              classdate:classdate,
              classtime:classtime
            })  
            
            console.log(formattedDate);
            console.log(riqi);
          }
        })
        

    },
   /* gotoPage: function() {
        wx.navigateTo({
            url: '/newpages/pages/kcy/kcy' // 跳转到另一个页面的路径
        });
    },*/

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

    resultlist: function(e){
      var index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: '/newpages/pages/kcy/kcy?&classname=' + teachers[index].course+ '&building=' +teachers[index].building+'&classroom='+teachers[index].classroom+'&classdate='+riqi+'&classtime='+teachers[index].time_period+'&cid='+teachers[index].course_id,
      })
    }
})