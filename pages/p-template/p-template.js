var userData = require('../../data/data.js')

Page({
    data: {
      /** 
       * 页面配置 
       */
      token:userData.userList,
      flag: true
    },
  /** 
   * 点击更改文字显示 
   */
onConcern: function (event) {

    if (this.flag == true) {
      this.setData({token:'+ 关注'})
      this.flag = false;
      console.log(this.flag);

    } else {
      this.setData({token:'已关注'});
      this.flag = true;
      console.log(this.flag);
    }
  },

})