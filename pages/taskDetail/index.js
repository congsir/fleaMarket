// pages/taskDetail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    busynessName: '',
    busynessContent: '',
    busynessPrice: '',
    phoneNumber: '',
    qqNumber:'',
    browseTime:'',
    publishTime:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var taskDetail = wx.getStorageSync('taskDetail');
    var timeStamp = taskDetail.timeStamp;
    var busynessType = taskDetail.busynessType;
    taskDetail.browseTime++;
    this.setData({
      busynessName: taskDetail.busynessName,
      busynessContent: taskDetail.busynessContent,
      busynessPrice: taskDetail.busynessPrice,
      phoneNumber: taskDetail.phoneNumber,
      qqNumber: taskDetail.qqNumber,
      browseTime: taskDetail.browseTime,
      publishTime: taskDetail.publishTime,
    })
    if(taskDetail.busynessStyle == '普通任务'){
      var busyness_normal = wx.getStorageSync('busyness_normal');
      for (var i = 0; i < busyness_normal.length; i++) {
        if (busyness_normal[i].timeStamp == timeStamp) {
          busyness_normal[i].browseTime = taskDetail.browseTime;
          wx.setStorageSync('busyness_normal', busyness_normal);
          break;
        }
      }
    }else if (taskDetail.busynessStyle == '紧急任务'){
      var busyness_hurry = wx.getStorageSync('busyness_hurry');
      console.log('666');
      for (var i = 0; i < busyness_hurry.length; i++) {
        if (busyness_hurry[i].timeStamp == timeStamp) {
          busyness_hurry[i].browseTime = taskDetail.browseTime;
          wx.setStorageSync('busyness_hurry', busyness_hurry);
          break;
        }
      }
    } else if (taskDetail.busynessStyle == '长期任务'){
      var busyness_longTime = wx.getStorageSync('busyness_longTime');
      for (var i = 0; i < busyness_longTime.length; i++) {
        if (busyness_longTime[i].timeStamp == timeStamp) {
          busyness_longTime[i].browseTime = taskDetail.browseTime;
          wx.setStorageSync('busyness_longTime', busyness_longTime);
          break;
        }
      }
    }
    
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