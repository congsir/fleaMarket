// pages/myGoods/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      myGoodsList:[],
  },
   
  tapNavgate: function (e) {
    console.log(e);
    wx.setStorage({
      key: 'goodsDetail',
      data: e.currentTarget.dataset.item    ,
    })
    wx.navigateTo({
      url: '../goodsDetail/index',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },


  french: function () {
    let _this = this;
    var myPublishGoods = wx.getStorageSync('myPublishGoods');
    this.setData({
      myGoodsList: myPublishGoods,
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
    this.french();
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