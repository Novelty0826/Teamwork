
Page({

    /**
     * 页面的初始数据
     */
    data: {
        classname:'软件工程A',
        classroom:'东三305',
        classdate:'周六',
        classtime:'一二节',
        pnumber:'',

    },
    jump:function(){
        wx.navigateTo({
          url: '/newpages/pages/dmy/dmy',
        })
    },
    
    
})