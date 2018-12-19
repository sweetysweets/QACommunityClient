//index.js
//获取应用实例
const app = getApp()
var util = require('../../utils/util.js')
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    navTab: ["我的关注","与我相关","全部问题"],
    currentNavtab: "0",
    focusUserQuestion: [],
    focusUserQuestion_length: 0,
    focusUserAnswer: [],
    focusUserAnswer_length: 0,
    focusQuestion:[],
    focusQuestion_length: 0,
    related:[],
    related_length: 0,
    allquestions:[],
    allquestions_length:0,
    time: null
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this;
    //调用应用实例的方法获取全局数据
    // this.refresh();
    // var time = new Date();
    // var time = util.formatTime(new Date());
    // // 再通过setData更改Page()里面的data，动态更新页面的数据  
    // this.setData({
    //   time: time
    // });  
    wx.request({

      url: app.globalData.urlPath + '/getmyfocususerquestion',
      //传递参数 userid到后台查询
      // data:{userid:app.globalData.userInfo.userid},
      data: { userid: 7 },
      header: {
        //'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log("success")
        console.log(res.data)
        that.setData({
          focusUserQuestion: res.data,
          focusUserQuestion_length: res.data.length
        })
        // resolve(res)
      },
      fail: function (res) {
        // reject(res)
        console.log("failed")
      }
    })

    wx.request({

      url: app.globalData.urlPath + '/updating/getmyfocususeranswer',
      //传递参数 userid到后台查询
      // data:{userid:app.globalData.userInfo.userid},
      data: { userid: 7 },
      header: {
        //'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log("success")
        console.log(res.data)
        that.setData({
          focusUserAnswer: res.data,
          focusUserAnswer_length: res.data.length
        })
        // resolve(res)
      },
      fail: function (res) {
        // reject(res)
        console.log("failed")
      }
    })

    wx.request({

      url: app.globalData.urlPath + '/getmyfocusquestion',
      //传递参数 userid到后台查询
      // data:{userid:app.globalData.userInfo.userid},
      data: { userid: 7 },
      header: {
        //'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log("success")
        console.log(res.data)
        that.setData({
          focusQuestion: res.data,
          focusQuestion_length: res.data.length
        })
        // resolve(res)
      },
      fail: function (res) {
        // reject(res)
        console.log("failed")
      }
    })
    wx.request({
      url: app.globalData.urlPath + '/updating/getmyrelatedanswer',
      data: { userid: 7 },
      header: {
        //'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log("success")
        console.log(res.data)
        that.setData({
          related: res.data,
          related_length: res.data.length
        })
        // that.onLoad();
        // resolve(res)
      },
      fail: function (res) {
        // reject(res)
        console.log("failed")
      }
    })

    wx.request({
      url: app.globalData.urlPath + '/getallquestions',
      data: { userid: 2 },
      header: {
        //'Content-Type': 'application/json'
      },
      method: 'GET',
      success: function (res) {
        console.log("success")
        console.log(res.data)
        that.setData({
          allquestions: res.data,
          allquestions_length: res.data.length
        })
        // that.onLoad();
        // resolve(res)
      },
      fail: function (res) {
        // reject(res)
        console.log("failed")
      }
    })

    // for i in 
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })

    // }


    
  },

  onShow: function(){
    console.log("onShow");
    // wx.request({
    //   url: app.globalData.urlPath + '/getmyfocus',
    //   //传递参数 userid到后台查询
    //   // data:{userid:app.globalData.userInfo.userid},
    //   data: { userid: 7 },
    //   header: {
    //     //'Content-Type': 'application/json'
    //   },
    //   method: 'GET',
    //   success: function (res) {
    //     console.log("success")
    //     console.log(res.data)
    //     that.setData({
    //       focus: res.data,
    //       focus_length: res.data.length
    //     })
    //     // resolve(res)
    //   },
    //   fail: function (res) {
    //     // reject(res)
    //     console.log("failed")
    //   }
    // })

  },
  switchTab: function (e) {
    
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
    var currenttab = e.currentTarget.dataset.idx;
    console.log("当前页面索引是：",currenttab);
    switch(currenttab)
    {
      
      case 0:
        console.log("跳转到0页面");
        // wx.request({
          
        //   url: app.globalData.urlPath + '/getmyfocus',
        //   //传递参数 userid到后台查询
        //   // data:{userid:app.globalData.userInfo.userid},
        //   data: { userid: 7 },
        //   header: {
        //     //'Content-Type': 'application/json'
        //   },
        //   method: 'GET',
        //   success: function (res) {
        //     console.log("success")
        //     console.log(res.data)
        //     that.setData({
        //       focus: res.data,
        //       focus_length: res.data.length
        //     })
        //     // resolve(res)
        //   },
        //   fail: function (res) {
        //     // reject(res)
        //     console.log("failed")
        //   }
        // })
        this.onLoad();
        break;
      case 1:
        console.log("跳转到1页面");
        // wx.request({
        //   url: app.globalData.urlPath + '/updating/getmyrelatedanswer',
        //   data: { userid: 2 },
        //   header: {
        //     //'Content-Type': 'application/json'
        //   },
        //   method: 'GET',
        //   success: function (res) {
        //     console.log("success")
        //     console.log(res.data)
        //     that.setData({
        //       related: res.data,
        //       related_length: res.data.length
        //     })
        //     // that.onLoad();
        //     // resolve(res)
        //   },
        //   fail: function (res) {
        //     // reject(res)
        //     console.log("failed")
        //   }
        // })
        this.onLoad();
        break;
      case 2:
        console.log("跳转到页面2");
        // wx.request({
        //   url: app.globalData.urlPath + '/getallquestions',
        //   data: { userid: 2 },
        //   header: {
        //     //'Content-Type': 'application/json'
        //   },
        //   method: 'GET',
        //   success: function (res) {
        //     console.log("success")
        //     console.log(res.data)
        //     that.setData({
        //       allquestions: res.data,
        //       allquestions_length: res.data.length
        //     })
        //     // that.onLoad();
        //     // resolve(res)
        //   },
        //   fail: function (res) {
        //     // reject(res)
        //     console.log("failed")
        //   }
        // })
        this.onLoad();
        break;
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // onShow: function () {
    
  //   this.setData({
  //     student: student
  //   })
  // },
//网络请求数据, 实现刷新
  // refresh0: function () {
  //   var index_api = '';
  //   util.getData(index_api)
  //     .then(function (data) {
  //       //this.setData({
  //       //
  //       //});
  //       console.log(data);
  //     });
  // },

  //刷新一次性获取数据
  // refresh: function () {
  //   var feed = util.getDiscovery();
  //   console.log("loaddata");
  //   var feed_data = feed.data;
  //   this.setData({
  //     feed: feed_data,
  //     feed_length: feed_data.length
  //   });
  // },
  //使用本地 fake 数据实现继续加载效果
  // nextLoad: function () {
  //   var next = util.discoveryNext();
  //   console.log("continueload");
  //   var next_data = next.data;
  //   this.setData({
  //     feed: this.data.feed.concat(next_data),
  //     feed_length: this.data.feed_length + next_data.length
  //   });
  // }
})
