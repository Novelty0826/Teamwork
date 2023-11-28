import p from "wl-pinyin"
var token, IMEI, filePath
var grant_type ="client_credentials";
var appKey ="KzKQvGDw9bI4oGfIi9IezbN2";
var appSecret ="XGvGXxfQcGrh2MkuWRZuQXoQkgiwOhed";
var url = "https://openapi.baidu.com/oauth/2.0/token"
var cuid = IMEI;
var ctp=1;
var lan = "zh";    
var spd = 5; 
var tok;
const innerAudioContext = wx.createInnerAudioContext()
          innerAudioContext.autoplay = true
var url1;
var that;
var student1;
function sleep(delay) {
  var start = (new Date()).getTime();
  while ((new Date()).getTime() - start < delay) {
      continue;
  }
}

Page({
  data: {
    students: [],
    currentStudentIndex: 0, // 当前显示的学生索引
    deltaX: 0, // 滑动操作X轴距离
    deltaY: 0, // 滑动操作Y轴距离
    course_id:'',
    studentsPinyin: [], // 用来存储拼音的数组
    flag:0,
  },

  fetchStudentsData: function() {
    that = this; 
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
          student1=students[0].name;
          console.log(student1);
          console.log(typeof student1);
          that.bofang(student1);
        
        } 
        else {
          console.error('Unexpected data format or status code from the server:', res);
        }

      },
      fail(err) 
      {
        console.log(err);
        wx.showToast({
          title: '加载失败',
          icon: 'none',
          duration: 2000
        });
      }
    });
},
  onLoad: function(options) {
    console.log(options)
    if (options.course_id) {
      this.setData({
        course_id: options.course_id
      });
      this.fetchStudentsData(); // 调用获取学生名单的函数
      // sleep(3000);
      // this.bofang(student1);
      
      // console.log(this);
    } else {
      wx.showToast({
        title: '未提供课程ID',
        icon: 'none',
        duration: 2000
      });
    }
  },
  


  // 滑动开始事件
  touchStart: function(e) {
    let that=this;
    var startX = e.touches[0].pageX; // 获取触摸时的原点
    var startY = e.touches[0].pageY; // 获取触摸时的原点
    // 起始坐标点
    this.setData({
      startX: startX,
      startY: startY
    })
  },

  // 滑动移动事件
  touchMove: function(e) {
    var startX = this.data.startX;  // 开始X坐标
    var startY = this.data.startY;  // 开始Y坐标
    var touchMoveX = e.touches[0].pageX;  // 滑动变化坐标
    var touchMoveY = e.touches[0].pageY;  // 滑动变化坐标
    // 滑动后的坐标点
    this.setData({
      deltaX: startX - touchMoveX,
      deltaY: startY - touchMoveY
    })
  },
  touchEnd: function(e) {
    var deltaX = this.data.deltaX;
    var deltaY = this.data.deltaY;
    var currentStudentIndex = this.data.currentStudentIndex;
    var students = this.data.students;
    var courseId = this.data.course_id; 
    var nextIndex = currentStudentIndex; // 下一个学生索引，默认与当前相等
    
    // 根据滑动方向更新状态并计算下一个学生的索引
    if (Math.abs(deltaX) > Math.abs(deltaY)) { // 水平滑动
      if (deltaX > 100) { // 右滑
        students[currentStudentIndex].status = "旷课";
        nextIndex = (currentStudentIndex < students.length - 1) ? currentStudentIndex + 1 : currentStudentIndex;
      } else if (deltaX < -100) { // 左滑
        students[currentStudentIndex].status = "出席";
        nextIndex = (currentStudentIndex < students.length - 1) ? currentStudentIndex + 1 : currentStudentIndex;
      }
    } else { // 垂直滑动
      if (deltaY > 100) { // 下滑
        students[currentStudentIndex].status = "请假";
        nextIndex = (currentStudentIndex < students.length - 1) ? currentStudentIndex + 1 : currentStudentIndex;
      } else if (deltaY < -100 && currentStudentIndex > 0) { // 上滑
        // 上滑到上一个学生，不更新状态
        nextIndex = currentStudentIndex - 1;
      }
    }
  if(currentStudentIndex < students.length - 1){
    sleep(500);
    // 使用 setData 更新数据并在回调中播放名字
    this.setData({
      
      [`students[${currentStudentIndex}]`]: students[currentStudentIndex],
      currentStudentIndex: nextIndex
    }, () => {
      // 此处确保数据已更新后再播放名字
      console.log(students[nextIndex].name)
      this.bofang(students[nextIndex].name);
    });
  }else{
    var studentsData = JSON.stringify(this.data.students);
          wx.navigateTo({
            url: `../dmy2/dmy2?students=${studentsData}&course_id=${courseId}`,
          });
  }
  },
  
  bofang:function(a){
    var text = a;
    var tex = encodeURI(text);
    wx.request({
      url: url,
      data: {
        grant_type: grant_type,
        client_id: appKey,
        client_secret: appSecret
      },
      method: "GET",
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        token = res.data.access_token
        tok = token;
        url1 = "https://tsn.baidu.com/text2audio?tex=" + tex  + "&lan=" + lan + "&cuid=" + cuid + "&ctp=" + ctp + "&tok=" + tok + "&spd=" +spd
        wx.downloadFile({
          url: url1,
          success: function (res) {
            console.log(res)
            filePath=res.tempFilePath;
            if (res.statusCode === 200) {
              wx.playVoice({
                filePath: res.tempFilePath
              })
            }
            innerAudioContext.src = filePath
            innerAudioContext.onPlay(() => {
            console.log('开始播放')
            })
          }
        })
      }
    })
    },
});

