// packA/pages/jssy/infoModel.wxml.js
Component({

    /**
     * 组件的属性列表
     */
    properties: {
      form:Object,
      visible:Boolean,
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
      close(){
        console.log(this.form)
        this.triggerEvent('clone')
      }
    }
})