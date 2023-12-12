

// pages/jssy/jssy.js
const app = getApp();
const type = app.globalData.type;
const rid = app.globalData.rid;
const today = new Date();
const dayOfWeek = today.getDay();
const year = today.getFullYear();
const month = today.getMonth() + 1;
const day = today.getDate();
const formattedDate = `${year}年${month}月${day}日`;
const ri = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const riqi = ri[dayOfWeek];
let teachers = [];
let cid = [], classname = [], building = [], classroom = [], classdate = [], classtime = [];


Page({

  /**
   * 页面的初始数据
   */
  data: {
    formattedDate: [],
    zhou: [],
    classname: [],
    building: [],
    classroom: [],
    classdate: [],
    classtime: [],
    cid: [],
    title: '今日课程',
    type: '0',
    leaveList: [],
    absencePushList: [],
    infoModelVisible: false,
    multiStepModelVisible: false,
    formItem:{},
    message_id:undefined,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  qing: function () {
    cid = [],
      classname = [],
      building = [],
      classroom = [],
      classdate = [],
      classtime = []
  },
  onLoad: function (options) {
    console.log(type, 'type')

    const date = new Date();
    const weekdayNames = ['星期日', ' 星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const W = date.getDay();

    const Y = date.getFullYear();
    const M = (date.getMonth() + 1 < 10 ? '0' + (data.getMonth() + 1) : date.getMonth() + 1);
    const D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
    app.globalData.year = Y;
    app.globalData.month = M;
    app.globalData.day = D;
    app.globalData.date = W;


    this.setData({
      title: options.type == '2' ? '消息推送' : '今日课程',
      formattedDate: formattedDate,
      zhou: riqi,
      type: options.type
    })
    let that = this;
    wx.request({
      url: 'http://121.36.207.124/apis/tHome/',
      method: 'GET',
      data: {
        user_id: rid,
        week: riqi
      },
      success: function (res) {
        teachers = res.data.Course_informations;
        that.qing();
        for (var i = 0; i < teachers.length; i++) {

          cid.push(teachers[i].course_id),
            classname.push(teachers[i].course),
            building.push(teachers[i].building),
            classroom.push(teachers[i].classroom),
            classdate.push(teachers[i].week),
            classtime.push(teachers[i].time_period)
        }
        that.setData({
          cid: cid,
          classname: classname,
          building: building,
          classroom: classroom,
          classdate: classdate,
          classtime: classtime
        })
      }
    })
    that.leave()
    this.absencePush()
  },
  leave: function () {
    let that = this
    wx.request({
      url: 'http://121.36.207.124/apis/leave/',
      method: 'GET',
      data: {
        userid: type
      },
      success: function (res) {
        that.setData({
          // leaveList:res.data.Leave_messages
          leaveList: [
            {
              "student_number": "20193",
              "student_name": "一心",
              "leave_date": "11-28",
              "message_id": 1
            },
            {
              "student_number": "20194",
              "student_name": "枭",
              "leave_date": "11-29",
              "message_id": 2
            }
          ]
        })
      },
    }
    )
  },
  absencePush: function () {
    let that = this
    wx.request({
      url: 'http://121.36.207.124/apis/absencePush/',
      method: 'GET',
      data: {
        user_id: type,
        today_date: `${year}-${month}-${day}`
      },
      success: function (res) {
        that.setData({
          // absencePushList:res.data.Leave_messages
          absencePushList: [{
            "student_name": "一心",
            "student_no": "20193",
            "date": "2023-11-28",
            "teacher": "吴老师",
            "course": "软件工程A",
            "place": "东三305",
            "detail_time": "周五三四节"
          },
          {
            "student_name": "枭",
            "student_no": "20194",
            "date": "2023-11-28",
            "teacher": "彭于晏",
            "course": "软件工程A",
            "place": "东三305",
            "detail_time": "周五三四节"
          }
          ]
        })
      }
    })
  },
  handleBtn: function (e) {
    let that = this
    this.setData({
      multiStepModelVisible: true,
      message_id:e.target.dataset.message_id
    })
    // wx.showModal({
    //   title: '处理',
    //   content: '是否属实',
    //   success(res) {
    //     if (res.confirm) {
    //       console.log( e.target.dataset)
    //       that.leave('model', e.target.dataset.message_id, 1)
    //     } else if (res.cancel) {
    //       that.leave('model', e.target.dataset.message_id, 0)

    //     }
    //   }
    // });
  },
  detailOpen: function (e) {
    console.log(e.target.dataset.item)
    this.setData({
      infoModelVisible: true,
      formItem: e.target.dataset.item,
    })
  },
  cloneModel: function () {
    this.setData({
      infoModelVisible: false
    })
  },
  cloneMultiStepModel: function () {
    this.setData({
      multiStepModelVisible: false
    })
  },
  /* gotoPage: function() {
       wx.navigateTo({
           url: '/newpages/pages/kcy/kcy' // 跳转到另一个页面的路径
       });
   },*/

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  resultlist: function (e) {
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '/newpages/pages/kcy/kcy?&classname=' + teachers[index].course + '&building=' + teachers[index].building + '&classroom=' + teachers[index].classroom + '&classdate=' + riqi + '&classtime=' + teachers[index].time_period + '&cid=' + teachers[index].course_id,
    })
  }
})