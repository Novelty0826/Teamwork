// pages/jssy/jssy.js
const app=getApp()
Page({
    data: {
        classname:[],
        building:[],
        classroom:[],
        classdate:[],
        classtime:[],
        cid:[],//存储课程id
    },
    //页面一开始就要发送请求
    onLoad:function() {
      //先把所有数据清零
      this.setData({
        classname:[],
        building:[],
        classroom:[],
        classdate:[],
        classtime:[],
        cid:[],//存储课程id
      })
      var that = this;

wx.request({
  url: 'http://192.168.145.56:5000/apis/tMine/',
  data: {
    user_id: app.globalData.rid
  },
  method: "GET",
  success: function (res) {
    // 在这里使用保存的页面对象引用
    console.log(res)
    for (var i = 0; i < res.data.Course_informations.length; i++) {
      that.setData({
        cid: that.data.cid.concat(res.data.Course_informations[i].course_id),
        classname: that.data.classname.concat(res.data.Course_informations[i].course),
        building: that.data.building.concat(res.data.Course_informations[i].building),
        classroom: that.data.classroom.concat(res.data.Course_informations[i].classroom),
        classdate: that.data.classdate.concat(res.data.Course_informations[i].week),
        classtime: that.data.classtime.concat(res.data.Course_informations[i].time_period),
      })
    }
  }
})

    },
    //只要跳到这个页面就重新向后端发送请求获取数据
     onshow:function(){ 
       //先把所有数据清零
      this.setData({
        classname:[],
        building:[],
        classroom:[],
        classdate:[],
        classtime:[],
        cid:[],//存储课程id
      })
      var that = this;

wx.request({
  url: 'http://127.0.0.1:5000/apis/tMine/',
  data: {
    user_id: app.globalData.rid
  },
  method: "GET",
  success: function (res) {
    // 在这里使用保存的页面对象引用
    console.log(res)
    for (var i = 0; i < res.data.Course_informations.length; i++) {
      that.setData({
        cid: that.data.cid.concat(res.data.Course_informations[i].course_id),
        classname: that.data.classname.concat(res.data.Course_informations[i].course),
        building: that.data.building.concat(res.data.Course_informations[i].building),
        classroom: that.data.classroom.concat(res.data.Course_informations[i].classroom),
        classdate: that.data.classdate.concat(res.data.Course_informations[i].week),
        classtime: that.data.classtime.concat(res.data.Course_informations[i].time_period),
      })
    }
  }
})
     },
    //点击按钮会跳转到对应的缺勤记录页面
      resultlist: function(e) {
       var index = e.currentTarget.dataset.index;
      console.log("当前点击的项的索引为：" + index);
        //这边要把这个按钮包含的课程id，课程名，课程教室，课程时间传递后端，后端调取数据
        const classname = this.data.classname[index];
        const classroom = this.data.classroom[index];
        const building = this.data.building[index];
        const t1=this.data.classdate[index];
        const t2=this.data.classtime[index];
        const claid = this.data.cid[index];
        wx.navigateTo({
          url: '/newpages/pages/zjl/zjl?classname='+classname+ '&classroom=' + classroom + '&building=' + building +'&classdate=' + t1 + '&classtime=' + t2 + '&claid=' + claid
        });
      }
})