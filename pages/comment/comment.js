//logs.js
var util = require('../../utils/util.js')

Page({
  data: {
    answer_id:0,
    pagesize:2,
    pagenumber:0,
    commentlist:null,
    comment_length:1

  },
  bindButtonTap: function() {
    this.setData({
      focus: Date.now()
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
    wx.request({
      url: getApp().globalData.urlPath + 'comment/getCommentListByPage',
      data: {   
        answer_id:this.data.answer_id,
        pagenumber:this.data.pagenumber,
        pagesize:this.data.pagesize
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        var datas = res.data;//res.data就是从后台接收到的值
        for (var i = 0; i < datas.length; i++) {//用for循环把所有的时间戳都转换程时间格式，这里调用的是小程序官方demo中带的方法，
          // datas[i]["time"] = formatTime.formatTime(new Date(datas[i]["time"]))
        }
       
          that.data.commentlist= datas;
        that.data.comment_length= datas.length;
        console.log(that.data.commentlist)
          
        
      }
    });
  },
  loadMoreCommentList: function () {
    wx.request({
      url: getApp().globalData.urlPath + 'comment/getCommentListByPage',
      data: {
      
        answer_id: this.data.answer_id,
        pagenumber: this.data.pagenumber+1,
        pagesize: this.data.pagesize
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log(res.data);
        this.data.pagenumber = this.data.pagenumber+1;

      }
    });
  }



})

