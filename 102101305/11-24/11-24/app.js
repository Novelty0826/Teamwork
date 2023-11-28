App({
  onLaunch() {
    this.globalData.TeacherName = wx.getStorageSync('name')
  },
  globalData: {
    rid:'',
    year:'',
    month:'',
    day:'',
    date:''
  }
}
)