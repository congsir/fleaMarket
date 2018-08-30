// pages/goodsDetail/index.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgList: [
      
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 3000,
    duration: 400,
    circular: true,
    color: "orange",
    publishTime:'',
    browseTime:'',
    content:'',
    price:'',
    name:'',
    phoneNumber:'',
    qqNumber:'',
    tradePlace:'',
    myItem:{},
    once:1,
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
      wx.getStorage({
        key: 'goodsDetail',
        success: function(res) {
          var myItem = res.data;
          var imgList = res.data.imgList;
          var timeStamp = res.data.timeStamp;
          var myPublishGoods = wx.getStorageSync('myPublishGoods');
          var name = 'goods_' + res.data.secondClassify;
          var goodsArr = wx.getStorageSync(name);
          var hotGoods = wx.getStorageSync('hotGoods');
          res.data.browseTime++;
          
          
          _this.setData({
            price:res.data.goodsPrice,
            imgList: imgList,
            content:res.data.goodsDespriction,
            name:res.data.goodsName,
            phoneNumber:res.data.phoneNumber,
            qqNumber:res.data.qqNumber,
            tradePlace:res.data.tradePlace,
            publishTime:res.data.publishTime,
            browseTime:res.data.browseTime,
            myItem:myItem,
          });
          var myPublishGoodsLength = myPublishGoods.length;
          for (var i = 0; i < myPublishGoodsLength; i++){
              if(timeStamp == myPublishGoods[i].timeStamp){
                myPublishGoods[i].browseTime = res.data.browseTime;
                wx.setStorageSync('myPublishGoods', myPublishGoods);
                break;
              }
          }
          var goodsArrLength = goodsArr.length;
          for(var i = 0; i < goodsArrLength; i++){
            if (timeStamp == goodsArr[i].timeStamp) {
              goodsArr[i].browseTime = res.data.browseTime;
              wx.setStorageSync(name, goodsArr);
              break;
            }
          }

          var hotGoodsLength = hotGoods.length;
          for (var i = 0; i < hotGoodsLength; i++) {
            if (timeStamp == hotGoods[i].timeStamp) {
              hotGoods[i].browseTime = res.data.browseTime;
              wx.setStorageSync('hotGoods', hotGoods);
              break;
            }
          }
        },
      })
  },
   addToStarShopping:function(){
     var _this = this;
     var myStarShopping = [];
     myStarShopping = wx.getStorageSync('myStarShopping');
     typeof (myStarShopping) == 'object' ? myStarShopping : myStarShopping = [];
     this.data.myItem.state = 0;
     myStarShopping.push(this.data.myItem);
     console.log(myStarShopping);
    if(this.data.once == 1){
      wx.setStorage({
        key: 'myStarShopping',
        data: myStarShopping,
        success: function () {
          _this.data.once = 2;
          wx.showToast({
            title: '收藏成功',
            icon: 'success',
            duration: 500
          })
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '已成功收藏，请勿重复点击',
      })
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