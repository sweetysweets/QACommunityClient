//answer.js
// var util = require('../../utils/util.js')
var qaadatas = require('../../data/question_data.js')

var app = getApp()
Page({
  data: {
    motto: '知乎--微信小程序版',
    userInfo: {}
  },
  //事件处理函数
  bindItemTap: function () {
    wx.navigateTo({
      url: '../answers/answers'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    // this.data.qaa_list=qaadatas.qaa_list
    this.setData({
      qaa_list: qaadatas.qaa_list,
      qc:qaadatas.qc,
      qt:qaadatas.qt,
    });
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  },
  tapName: function (event) {
    console.log(event)
  }
})
