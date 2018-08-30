Page({

  /**
   * 页面的初始数据
   */
  data: {
    navLeftItems:[
      '出行工具',
      '读书教材',
      '数码设备',
      'VIP卡转移',
      '小电器',
      '生活娱乐',
      '紧急任务',
      '长期任务',
      '普通任务'
    ],
    navRightItemsImages:["vehicle"
    ],
    navRightItemsContents:[
      "vehicleContent"
    ],
    vehicle:[
      "../../images/bike.png",
      "../../images/electriclBike.png"
    ],
    vehicleContent:[
      "自行车",
      "小电驴"
    ],
    curNav: 0,
    show:['active','','','','','','','','']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  // 用于进行左侧导航栏的切换，实现原理为利用active类名让选中的部分显现，让其他部分进行影藏
  switchRightTab: function (e) {
    let index = parseInt(e.target.dataset.index);
    var showArr = ['', '', '', '', '', '', '', '', ''];
    showArr[index] = 'active';
    this.setData({
      curNav: index,
      show:showArr
      // curIndex: index
    })
    if(index == 6){
      wx.navigateTo({
        url: '../hurryBusyness/index',
      })
    }
    if (index == 7) {
      wx.navigateTo({
        url: '../longTimeBusyness/index',
      })
    }
    if (index == 8) {
      wx.navigateTo({
        url: '../normalBusyness/index',
      })
    }
  },
//  页面跳转函数，先将页面名称保存下来存入内存中，在进入目的界面时，根据内存中的数据对对应数据进行请求
  navigateToNext:function(e){
    var value = e.currentTarget.dataset.value;
    var name = 'goods_' + value;
    wx.setStorageSync('goodsShow', name);
    wx.navigateTo({
      url: '../goodsShow/index',
    })
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