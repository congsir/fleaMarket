// pages/publishGoods/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      casArray:['生活娱乐','出行工具','图书教材','数码设备','VIP卡转移','小电器'],
      casIndex:0,
      casIndexSecond:0,
      select: ['衣服', '鞋子', '运动', '娱乐'],
      imgList:[

      ],
      selectArr : {
      life: ['衣服', '鞋子', '运动','娱乐'],
      travelTools: ['自行车', '电动车'],
      books: ['考研书籍', '课外读物', '专业书籍', '课本书籍'],
      digitalDevice: ['笔记本电脑', '电脑主机', '手机', '平板电脑', '摄影器材', '显示设备', '鼠标', '键盘', '移动电源', 'U盘', '其它'],
      VIPcards: ['网络课程', '健身vip', '台球厅vip', '发廊vip', '其它'],
      smallDigitals: ['台灯', '吹风机', '小风扇', '洗衣机', '小饭锅', '其它']
    },
     display:'block',
     goodsName:'',
     goodsDespriction:'',
     goodsPrice:'',
     tradePlace:'',
     phoneNumber:'',
     qqNumber:'',
     once:1,
      
  },

  /**
   * 生命周期函数--监听页面加载
   * 在信息录入部分，中间的选择分类功能是实现了通过选择一级分类，然后会自带更改二级分类的选项，方便了用户的选择操作。实现这个功能，这里我采用了微信自带的原生组件--- picker，picker是从底部弹起的滚动选择器，支持五种形式，通过mode来区分，分别为普通、多列、时间、日期、省市区等。这里采用了普通选择器的类型。通过绑定bindCasPickerChange函数来监听用户选择的类型，传递到页面对一级分类进行渲染，同时根据一级分类给出二级分类的类型数组，供用户进行二次分类的选择。
   * 
   * 在发布按钮上绑定事件，点击发布就会将上述表格内的数据保存在数据库中，为了防止用户的错误操作，减少对数据库的操作请求，设置了一个变量，默认为1，当用户输入了所有的数据后，会将变量变为2，然后才会操作数据库，而操作数据库后又将数据变为3，用户无法进行重复发布商品，这里可以防止用户错误操作造成影响。并且，在用户进行发布任务时，会调用getTime()函数，这个函数会生成其发布商品那一刻相对1970年1月1日的毫秒数，可以用来对商品进行唯一标识。同时还会调用一系列时间函数，生成商品发布的具体时间，一并存入商品的数据之中。
   * 
   * 在下面的填写用户手机号码的区域，为了防止用户的错误、无效输入，我对其输入的内容进行了简单的判断，若用户输入并非为11位数字号码，系统将弹出提示框，提示用户应该进行正确的输入。
   */

  bindCasPickerChange:function(e){
      var _this = this;
      this.setData({
        casIndex:e.detail.value,
        casIndexSecond: 0
      })
      if(e.detail.value == 0){
        this.setData({
          select:_this.data.selectArr.life
        })
      }else if (e.detail.value == 1) {
        this.setData({
          select: _this.data.selectArr.travelTools
        })
      }else if (e.detail.value == 2) {
        this.setData({
          select: _this.data.selectArr.books
        })
      }else if (e.detail.value == 3) {
        this.setData({
          select: _this.data.selectArr.digitalDevice
        })
      }else if (e.detail.value == 4) {
        this.setData({
          select: _this.data.selectArr.VIPcards
        })
      }else if (e.detail.value == 5) {
        this.setData({
          select: _this.data.selectArr.smallDigitals
        })
      }
  },
  bindCasPickerChangeSecond: function (e) {
    this.setData({
      casIndexSecond: e.detail.value
    })
  },
  // 图片上传函数
  chooseimage: function () {
    var _this = this;
    var len = _this.data.imgList.length;
    wx.chooseImage({
      count: 4, // 默认9  
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有  
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有  
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片  
        _this.setData({
          imgList: res.tempFilePaths
        })
        if (_this.data.imgList.length == 4){
          _this.setData({
            display:'none'
          })
        }
      }
    })
  } ,
  goodsName:function(e){
    this.setData({
      goodsName:e.detail.value
    })
  },
  goodsDespriction: function (e) {
    this.setData({
      goodsDespriction: e.detail.value
    })
  },
  goodsPrice: function (e) {
    this.setData({
      goodsPrice: e.detail.value
    })
  },
  tradePlace: function (e) {
    this.setData({
      tradePlace: e.detail.value
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
 
  publish:function(){

    var mydate = new Date();
    var timeStamp = mydate.getTime();
    var month = mydate.getMonth() + 1;
    var publishTime = mydate.getFullYear() + '/' + month + '/' + mydate.getDate() + ' ' + mydate.getHours() + ':' + mydate.getMinutes() + ':' + mydate.getSeconds();
    if (this.data.once == 1) {
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
      var casIndex = this.data.casIndex;
      var casIndexSecond = this.data.casIndexSecond;
      var obj = {
        imgList: this.data.imgList,
        goodsName: this.data.goodsName,
        goodsDespriction: this.data.goodsDespriction,
        goodsPrice: this.data.goodsPrice,
        tradePlace: this.data.tradePlace,
        phoneNumber: this.data.phoneNumber,
        qqNumber: this.data.qqNumber,
        firstClassify: this.data.casArray[this.data.casIndex],
        secondClassify: this.data.select[this.data.casIndexSecond],
        timeStamp:timeStamp,
        publishTime:publishTime,
        browseTime:0,
      }
      var hotGoods = wx.getStorageSync('hotGoods') || [];
      hotGoods.push(obj);
      wx.setStorageSync('hotGoods', hotGoods);

      var myPublishGoods = wx.getStorageSync('myPublishGoods') || [];
      myPublishGoods.push(obj);
      wx.setStorageSync('myPublishGoods', myPublishGoods);

      var name = 'goods_' + obj.secondClassify;
      var thisArr = wx.getStorageSync(name) || [];
      thisArr.push(obj);
      wx.setStorage({
        key: name,
        data: thisArr,
        success:function(){
          wx.showToast({
            title: '发布成功',
            icon: 'success',
            duration: 2000
          })
          setTimeout(function () {
            wx.navigateTo({
              url: '../myGoods/index',
            })
          }, 2000)
        }
      })
      this.data.once = 3;
    }
    

  },
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