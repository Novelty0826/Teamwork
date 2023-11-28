// pages/zjl/zjl.js
const app=getApp()
Page({
    data: {
      jsonData:[],//获取后端返回来的所有信息
      
      classname:'',
      building:'',
      classroom:'',
      classdate:'',
      classtime:'',
      cid:'',
      xuehao:[],
      stu_name:[],
      ab_num:[],
      detail:[],
    },
    onLoad: function (options) {
      this.setData({
        classname: options.classname,
        building:options.building,
        classroom: options.classroom,
        classdate: options.classdate,
        classtime:options.classtime,
        cid:options.claid,
        xuehao:[],
      stu_name:[],
      ab_num:[],
      detail:[],
      })
      wx.request({
        url: 'http://192.168.145.56:5000/apis/cAbsencesForT/',
        data: {
          course_id: this.data.cid
        },
        method: "GET",
        success: (res) => {
          // 在箭头函数内，this 与外部上下文一致
          this.setData({
            jsonData: res.data.Student_absences
          })
      
          // 暂时没用
          var xuehaoArr = [];
          var stuNameArr = [];
          var abNumArr = [];
      
          for (var i = 0; i < res.data.Student_absences.length; i++) {
            xuehaoArr.push(res.data.Student_absences[i].student_number);
            stuNameArr.push(res.data.Student_absences[i].student_name);
            abNumArr.push(res.data.Student_absences[i].absence_count);
            //detail:classroom.push(res.data.Student_absences[i].details),
          }
      
          this.setData({
            xuehao: xuehaoArr,
            stu_name: stuNameArr,
            ab_num: abNumArr,
          });
        }
      })
    },
    onshow:function(){
      this.setData({
        classname: options.classname,
        building:options.building,
        classroom: options.classroom,
        classdate: options.classdate,
        classtime:options.classtime,
        cid:options.claid,
        xuehao:[],
      stu_name:[],
      ab_num:[],
      detail:[],
      })
      wx.request({
        url: 'http://192.168.145.56:5000/apis/cAbsencesForT/',
        data: {
          course_id: this.data.cid
        },
        method: "GET",
        success: (res) => {
          // 在箭头函数内，this 与外部上下文一致
          this.setData({
            jsonData: res.data.Student_absences
          })
      
          // 暂时没用
          var xuehaoArr = [];
          var stuNameArr = [];
          var abNumArr = [];
      
          for (var i = 0; i < res.data.Student_absences.length; i++) {
            xuehaoArr.push(res.data.Student_absences[i].student_number);
            stuNameArr.push(res.data.Student_absences[i].student_name);
            abNumArr.push(res.data.Student_absences[i].absence_count);
            //detail:classroom.push(res.data.Student_absences[i].details),
          }
      
          this.setData({
            xuehao: xuehaoArr,
            stu_name: stuNameArr,
            ab_num: abNumArr,
          });
        }
      })
    },
    //按下详情的查看键功能
    showdetails:function(e)
    {
      var index = e.currentTarget.dataset.index;
    var item = this.data.jsonData[index];
    console.log(index);
    const det = item.details;
    var de = det.join('\n');
    if (item && item.details) {
      console.log(item.details);
      wx.showModal({
        title: '缺勤日期',
        content: de,
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定');
          }
        }
      });
    }
    }
})