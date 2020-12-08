// pages/home/index.js
import * as echarts from '../../ec-canvas/echarts';
var util_time=require("../../utils/time.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    homeIndex:'map',
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
          onInit: this.initChart
        },
        MainWaterX: ['周一', '周二', '周三']
      })
    }
  },

  initChart : function (canvas, width, height) {
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);

    var option = {
      title: {
        text: '总体水位数据',
        left: 'center'
      },
      color: ["#3656E6"],
      // legend: {
      //   data: ['A'],
      //   top: 'center',
      //   left: 'center',
      //   backgroundColor: 'red',
      //   z: 100
      // },
      grid: {
        containLabel: true
      },
      tooltip: {
        show: true,
        trigger: 'axis'
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.data.MainWaterX,
        // show: false
      },
      yAxis: {
        x: 'center',
        type: 'value',
        splitLine: {
          lineStyle: {
            type: 'dashed'
          }
        }
        // show: false
      },
      series: [{
        name: 'A',
        type: 'line',
        smooth: true,
        data: [18, 36, 65, 30, 78, 40, 33]
      }
      // , {
      //   name: 'B',
      //   type: 'line',
      //   smooth: true,
      //   data: [12, 50, 51, 35, 70, 30, 20]
      // }, {
      //   name: 'C',
      //   type: 'line',
      //   smooth: true,
      //   data: [10, 30, 31, 50, 40, 20, 10]
      // }
      ]
    };
    chart.setOption(option);
    return chart;
  }
})