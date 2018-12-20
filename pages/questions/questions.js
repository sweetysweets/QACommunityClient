//answer.js
// var util = require('../../utils/util.js')
//var qaadatas = require('../../data/question_data.js')
const app = getApp()

Page({
  data: {
    question_id: 30,
    question_content: '',
    question_title: '',

    answer_list: [],
    followq: true,
    question_list: [], //保存用户关注的问题列表
    question_list_length: 0
  },
  //事件处理函数
  bindItemTap: function() {
    // wx.navigateTo({
    //   url: '../answers/answers'

    // })
  },
  // toWriteAnswer: function() {
  //   console.log('question界面的question_id是：',this.data.question_id);
  //   wx.navigateTo({
  //     url: '../writeAnswer/writeAnswer',
  //     data:({
  //       question_id:this.data.question_id
  //     })

  //   })

  // },
  onLoad: function(options) {

    console.log('question界面：question_id:' + options.question_id)
    // console.log('question界面：question_title:' + options.question_title)
    // console.log('question界面：question_content:' + options.question_content)
    // console.log('question界面：user_id:' + options.user_id)
    console.log('onLoad')

    var that = this;
    var userid = app.globalData.userInfo.id;
    console.log('qustion界面的 userid是:' + userid);
    that.setData({
      userid: userid //将userid写入页面data里
    });
    that.setData({
      question_id: options.question_id,
      question_title: options.question_title,
      question_content: options.question_content
    })

    //发送请求查看用户关注的问题列表,并查看本问题的qid是否在关注问题中
    wx.request({
      url: 'http://localhost:8080/getallmyfollowquestions',
      method: 'GET',
      data: {
        userid: this.data.userid
      },
      success: function(res) {
        console.log(res.data);
        that.setData({
          question_list: res.data, //将查询结果赋值给question_list
          question_list_length: res.data.length
        })
        for (var i = 0; i < that.data.question_list_length; i++) {
          if (that.data.question_list[i].qid == that.data.question_id) {
            console.log('dadaad');
            that.setData({
              followq: false
            });
            break;
          }
        }
        console.log("是否关注此问题：" + that.data.followq);
        console.log("请求查看用户关注问题列表成功！");
      },
      fail: function() {
        console.log("data:" + res.data);
        console.log("请求查看用户关注问题列表 fail");
      },
      complete: function() {
        // complete
      }
    })




    wx.request({
      // url: 'http://localhost:8080/answer/getAnswers',
      url: 'http://localhost:8080/answer/queryAnswers',
      method: 'GET',
      data: {
        question_id: that.data.question_id
      },
      success: function(res) {
        var answer_list = res.data
        console.log(answer_list)
        that.setData({
          answer_list: answer_list
        })
      }

    })
    //调用应用实例的方法获取全局数据

  },
  change_followq: function() {
    var followq = this.data.followq;
    this.setData({
      followq: !followq
    })

    if (this.data.followq === false) {
      //关注了,插入数据
      wx.request({
        url: 'http://localhost:8080/followquestion',
        data: {
          userid: this.data.userid,
          questionid: this.data.question_id
        },
        success: function(res) {
          console.log(res.data);
          console.log("请求查看用户关注问题列表 成功");
        },
        fail: function() {
          console.log("请求关注问题 fail");
        },
        complete: function() {
          // complete
        }
      })
    } else {
      //取关，删除数据
      wx.request({
        url: 'http://localhost:8080/cancelfollowquestion',
        data: {
          userid: this.data.userid,
          questionid: this.data.question_id
        },
        success: function(res) {
          console.log(res.data);
          console.log("请求取消关注问题 成功");
        },
        fail: function() {
          console.log("请求取消关注问题 fail");
        },
        complete: function() {
          // complete
        }
      })
    }

  },

  tapName: function(event) {
    console.log(event)
  }
})