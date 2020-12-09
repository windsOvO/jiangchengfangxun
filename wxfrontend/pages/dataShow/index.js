// pages/dataShow/index.js
var util_time = require("../../utils/time.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    option1: [
      { text: '离我最近', value: 0 },
      { text: '汉口', value: 1 },
      { text: '江汉', value: 2 },
      { text: '江夏', value: 3 },
      { text: '洪山', value: 4 },
    ],
    option2: [
      { text: '水位', value: 'a' },
      { text: '水势', value: 'b' },
      { text: '降雨量', value: 'c' },
    ],
    value1: 0,
    value2: 'a',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    //获取当前时间
    var TIME = util_time.formatTimeForHome(new Date());
    this.setData({
      time: TIME,
    });

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