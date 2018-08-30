// pages/publishBusyness/index.js
Page({
    
  /**
   * 页面的初始数据
   */
  data: {
    busynessType: ['普通任务', '紧急任务', '长期任务'],
    busynessIndex: 0,
    busynessName:'任务名称',
    busynessContent:'任务描述',
    busynessPrice:'价格',
    phoneNumber:'电话号码',
    qqNumber:'qq号码',
    once:1,
  },
  bindBusynessChange:function(e){
      this.setData({
        busynessIndex:e.detail.value,
      })
  },

  // 此处函数为监听任务具体信息的输入
  busynessName:function(e){
    this.setData({
      busynessName: e.detail.value
    })
  },
  busynessContent:function(e){
    this.setData({
      busynessContent: e.detail.value
    })
  },
  busynessPrice:function(e){
    this.setData({
      busynessPrice: e.detail.value
    })
  },
  phoneNumber: function (e) {
    this.setData({
      phoneNumber: e.detail.value
    })
  },
  qqNumber: function (e) {
    this.setData({
      qqNumber: e.detail.value
    })
  },

  // 任务发布函数

  busynessPublish:function(e){
    var mydate = new Date();
    var timeStamp = mydate.getTime();
    var month = mydate.getMonth() + 1;
    var publishTime = mydate.getFullYear() + '/' + month + '/' + mydate.getDate() + ' ' + mydate.getHours() + ':' + mydate.getMinutes() + ':' + mydate.getSeconds();
    if (this.data.once == 1){
      var phoneNumberLen = this.data.phoneNumber.length;
      if (phoneNumberLen == 11 && String(Number(this.data.phoneNumber)) != 'NaN') {
        this.data.once = 2;
      } else {
        wx.showModal({
          title: '提示',
          content: '请正确输入11位手机号',
        })
      }
    }
    

    if(this.data.once == 2){
      var _this = this;
      var index = this.data.busynessIndex;
      var obj = {
        busynessName: _this.data.busynessName,
        busynessContent: _this.data.busynessContent,
        busynessPrice: _this.data.busynessPrice,
        phoneNumber: _this.data.phoneNumber,
        qqNumber: _this.data.qqNumber,
        timeStamp:timeStamp,
        publishTime:publishTime,
        busynessStyle: _this.data.busynessType[index],
        browseTime: 0,
      }
      if (_this.data.busynessType[index] == '普通任务') {
        var busyness_normal = wx.getStorageSync('busyness_normal') || [];
        busyness_normal.push(obj);
        wx.setStorage({
          key: 'busyness_normal',
          data: busyness_normal,
          success:function(res){
            _this.data.once = 0;
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      } else if (_this.data.busynessType[index] == '紧急任务'){
        var busyness_hurry = wx.getStorageSync('busyness_hurry') || [];
        busyness_hurry.push(obj);
        wx.setStorage({
          key: 'busyness_hurry',
          data: busyness_hurry,
          success: function (res) {
            _this.data.once = 0;
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      } else if (_this.data.busynessType[index] == '长期任务'){
        var busyness_longTime = wx.getStorageSync('busyness_longTime') || [];
        busyness_longTime.push(obj);
        wx.setStorage({
          key: 'busyness_longTime',
          data: busyness_longTime,
          success: function (res) {
            _this.data.once = 0;
            wx.showToast({
              title: '发布成功',
              icon: 'success',
              duration: 2000
            })
          }
        })
      }

      var myPublishBusyness = wx.getStorageSync('myPublishBusyness') || [];
      myPublishBusyness.push(obj);
      wx.setStorageSync('myPublishBusyness', myPublishBusyness);
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})