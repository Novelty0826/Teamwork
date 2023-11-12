Page({
  data: {
    students: [
      {id: '1001', name: '张三', status: ''},
      {id: '1002', name: '李四', status: ''},
      {id: '1003', name: '王五', status: ''},
  ],
      currentStudentIndex: 0, // 当前显示的学生索引
  },

  // 添加按钮点击事件处理函数
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
          var studentsData = JSON.stringify(this.data.students);
          wx.navigateTo({
              url: `../result/result?students=${studentsData}`,
          });
      }
  },
});