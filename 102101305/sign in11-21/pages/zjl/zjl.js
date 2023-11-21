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
        jsonData:[],//获取后端返回来的所有信息
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
        url: 'http://127.0.0.1:5000/apis/cAbsencesForT/',
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
        jsonData:[],//获取后端返回来的所有信息
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
        url: 'http://127.0.0.1:5000/apis/cAbsencesForT/',
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
    showdetails:function()
    {
      
    }
})