//logs.js
var util = require('../../utils/util.js')

Page({
  data: {
    answer_id:0,
    pagesize:2,
    pagenumber:0,
    commentlist:[],
    comment_length:0,
    releaseFocus: false,
    reply_name:"test",
    reply_id:0,
    reply_content:"",
    parent_id:0,
    replylist:null,
    reply_index:-1,

  },
  bindButtonTap: function() {
    this.setData({
      focus: Date.now()
    })
  },
  bindReply: function (e) {
    this.setData({
      releaseFocus: true,
      reply_id: e.target.dataset.id,
      reply_name: e.target.dataset.name,
      reply_index: e.target.dataset.idx,
    })
  },
  bindKeyInput: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindReplaceInput: function(e) {
    var value = e.detail.value
    var pos = e.detail.cursor
    if(pos != -1){
      //光标在中间
      var left = e.detail.value.slice(0,pos)
      //计算光标的位置
      pos = left.replace(/11/g,'2').length
    }

    //直接返回对象，可以对输入进行过滤处理，同时可以控制光标的位置
    return {
      value: value.replace(/11/g,'2'),
      cursor: pos
    }

    //或者直接返回字符串,光标在最后边
    //return value.replace(/11/g,'2'),
  },
  bindHideKeyboard: function(e) {
    if (e.detail.value === '123') {
      //收起键盘
      wx.hideKeyboard()
    }
  },
  onLoad: function () {
    var that = this;
    that.getCommentList(that);

  },
 
  getCommentList: function (that) {
    var index = that.data.reply_index;
    console.log(index);
   
    wx.request({
      url: getApp().globalData.urlPath + 'comment/getCommentList',
      data: {   
        answer_id:this.data.answer_id,
       
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var datas = res.data;//res.data就是从后台接收到的值
        for (var i = 0; i < datas.length; i++) {//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
           datas[i]["time"] = formatTime(new Date(datas[i]["time"]));
           datas[i].flag = false; // 添加新属性

        }
        that.setData({
          commentlist: datas,
          comment_length: datas.length,
        
        })  
      }
    });
    if (index != -1) {
      var key = "commentlist[" + index + "].flag";
    
    wx.request({
      url: getApp().globalData.urlPath + 'comment/getReplyList',
      data: {
        comment_id: that.data.commentlist[index]['comment_id']
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var datas = res.data;//res.data就是从后台接收到的值
        for (var i = 0; i < datas.length; i++) {//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
          datas[i]["time"] = formatTime(new Date(datas[i]["time"]))
        }
        that.setData({
          replylist: datas,
          [key]: true,
        })
        console.log(that.data.replylist)
      }
    });

    }



  },
  textareablur:function(e){
    this.setData({
      releaseFocus: false
    })
  },
  textareaInput:function(e){
    this.setData({
      reply_content:e.detail.value
    })
  },
  sendMessage:function(e){
    var that = this
   
    wx.request({
      url: getApp().globalData.urlPath + 'comment/addComment',
      data: {
        user_id: getApp().globalData.userInfo.id,
        answer_id:this.data.answer_id,
        reply_id: this.data.reply_id,
        content: this.data.reply_content
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        
        that.onLoad()

        that.setData({
          releaseFocus:false,
          reply_content:null,
        })
      }
    });
  },
  
  showReply:function(e){
    var that = this
    var idx = e.currentTarget.dataset.idx;
    var parent = e.currentTarget.dataset.parent;  // 获取当前下标
    console.log(parent)
    var key = "commentlist[" + idx + "].flag";
    var val = this.data.commentlist[idx].flag;
    wx.request({
      url: getApp().globalData.urlPath + 'comment/getReplyList',
      data: {
        comment_id: parent
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var datas = res.data;//res.data就是从后台接收到的值
        for (var i = 0; i < datas.length; i++) {//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
          datas[i]["time"] = formatTime(new Date(datas[i]["time"]))
        }
        that.setData({
          replylist: datas, 
          [key]: !val,
          
        })
        console.log(that.data.replylist)
      }
    });

  }



})

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}