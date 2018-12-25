//app.js
App({
  onLaunch: function () {
    var that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
          if (res.code) {
            //发起网络请求
            wx.request({
              url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx015f2e27ccd72b47&secret=79ae469f962f2170f6b44ee34e9b4ae7&js_code=' + res.code + '&grant_type=authorization_code',
              data: {
                code: res.code
              },
              success: function (data) {
                console.log(data);
                that.globalData.openid = data.data.openid
              }
            }) 
          } else {
            console.log('获取用户登录态失败！' + res.errMsg)
          }
        }
      }
    )
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    urlPath: "http://129.28.81.82:8080/",
    openid:null,
  }
})