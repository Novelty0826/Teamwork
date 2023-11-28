// pages/zcjm/zcjm.js
const app=getApp()
const XLSX = require('../utils/xlsx.mini.min.js'); // 替换为 xlsx 库的实际引入路径
Page({
    data: {
      tempFilePath:'',//暂存文件路径
      c: 0, // 利用c来控制创建完成按钮，只有文件成功导入才能实现创建完成按钮功能
      multiArray: [['西一', '西二', '西三', '中楼','东一', '东二', '东三'], ['101', '102', '103','104', '105', '106','107','201', '202', '203','204', '205', '206','207','301', '302', '303','304', '305', '306','307','401', '402', '403','404', '405', '406','407','501', '502', '503','504', '505', '506','507']],
      multiIndex: [0, 0],
      multiArray1: [['星期一', '星期二', '星期三', '星期四','星期五', '星期六', '星期日'], ['一二节', '三四节', '五六节','七八节', '上午', '下午','全天']],
      multiIndex1: [0, 0],
      w1:'西一',
      w2:'101',
      t1:'周一',
      t2:'一二节'
    },
    onLoad: function () {
      this.setData({
        multiArray: [['西一', '西二', '西三', '中楼','东一', '东二', '东三'], ['101', '102', '103','104', '105', '106','107','201', '202', '203','204', '205', '206','207','301', '302', '303','304', '305', '306','307','401', '402', '403','404', '405', '406','407','501', '502', '503','504', '505', '506','507']]
      });
      this.setData({
        multiArray1: [['周一', '周二', '周三', '周四','周五', '周六', '周日'], ['一二节', '三四节', '五六节','七八节', '上午', '下午','全天']]
      });
    },
    //选择excel表格按钮功能
    importexcel:function(){
      let that= this;
      // 选择文件并解析，传送给后端
      wx.chooseMessageFile({
        success(res) {
          that.setData({
            c:1,
            tempFilePath:res.tempFiles[0].path,
          });
        },
        fail(err) {
          console.error('选择文件失败', err);
        }
      })
    },

    bindMultiPickerChange: function (e) {
                this.setData({
                  multiIndex: e.detail.value
                });
                console.log(this.data.multiArray[0][e.detail.value[0]],this.data.multiArray[1][e.detail.value[1]]);
                this.setData({
            w1:this.data.multiArray[0][e.detail.value[0]],
            w2:this.data.multiArray[1][e.detail.value[1]]
        });
              },
        
      bindMultiPickerChange1: function (e) {
        this.setData({
          multiIndex1: e.detail.value
        });
        console.log(this.data.multiArray1[0][e.detail.value[0]],this.data.multiArray1[1][e.detail.value[1]]);
        this.setData({
          t1:this.data.multiArray1[0][e.detail.value[0]],
          t2:this.data.multiArray1[1][e.detail.value[1]]
        });
      },
    
//确认键按钮功能 
 creatnow:function(){
  let that= this;
  const fileManager = wx.getFileSystemManager();
  // 读取文件内容（以二进制形式）
  fileManager.readFile({
    filePath: this.data.tempFilePath,
    success(data) {
      const fileData = data.data; // 以二进制形式获取文件数据

      // 解析Excel文件
      const workbook = XLSX.read(fileData, {type: 'array'});

      // 将解析后的数据转换为JSON格式
      const result = {};
      workbook.SheetNames.forEach(function(sheetName) {
        const roa = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        if(roa.length > 0){
          result[sheetName] = roa;
        }
      });
      const jsonData = JSON.stringify(result);
      function parseData(data) {
        var result = {};
        result["课程名称"] = (data[0]["《软件工程A》202301学期学生花名册"] || "").split("：")[1];
        result["任课教师"] = (data[0]["__EMPTY_6"] || "").split("：")[1];
            // 解析学生信息
        result["学生名单"] = [];
        for (var i = 2; i < data.length; i++) {
        var student = {
        "学号": data[i]["《软件工程A》202301学期学生花名册"] || "",
        "姓名": data[i]["__EMPTY"] || "",
        //"学分": data[i]["__EMPTY_1"] || ""
      };
         result["学生名单"].push(student);
      }
    return result;
  }
  
    // 调用解析函数并输出结果
        var resultdata = JSON.parse(jsonData);
        var Sheet1Data = resultdata.Sheet1;
        var parsedData = parseData(Sheet1Data);
        var Result = JSON.stringify(parsedData,null,2);
        //console.log(Result);
      //前后端交互
      console.log(that.data.w1);
      console.log(that.data.w2);
      console.log(that.data.t1);
      console.log(that.data.t2);
      wx.request({
        url: 'http://192.168.145.56:5000/apis/link/',
         data: {
           id:app.globalData.rid,
           building:that.data.w1,
           classroom:that.data.w2,
           time1:that.data.t1,
           time2:that.data.t2,
           jsonData:Result,
         },
        method: "POST",
        success: function(res) {//所有数据发送成功才能跳转到首页
          console.log(res.data.course_id);//打印后端返回的数据
          if(that.data.c==1){
            wx.navigateTo({
               url: '/packA/pages/jswd/jswd'
              });
           }
           that.setData({
             c:0,
           })
          }
      }) 
    },
  });
     }
})
