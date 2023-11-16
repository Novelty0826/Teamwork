Page({
  data: {
    students: [], // 初始化为空数组
    currentStudentIndex: 0,
  },

  onLoad: function () {
    var that = this;

    wx.request({
      url: '', // 后端数据的URL
      method: 'GET',
      header: {
        'content-type': 'application/json' 
      },
      success(res) {
        console.log(res.data);
        if(res.statusCode === 200) { // HTTP 请求成功
          let studentsInData = res.data.data; 
          let students = studentsInData.map(student => {
            return {id: student.id.toString(), name: student.name, status: ''};
          });
          that.setData({
            students: students
          });
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

  markAsPresent: function () {
    this.updateStudentStatus('出席');
  },

  markAsAbsent: function () {
    this.updateStudentStatus('旷课');
  },

  markAsLeave: function () {
    this.updateStudentStatus('请假');
  },

  updateStudentStatus: function (status) {
    var currentStudentIndex = this.data.currentStudentIndex;
    var currentStudent = this.data.students[currentStudentIndex];
    currentStudent.status = status;
    this.setData({
      [`students[${currentStudentIndex}]`]: currentStudent,
    });

    if (currentStudentIndex < this.data.students.length - 1) {
      setTimeout(() => {
        this.setData({
          currentStudentIndex: currentStudentIndex + 1,
        });
      }, 1000);
    } else {
      this.saveStudentsDataAndNavigate();
    }
  },

  saveStudentsDataAndNavigate: function () {
    try {
      wx.setStorageSync('studentsInfo', this.data.students);
    } catch (e) {
      console.log(e);
    }
    
    wx.navigateTo({
      url: '/pages/result/result',
    });
  },
});