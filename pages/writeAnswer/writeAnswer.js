// pages/writeAnswer/writeAnswer.js
var util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focus:false,
    url: 'http://localhost:8080/answer/addAnswer',
      user_id: 5,
      content: ' ',
      support: 8,
      against: 8,
      state: 1,
      time: ''
  
      

  },
  bindButtonTap:function(e){
  //  var time = util.formatTime();
 //   console.log(time)
    this.setData({
      focus:true,
      content:e.detail.value,
      time: this.data.time
    })
  },
  submmitAnswer: function(e){
    var that = this;
    var formData = e.detail.value;
    formData.user_id = that.data.user_id
    formData.support = that.data.support
    formData.against = that.data.against
    formData.state = that.data.state
    formData.time = that.data.time
    formData.content = that.data.content
    var url = that.data.url
       console.log(formData)
      console.log("======",that.data.content)
      console.log(that.data.time)
      wx.request({
        url: url,
        data:JSON.stringify(formData),
        method:'POST',
        header:{
          'Content-Type':'application/json'
        },
        success:function(res){
          console.log(res.data)
        }
      })
     

      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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