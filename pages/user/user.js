//获取应用实例  
var app = getApp()

var allData = require('../../data/data.js')

Page({
  data: {
    /** 
     * 页面配置 
     */
    concerntext: "已关注",
    flag: true,
    winWidth: 0,
    winHeight: 0,
    // tab切换  
    currentTab: 0,
  },
  onLoad: function (option) {
    var that = this;
    /** 
     * 获取系统信息 
     */
    that.setData({
      user_key: allData.userList,
      problem_key: allData.proList
    })
    wx.getSystemInfo({

      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }

    });
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function (event) {

    var that = this;
    that.setData({
      currentTab: event.detail.current
    });

  },
  /** 
   * 点击tab切换 
   */
  swichNav: function (event) {

    var that = this;

    if (this.data.currentTab === event.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: event.target.dataset.current
      })
    }
  },
      /**
   *  点击进入问题详情页面
   * */
  onDetails:function(event){
    wx.navigateTo({
           url:"/page/quedetail/quedetail"
     });
  },

})