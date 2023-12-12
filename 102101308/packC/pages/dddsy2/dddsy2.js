// pages/jssy/jssy.js
const app=getApp();
//const rid = app.globalData.rid; 
const rid =5;
const today = new Date();
const dayOfWeek = today.getDay();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const formattedDate = `${year}年 ${month}月 ${day}日`;
const ri=['周日','周一','周二','周三','周四','周五','周六'];
const riqi=ri[dayOfWeek];
let teachers=[];
let cid=[],classname=[],building=[],classroom=[],classdate=[],classtime=[];

let xx=null;
let yy=null;
let zz=null;
let jk1=['西三','西二','西一','东一','东二','东三'];
let jk2=['101','102','103','201','202','203','301','302','303'];
let jk3=['一二节','三四节','五六节','七八节'];
let j1=[];
let j2=[];
let j3=[];


function qing(){
  cid=[],
  classname=[],
  building=[],
  classroom=[],
  classdate=[],
  classtime=[]
}


Page({
    data: {
      lou1:[],
      lou2:[],
      lou3:[],
      formattedDate:[],
      zhou:[],
      classname:[],
      building:[],
      classroom:[],
      classdate:[],
      classtime:[],
      cid:[],
    },

    ca1:function(){
      if(j1.length==0){
        j1=jk1;
      }
      else{
        j1=[];
      }
      this.setData({
        lou1:j1
      })
    },
    ca2:function(){
      if(j2.length==0){
        j2=jk2;
      }
      else{
        j2=[];
      }
      this.setData({
        lou2:j2
      })

    },
    ca3:function(){
      if(j3.length==0){
        j3=jk3;
      }
      else{
        j3=[];
      }
      this.setData({
        lou3:j3
      })
    },
    xu1:function(e){
    let index = e.currentTarget.dataset.index;
    if(xx==this.data.lou1[index]){
      xx = null;
    }
    else{
      xx=this.data.lou1[index];;
    }
    this.xuan(xx,yy,zz);
    },
    xu2:function(e){
      let index = e.currentTarget.dataset.index;
      if(yy==this.data.lou2[index]){
        yy= null;
      }
      else{
        yy=this.data.lou2[index];
      }
      this.xuan(xx,yy,zz);
    },
    xu3:function(e){
      let index = e.currentTarget.dataset.index;
      if(zz==this.data.lou3[index]){
        zz= null;
      }
      else{
        zz=this.data.lou3[index];
      }
      console.log(xx,yy,zz);
      this.xuan(xx,yy,zz);
    },
    xuan:function(a,b,c){
      qing();
      if(a==null){
        if(b==null){
          if(c==null){
            for(var i =0;i<teachers.length;i++){
              cid.push(teachers[i].course_id),
              classname.push(teachers[i].course),
              building.push(teachers[i].building),
              classroom.push(teachers[i].classroom),
              classdate.push(teachers[i].week),
              classtime.push(teachers[i].time_period)
            }
          }
          else{
            for(var i =0;i<teachers.length;i++){
              if(teachers[i].time_period==c){
              cid.push(teachers[i].course_id),
              classname.push(teachers[i].course),
              building.push(teachers[i].building),
              classroom.push(teachers[i].classroom),
              classdate.push(teachers[i].week),
              classtime.push(teachers[i].time_period)
              }
            }
          }
        }
        else{
          if(c==null){
            for(var i =0;i<teachers.length;i++){
              if(teachers[i].classroom==b){
              cid.push(teachers[i].course_id),
              classname.push(teachers[i].course),
              building.push(teachers[i].building),
              classroom.push(teachers[i].classroom),
              classdate.push(teachers[i].week),
              classtime.push(teachers[i].time_period)
              }
            }
          }
          else{
            for(var i =0;i<teachers.length;i++){
              if(teachers[i].time_period==c&&teachers[i].classroom==b){
              cid.push(teachers[i].course_id),
              classname.push(teachers[i].course),
              building.push(teachers[i].building),
              classroom.push(teachers[i].classroom),
              classdate.push(teachers[i].week),
              classtime.push(teachers[i].time_period)
              }
            }
          }
        }
      }
      else{
        if(b==null){
          if(c==null){
            for(var i =0;i<teachers.length;i++){
              if(teachers[i].building==a){
              cid.push(teachers[i].course_id),
              classname.push(teachers[i].course),
              building.push(teachers[i].building),
              classroom.push(teachers[i].classroom),
              classdate.push(teachers[i].week),
              classtime.push(teachers[i].time_period)
              }
            }
          }
          else{
            for(var i =0;i<teachers.length;i++){
              if(teachers[i].time_period==c&&teachers[i].building==a){
              cid.push(teachers[i].course_id),
              classname.push(teachers[i].course),
              building.push(teachers[i].building),
              classroom.push(teachers[i].classroom),
              classdate.push(teachers[i].week),
              classtime.push(teachers[i].time_period)
              }
            }
          }
        }
        else{
          if(c==null){
            for(var i =0;i<teachers.length;i++){
              if(teachers[i].classroom==b&&teachers[i].building==a){
              cid.push(teachers[i].course_id),
              classname.push(teachers[i].course),
              building.push(teachers[i].building),
              classroom.push(teachers[i].classroom),
              classdate.push(teachers[i].week),
              classtime.push(teachers[i].time_period)
              }
            }
          }
          else{
            for(var i =0;i<teachers.length;i++){
              if(teachers[i].time_period==c&&teachers[i].classroom==b&&teachers[i].building==a){
              cid.push(teachers[i].course_id),
              classname.push(teachers[i].course),
              building.push(teachers[i].building),
              classroom.push(teachers[i].classroom),
              classdate.push(teachers[i].week),
              classtime.push(teachers[i].time_period)
              }
            }
          }
        }
      }
      
      this.setData({
        cid:cid,
        classname:classname,
        building:building,
        classroom:classroom,
        classdate:classdate,
        classtime:classtime
      })  
    },

    /**
     * 生命周期函数--监听页面加载
     */

    onLoad:function(options) {
      this.setData({
        formattedDate:formattedDate,
        zhou:riqi
      })
      let that=this;
        wx.request({
          url: 'http://127.0.0.1:5000/apis/tHome',
          method:'GET',
          data:{
            user_id:rid,
            week:riqi
          },
          success: function(res){
            teachers = res.data.Course_informations;
            console.log(teachers);
            qing();
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

            //console.log(formattedDate);
            //console.log(riqi);
          }
        })
        

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

    resultlist: function(e){
      var index = e.currentTarget.dataset.index;
      wx.navigateTo({
        url: '/newpages/pages/kcy/kcy?&classname=' + teachers[index].course+ '&building=' +teachers[index].building+'&classroom='+teachers[index].classroom+'&classdate='+riqi+'&classtime='+teachers[index].time_period+'&cid='+teachers[index].course_id,
      })
    }
})