// pages/answers/answers.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    question_id:0,
    question_title:'',
    user_id:0,  //旺哥之前定义的，我后来都用uid表示 登录用户的id
    auid:-1, //回答答主的用户id
    user_name:'',
    user_description:'',
    user_avatar_src:'',
    question_id:5,
    title:'',
    support:0,
    against:0,
    uid:0, //登录用户的userid
    answer_id:2,

    // answer_id:0,

    followusers_list: [], //保存用户关注的用户（答主）列表
    followusers_list_length: 0,
    answer_content:'',
    follow: true,
    good: true,
    bad: true,
    
    // like: true,
    // collect: true,
    comment_length:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var userid = app.globalData.userInfo.id;
    console.log('Answers界面的 userid是:' + userid);
    that.setData({
      uid: userid //将userid写入页面data里
    });
    console.log(options)

   console.log(options.answer_id)

    console.log('Answers界面中的answer_id：'+options.answer_id)
    console.log('Answers界面中的auid：' + options.auid)

    that.setData({
      question_id:options.question_id,
      answer_id:options.answer_id,
      question_title:options.question_title,
      // question_id:options.question_id,
      auid:options.auid
    })
    console.log('22222Answers界面中的auid：' + this.data.auid);
    console.log('22222Answers界面中的uid：' + this.data.uid);
   
    //发送请求查看用户关注的用户（答主）列表,并查看回答本问题的答主是否在关注用户列表中
    wx.request({
      url: 'http://localhost:8080/user/getallmyfollowusers',
      method: 'GET',
      data: {
        userid: this.data.uid
      },
      success: function (res) {
        console.log(res.data);
        that.setData({
          followusers_list: res.data,  //将查询结果赋值给question_list
          followusers_list_length: res.data.length
        })
        for (var i = 0; i < that.data.followusers_list_length; i++) {
          if (that.data.followusers_list[i].id == that.data.auid) {
            // console.log('saaaaaaaaaaaaaaaaaaa');
            that.setData({
              follow: false
            });
            break;
          }
        }
        console.log("是否关注此用户：" + that.data.follow);
        console.log("请求查看用户关注用户列表成功！");
      },
      fail: function () {
        console.log("data:" + res.data);
        console.log("请求查看用户关注用户列表 fail");
      },
      complete: function () {
        // complete
      }
    })

    
    wx.request({
      url: 'http://localhost:8080/answeruser/getansweruser',
      data:{
        answer_id:that.data.answer_id
      },
      method:'GET',
      success:function(res){
        var answer = res.data;
        console.log(res.data)
        
        that.setData({
          answer_content:answer.content,
          user_id:answer.user_id,
          user_avatar_src:answer.avater,
          user_name:answer.user_name,
          user_description:answer.description,
          support:answer.support,
          against:answer.against
        })
      }
    })
 
    this.getCommentCount();
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
    var that = this;
    this.setData({
      follow: !follow
    })

    if (this.data.follow === false) {
      //关注用户了,插入数据
      console.log(that.data.user_id);
      console.log('auid='+that.data.auid)
      wx.request({
        url: 'http://localhost:8080/user/insertmyfollowuser',
        data: {
          userid:that.data.uid,
          userfollowedid:that.data.auid
        },
        success: function (res) {
          console.log(res.data);
          console.log("请求插入用户关注用户列表 成功");
        },
        fail: function () {
          console.log("请求关注用户 fail");
        },
        complete: function () {
          // complete
        }
      })
    }
    else {
      //取关，删除数据
      wx.request({
        url: 'http://localhost:8080/user/cancelmyfollowuser',
        data: {
          userid: that.data.uid,
          userfollowedid: that.data.auid
        },
        success: function (res) {
          console.log(res.data);
          console.log("请求取消关注用户 成功");
        },
        fail: function () {
          console.log("请求取消关注用户 fail");
        },
        complete: function () {
          // complete
        }
      })
    }
  },
  good_change: function () {
    var that = this;
    var good = this.data.good;
    this.setData({
      good: !good,
    })
    var tem_support = this.data.support;
    var tem_against = this.data.against;
    
    var good = this.data.good;
    //第一次
    if (good == true){
      //support -1
      tem_support = tem_support - 1;

      wx.request({
        url: 'http://localhost:8080/answer/updateSupport',
        data:{
          support:tem_support,
          answer_id:this.data.answer_id
        },
        method:"GET",
        success:function(res){
          console.log("更新了support！-1");
        }
      })
      that.setData({
        support:tem_support
      })
      
    }
    else{
      //support +1
      tem_support = tem_support + 1;

      wx.request({
        url: 'http://localhost:8080/answer/updateSupport',
        data: {
          support: tem_support,
          answer_id: this.data.answer_id
        },
        method: "GET",
        success: function (res) {
          console.log("更新了support！+1");
        }
      })
      that.setData({
        support: tem_support
      })
    }
    var bad = this.data.bad;
    if (good == false && bad == false) {
      //点赞against -1
      tem_against = tem_against -1;
      wx.request({
        url: 'http://localhost:8080/answer/updateAgainst',
        data: {
          against: tem_against,
          answer_id: this.data.answer_id
        },
        method: 'GET',
        success: function (res) {
          console.log("更新了against！-1");
          console.log(tem_against)
        }
      })
      that.setData({
        against: tem_against
      })
      this.setData({
        bad: !bad
      })
      
    }
  },
  bad_change: function () {
    var that = this;
    var tem_support = this.data.support
    var tem_against = this.data.against
    var bad = this.data.bad;
    this.setData({
      bad: !bad,
    })
    var good = this.data.good;
    var bad = this.data.bad;
    if(bad == true){
      tem_against = tem_against - 1;
      //against -1
      wx.request({
        url: 'http://localhost:8080/answer/updateAgainst',
        data: {
          against: tem_against,
          answer_id: this.data.answer_id
        },
        method: 'GET',
        success: function (res) {
          console.log("更新了against！-1");
          console.log(tem_against)
        }
      })
      that.setData({
        against: tem_against
      })
    }
    else{
      //against +1
      tem_against = tem_against + 1
      wx.request({
        url: 'http://localhost:8080/answer/updateAgainst',
        data: {
          against: tem_against,
          answer_id: this.data.answer_id
        },
        method: 'GET',
        success: function (res) {
          console.log("更新了against！+1");
          console.log(tem_against)
        }
      })
      that.setData({
        against: tem_against
      })
    }
    if (good == false && bad == false) {
        //support -1
        tem_support = tem_support - 1
      wx.request({
        url: 'http://localhost:8080/answer/updateSupport',
        data: {
          support: tem_support,
          answer_id: this.data.answer_id
        },
        method: 'GET',
        success: function (res) {
          console.log("更新了support！-1");
        }
      })
      that.setData({
        support: tem_support
      })
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
    var that = this
    wx.request({
      url: "http://localhost:8080/comment/getCommentCount",
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