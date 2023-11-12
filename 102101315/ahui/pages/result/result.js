Page({
  data: {
      students: [],
      absentCount: 0,
      leaveCount: 0,
      absentStudents: [],
      leaveStudents: [],
  },

  onLoad: function (options) {
      var students = JSON.parse(options.students);
      var absentCount = 0;
      var leaveCount = 0;
      var absentStudents = [];
      var leaveStudents = [];

      students.forEach((student) => {
          if (student.status === '旷课') {
              absentCount++;
              absentStudents.push(student);
          } else if (student.status === '请假') {
              leaveCount++;
              leaveStudents.push(student);
          }
      });

      this.setData({
          absentCount: absentCount,
          leaveCount: leaveCount,
          absentStudents: absentStudents,
          leaveStudents: leaveStudents,
      });
  },
});