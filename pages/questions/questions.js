//answer.js
// var util = require('../../utils/util.js')
//var qaadatas = require('../../data/question_data.js')

Page({
  data: {
    question_id:30,
    question_content:'',
    question_title:'',

    answer_list:[],
    followq:true
  },
  //事件处理函数
  bindItemTap: function () {
    // wx.navigateTo({
    //   url: '../answers/answers'

    // })
  },
  toWriteAnswer:function(){
        wx.navigateTo({
      url: '../writeAnswer/writeAnswer'

    })
  },
  onLoad: function (options) {

    console.log('question界面：question_id:'+options.question_id)
    // console.log('question界面：question_title:' + options.question_title)
    // console.log('question界面：question_content:' + options.question_content)
    // console.log('question界面：user_id:' + options.user_id)
    console.log('onLoad')
    var that = this
    that.setData({
      //question_id:options.question_id,
      question_title:options.question_title,
      question_content:options.question_content
    })
    wx.request({
     // url: 'http://localhost:8080/answer/getAnswers',
      url: 'http://localhost:8080/answer/queryAnswers',
      method:'GET',
      data:{
        question_id:that.data.question_id
      },
      success:function(res){
        var answer_list = res.data
        console.log(answer_list)
        that.setData({
          answer_list:answer_list
        })
      }

    })
    //调用应用实例的方法获取全局数据
    
  },
  change_followq: function () {
    var followq = this.data.followq;
    this.setData({
      followq: !followq
    })
    if(followq ==false){
      //关注了
    }
    else{
      //取关
    }

  },

  tapName: function (event) {
    console.log(event)
  }
})
