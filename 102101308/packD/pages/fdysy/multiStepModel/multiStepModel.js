// packA/pages/jssy/multiStepModel/multiStepModel.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    id: Object,
    visible: Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    close() {
      this.triggerEvent('clone')
    },

    leave: function (e) {
      let that = this
      console.log(this.id)
      wx.request({
        url: 'http://121.36.207.124/apis/leave/',
        method: 'POST',
        data: {
          message_id: that.id,
          flag: e.target.dataset.flag,
        },
        success: function (res) {

          if (res.data.status == 'success') {
            wx.showToast({
              title: '成功',
              icon: 'success',
              duration: 2000//持续的时间
            })
          } else {
            wx.showToast({
              title: '失败',
              icon: 'error',
              duration: 2000//持续的时间
            })
          }

        },
      }
      )
    },
  }
})