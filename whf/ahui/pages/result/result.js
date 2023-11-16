// 结果页面（例如：result.js）
Page({
  data: {
    absentStudents: [],
    leaveStudents: [],
  },

  onLoad: function() {
    try {
      var studentsInfo = wx.getStorageSync('studentsInfo');
      if (studentsInfo) {
        this.setData({
          absentStudents: studentsInfo.filter(student => student.status === '旷课'),
          leaveStudents: studentsInfo.filter(student => student.status === '请假'),
        });
      }
    } catch (e) {
      console.error(e);
    }
  },
});