//获取应用实例  
var app = getApp()

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
    // userInfo: {},
    user_key: [],
  },
  onLoad: function (option) {
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
    console.log('onLoad')
    //调用应用实例的方法获取全局数据
    // app.getUserInfo(function (userInfo) {
    //   //更新数据
    //   that.setData({
    //     userInfo: userInfo
    //   })
    // })
  },
  /** 
   * 获取关注用户
   */
  onShow: function (event) {
    var that = this;
    if (that.currentTab == 0) {
      wx.request({
        url: 'http://localhost:8080/user/focus_users',
        method: 'GET',
        data: {
          userid: 7
        },
        success: function (res) {
          var user_key = res.data.userList;
          console.log(user_key);
          if (user_key == null) {
            var toastText = '获取用户信息失败' + res.data.errMsg;
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 2000
            })
          } else {
            that.setData({
              user_key: user_key
            });
          }
        }
      })
    } else {
      wx.request({
        url: 'http://localhost:8080/user/focus_problems',
        method: 'GET',
        data: {
          userid: 3
        },
        success: function (res) {
          var problem_key = res.data.problemList;
          console.log(problem_key);
          if (problem_key == null) {
            var toastText = '获取用户信息失败' + res.data.errMsg;
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 2000
            })
          } else {
            that.setData({
              problem_key: problem_key
            });
          }
        }
      })
    }
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
  onDetails: function (event) {
    wx.navigateTo({
      url: "/pages/questions/questions"
    });
  },
  /**
   *  点击进入用户主页
   * */
  onUser: function (event) {
    wx.navigateTo({
      url: "/pages/user/user"
    });
  },
})