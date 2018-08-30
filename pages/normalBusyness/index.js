// pages/normalBusyness/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
     normalBusynessArr:[],
  },
  navgate:function(e){
    wx.setStorageSync('taskDetail', e.currentTarget.dataset.item);
    wx.navigateTo({
      url: '../taskDetail/index',
    })
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
    var normalBusynessArr = wx.getStorageSync('busyness_normal');
  
    for (var i = 0; i < normalBusynessArr.length; i++) {
      var str = normalBusynessArr[i].busynessContent;
      if (str.length > 26) {
        var arr = str.split('');
        arr.splice(26, arr.length, '...');
        str = arr.join('');
        normalBusynessArr[i].busynessContentLogo = str;
      }
    }

    this.setData({
      normalBusynessArr: normalBusynessArr
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
  
  }
})