//index.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      '../../images/showShopping03.png',
      '../../images/showShopping02.png',
      '../../images/showShopping01.png',
      '../../images/showShopping04.png',
      '../../images/showShopping05.png',
    ],
    indicatorDots: true,
    autoplay: true,
    interval: 3000,
    duration: 400,
    circular: true,
    color: "orange",
    goodsList:[],
    goodsListInit: [
      {
        imgList:['../../images/showShopping01.png'],
        goodsDespriction:'新款手机壳，外表酷炫，美观大方,而且9成新，吐血打甩卖',
        goodsPrice:'55',
        goodsName:'手机壳',
        tradePlace:'华科',
        phoneNumber:'13554662352',
        qqNumber:'894719813',
        firstClassify:'',
        secondClassify:'',
        publishTime:'2018/3/20',
        browseTime:10
      },
      {
        imgList: ['../../images/showShopping02.png'],
        goodsDespriction: '美丽配饰，很好的装饰品',
        goodsPrice: '56',
        goodsName: '配饰',
        tradePlace: '华科',
        phoneNumber: '13554662352',
        qqNumber: '894719813',
        firstClassify: '',
        secondClassify: '',
        publishTime: '2018/3/21',
        browseTime: 15
      },
      {
        imgList: ['../../images/showShopping03.png'],
        goodsDespriction: '可爱的小狗玩偶，萌你一脸',
        goodsPrice: '47',
        goodsName: '玩具娃娃',
        tradePlace: '华科',
        phoneNumber: '13554662352',
        qqNumber: '894719813',
        firstClassify: '',
        secondClassify: '',
        publishTime: '2018/3/22',
        browseTime: 30
      },
      {
        imgList: ['../../images/showShopping04.png'],
        goodsDespriction: '新款ipaid壳，外表酷炫，美观大方,而且9成新，吐血打甩卖',
        goodsPrice: '55',
        goodsName: 'ipaid外壳',
        tradePlace: '华科',
        phoneNumber: '13554662352',
        qqNumber: '894719813',
        firstClassify: '',
        secondClassify: '',
        publishTime: '2018/3/23',
        browseTime: 60
      }
    ]
  },

  // 函数点击跳转到商品展示页
  /**
   * 通过在组件上使用wx:for控制属性绑定一个数组，使用数组中的各项数据重复渲染该组件。微信小程序的框架是通过数据绑定的形式将js逻辑层中的数据渲染在视图层。所以我在index.js文件中定义一个数组goodsList作为热门商品中的商品列表数据存储容器，在初始定义中该数组为空。在程序的加载过程中，页面生命周期依次经过onLoad(页面加载)、onShow(页面显示)、onReady(页面初次渲染完成)。由于onLoad只有在页面初次加载时才会执行，而onShow在页面每次显示时都会执行，所以我定义了french()函数，一旦执行该函数，便会从数据库中请求热门商品的数据，然后将数据赋值给页面数据数组goodsList。每次页面执行onShow(页面显示)函数时都会执行french()函数，也就是说每次页面展示，都会将最新的热门商品数据渲染到热门商品这里来。同时，由于页面执行懒加载形式，当数据过多时，项目并不会将所有的项目全部渲染出来，因此我还开通了此页面的下拉刷新函数，当用户下拉触底时，便会执行该函数，在该函数内部执行french()函数，新的数据就会继续进行渲染，可以在满足系统性能的基础上，让用户获得较好的用户体验。
   */

  tapNavgate:function(e){
    wx.setStorage({
      key: 'goodsDetail',
      data: e.currentTarget.dataset.item,
    })
    wx.navigateTo({
      url: '../goodsDetail/index',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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
  french:function(){
    let _this = this;
    var hotGoods = wx.getStorageSync('hotGoods');
    if(!hotGoods){
      wx.setStorageSync('hotGoods', this.data.goodsListInit);
      hotGoods = wx.getStorageSync('hotGoods');
    }
    
    this.setData({
      goodsList: hotGoods,
    })
  },
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
      this.french();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    this.french();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})