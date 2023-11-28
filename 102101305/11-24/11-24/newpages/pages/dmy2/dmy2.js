var app =getApp();
Page({
  data: {
    absentCount: 0,
    leaveCount: 0,
    students: [],
    absentList: [],
    leaveList: [],
    course_id: '', 
  },
 
  onLoad: function(options) {
    if (options.course_id) {
      this.setData({
        course_id: options.course_id
      });
    }
    var studentsData = JSON.parse(options.students);
    var absentList = [];
    var leaveList = [];
    for (var i = 0; i < studentsData.length; i++) {
      if (studentsData[i].status === "旷课") {
        absentList.push(studentsData[i]);
      } else if (studentsData[i].status === "请假") {
        leaveList.push(studentsData[i]);
      }
    }
    this.setData({
      students: studentsData,
      absentCount: absentList.length,
      leaveCount: leaveList.length,
      absentList: absentList,
      leaveList: leaveList,
    });
  },
  changeStatus: function(e) {
    var _this = this;
    var index = e.target.dataset.index;   
    var listType = e.target.dataset.list; 
    var student = _this.data.students.find(s => s.name === _this.data[listType][index].name); 
    wx.showActionSheet({
      itemList: ['出席','请假','旷课'],
      success: function(res) {
        if(res.cancel) {
          return; 
        }
        var newStatus = ['出席','请假','旷课'][res.tapIndex];
        student.status = newStatus;
        _this.recalculateStatusLists();
      }
    });    
  },
  recalculateStatusLists: function() {
    var absentList = this.data.students.filter(s => s.status === '旷课');
    var leaveList = this.data.students.filter(s => s.status === '请假');
    this.setData({
      absentList: absentList,
      leaveCount: leaveList.length,
      leaveList: leaveList,
      absentCount: absentList.length,
    });
  },
  saveResult:function()
  {
    if(this.data.absentCount==0){
      this.showModal();
    }else 
    {
    var studentsDat = JSON.stringify(this.data.absentList);
     wx.navigateTo({
      url: `../cdmy/cdmy?students=${studentsDat}&course_id=${this.data.courseId}`,
     })
    }
  },
  showModal:function() {
    wx.showModal({
      title: '提示',
      content: '旷课人数为零',
      showCancel: false,
    });
  },
  submitAbsencesToBackend: function() {
    var dateStr = app.globalData.year + '-' + 
                  this.padWithZero(app.globalData.month) + '-' + 
                  this.padWithZero(app.globalData.day);

    var stuList = this.data.absentList.map(function(student) {
      return {"学号": student.id}; 
    });

    var dataToSend = {
      "course_id": this.data.course_id,
      "stu_list": stuList,
      "date": dateStr
    };
    wx.request({
      url: 'http://192.168.145.56:5000/apis/cRoster/' ,
      method: 'POST',
      data: dataToSend,
      header: {
        'content-type': 'application/json' 
      },
      success: function(res) {
        console.log('数据发送成功', res);
      },
      fail: function(error) {
        console.error('数据发送失败', error);
      }
    });
    wx.navigateTo({
      url: '/packA/pages/jssy/jssy',
    })
  },

  padWithZero: function(number) {
    return (number < 10) ? '0' + number : number.toString();
  },

  
});

