// pages/home/index.js
import * as echarts from '../../ec-canvas/echarts';
var util_time=require("../../utils/time.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeIndex:'map',
    predictPlaceList:['长江', '汉江', '东湖','举水'],
    predictPlaceListIndex: 0,
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
    console.log(this.data.time)

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

  },

  btHomepageChange:function(e){
    console.log(e);
    this.setData({
      homeIndex:e.currentTarget.dataset.index
    });
    //调用接口：传递homeIndex参数，返回页面所需要的数据
    if(this.data.homeIndex==='water'){
      this.setData({
        ecMainWater: {
          onInit: initChart
        },
        MainWaterX: ['周一', '周二', '周三']
      })
    }
  },

  //选择 切换地点菜单
  changePlace: function (e) {
    console.log(e)
    let chooseNav = e.currentTarget.dataset.type;
    let This = this;
    if (chooseNav != This.data.predictPlaceListIndex) {
      This.setData({
        predictPlaceListIndex: chooseNav,
      });
    }
  },
})