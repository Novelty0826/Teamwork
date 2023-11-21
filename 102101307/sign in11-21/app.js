App({
  onLaunch() {
    this.globalData.TeacherName = wx.getStorageSync('name')
  },
  globalData: {
    rid:'',
  }
}
)