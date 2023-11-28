import p from "wl-pinyin";
var app =getApp();
Page({
  data: {
      classname:'软件工程A',
      classroom:'东三305',
      classdate:'周六',
      classtime:'一二节',
      pnumber:0,
      students: [],
      newstudents:[],
      course_id:''
  },
  inputhandler1(e)
  {
    this.setData({
      pnumber:e.detail.value
  })
  },
  onLoad: function(options) {
    console.log(options)
    if (options.course_id) {
      this.setData({
        course_id: options.course_id
      });
      this.fetchStudentsData(); // 调用获取学生名单的函数
    } else {
      wx.showToast({
        title: '未提供课程ID',
        icon: 'none',
        duration: 2000
      });
    }
  },
 
  fetchStudentsData: function() {
    var that = this; 
    
    wx.request({
      url: 'http://192.168.145.56:5000/apis/cRoster/?course_id=' + this.data.course_id,
      method: 'GET',
      header: {
        "content-type": "application/json",
      },
      success(res) {
        if(res.statusCode === 200 && Array.isArray(res.data.stu_informations)) {
          let studentsInData = res.data.stu_informations;    
          // 创建一个新的数组来保存学生的中文名和拼音
          let students = studentsInData.map(function(student) {
            // 生成拼音
            var pinyin = p.getPinyin(student.stu_name);        
            // 返回一个包含id、名字、拼音和状态的对象
            return {id: student.stu_no.toString(), name: student.stu_name, pinyin: pinyin, status: ''};
          });

          that.setData({
            students: students
          });
        } else {
         
          console.error('Unexpected data format or status code from the server:', res);
        }
      },
      fail(err) {
        console.log(err);
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
},
  
  jump:function(){
    var courseId = this.data.course_id;
    console.log('抽取数量',this.data.pnumber)
    for (let i = this.data.students.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.data.students[i], this.data.students[j]] = [this.data.students[j], this.data.students[i]];
    }
    
    this.data.newstudents = this.data.students.slice(0, this.data.pnumber);
    for (let i = 0; i < this.data.pnumber; i++) {
      console.log('学号：',this.data.newstudents[i].id,'姓名：',this.data.newstudents[i].name);
    
  }
  var studentsDat = JSON.stringify(this.data.newstudents);
    wx.navigateTo({
      url: `../cdmy/cdmy?students=${studentsDat}&course_id=${courseId}`,
     })
  }
})