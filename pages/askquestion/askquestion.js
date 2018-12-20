// pages/askQuestion/askquestion.js
const app = getApp()
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {name:'0',value:'公开回答',checked:'true'},
      {name: '1', value: '关闭回答'}
    ],
    user_id:2
  },
  radioChange:function(e){
    this.setData({
      mystate:parseInt(e.detail.value)
    });
    console.log("rid:"+e.detail.value);
  },
  titleInput:function(e){
    this.setData({
      mytitle:e.detail.value
    })
  },
  contentInput:function(e){
    this.setData({
      mycontent:e.detail.value
    })
  },
  gotoList:function(options){
    if(this.data.mytitle==null){
      wx.showToast({
        title:"问题必须大于4个字符",
        icon:"none",
        duration:3000
      })
    }else{
      //var mytime =util.formatTime(new Date);


       var uid = app.globalData.userInfo.id;

      console.log("title:" + this.data.mytitle);
      console.log("content:"+this.data.mycontent);
      //console.log("time:"+mytime)
      wx.request({

        

        url: app.globalData.urlPath+'submitquestion?userid='+uid+'&title=' + this.data.mytitle + '&content=' + this.data.mycontent+'&state='+this.data.mystate,

        method:'POST',
        success:function(res){
          console.log("res"+res.data);
          wx.showToast({
            title: "已成功发布问题"
          });
          wx.switchTab({
            url: '../index2/index2',
          });
          console.log("呵呵");
        },
        fail: function () {
          console.log("data:"+data);
          console.log("index.js wx.request CheckCallUser fail");
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this;
    // that.data.user_id= app.globalData.userinfo.uid;

    console.log(app.globalData.userInfo.id);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
 
})