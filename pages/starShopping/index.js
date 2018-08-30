Page({

  /**
   * 页面的初始数据
   */


  data: {
    myStarShopping:[],
    total:0,
    active:false,
  },
  /**
   * 在wxml中在数据渲染的过程中直接将商品的数据绑定在对应的商品上。这样在用户点击删除按键时，就可以将商品绑定的数据传递到js中，在js中先得到数据库中我的收藏里全部的数据。用户发布商品时，系统会自动生成商品发布时的时间戳，时间戳是唯一与商品一一对应的数据，这里我就可以通过用户点击删除按键时传递过来的数据时间戳与数据库中的时间戳进行对比。就可以准确找到我的收藏中的商品，然后在数据库中进行删除。
   */
  // refresh()函数是用以完成底部价格计算的
  refresh:function(){
    let _this = this;
    let total = 0;
    wx.getStorage({
      key: 'myStarShopping',
      success: function (res) {
        if (res.data.length == 0) {
          _this.data.total = 0;
        } else {
          for (var i = 0; i < res.data.length; i++) {
            if(res.data[i].state == 1){
              total = total + Number(res.data[i].goodsPrice);
            } 
          }
          _this.data.total = total;
        }
        _this.setData({
          myStarShopping: res.data,
          total: _this.data.total,
        })


      },
    })
  },
  // 用以页面跳转
  navgate:function(e){
    wx.setStorage({
      key: 'goodsDetail',
      data: e.currentTarget.dataset.item,
      success:function(){
        wx.navigateTo({
          url: '../goodsDetail/index',
        })
      }
    })
    
  },
  
  // 基于数据绑定的原理，用于每件商品进行选中操作
  active:function(e){
    var myStarShopping = wx.getStorageSync('myStarShopping');
    var len = myStarShopping.length;
    for(var i = 0; i < len; i++){
      if(myStarShopping[i].publishTime == e.currentTarget.dataset.item.publishTime){

        myStarShopping[i].state == 0 ? myStarShopping[i].state = 1 : myStarShopping[i].state = 0 ;

      }
    }
    wx.setStorageSync('myStarShopping', myStarShopping);
    this.refresh();
   
  },

  // 函数用于对商品进行结算，会输出商品的名称与单价
  closeAccount:function(e){
      var myStarShopping = wx.getStorageSync('myStarShopping');
      var len = myStarShopping.length;
      var closeAccount = [];
      for(var i = 0; i < len; i++){
        if(myStarShopping[i].state == 1){
          closeAccount.push(myStarShopping[i]);
        }
      }
      var content = '您将结算的商品为: ';
      var length = closeAccount.length;
      for(var i = 0; i < length; i++ ){
        content = content + closeAccount[i].goodsName + ' , ';
      }
      content = content + '总价为： ' + this.data.total + '元';
      wx.setStorage({
        key: 'closeAccount',
        data: closeAccount,
        success:function(){
          wx.showModal({
            title: '结算',
            content: content,
          })
        }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },
  
  // 用于商品的删除操作，绑定在删除按钮上
  deleteStar:function(e){
    var _this = this;
      let item = e.currentTarget.dataset.item;
      let myStarShopping = wx.getStorageSync('myStarShopping');

      function findArrIndex(item){
        for(var i = 0;i < myStarShopping.length; i++ ){
          console.log(i);
          if (myStarShopping[i]['publishTime'] == item.publishTime){
            return i;
          }
        }
      }

      function deleteStarArr (item){
        let i = findArrIndex(item);
        myStarShopping.splice(i,1);
        wx.setStorageSync('myStarShopping', myStarShopping);

      }

      deleteStarArr(item);
      this.refresh();


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
    this.refresh();
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
    this.refresh();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.refresh();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})