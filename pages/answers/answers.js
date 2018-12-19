// pages/answers/answers.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question_id:1,
    title:'',

    answer_id:2,
    answer_content:'',
    follow: true,
    good: true,
    bad: true,
    like: true,
    collect: true,
    comment_length:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    this.setData({
      //question_id:options.question_id
    })

    wx.request({
      url: 'http://localhost:8080/answer/queryAnswer',
      data:{
        answer_id:this.data.answer_id
      },
      method:'GET',
      success:function(res){
        var answer = res.data;
        console.log(res.data)
        
        that.setData({
          answer_content:answer.content
        })
      }
    })
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
  follow_change: function () {
    var follow = this.data.follow;
    this.setData({
      follow: !follow
    })
  },
  good_change: function () {
    var good = this.data.good;
    this.setData({
      good: !good,
    })
    var good = this.data.good;
    var bad = this.data.bad;
    if (good == false && bad == false) {
      this.setData({
        bad: !bad
      })
    }
  },
  bad_change: function () {
    var bad = this.data.bad;
    this.setData({
      bad: !bad,
    })
    var good = this.data.good;
    var bad = this.data.bad;
    if (good == false && bad == false) {
      this.setData({
        good: !good
      })
    }
  },
  like_change: function () {
    var like = this.data.like;
    this.setData({
      like: !like
    })
  },
  collect_change: function () {
    var collect = this.data.collect;
    this.setData({
      collect: !collect
    })
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

  },
  toComment:function(){
    wx.navigateTo({
      url: '../comment/comment?answer_id='+this.data.answer_id,
    })
    
  },
  getCommentCount:function(){
    wx.request({
      url: getApp().globalData.urlPath + 'comment/getCommentCount',
      data: {
        answer_id: this.data.answer_id
      },
      method: 'GET',
      success: function (res) {
        var count = res.data;
        console.log(res.data)

        that.setData({
          comment_length:count
        })
      }
    })
  }
})