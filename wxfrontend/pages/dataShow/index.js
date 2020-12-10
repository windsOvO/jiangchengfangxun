// pages/dataShow/index.js
var util_time = require("../../utils/time.js");
import * as echarts from '../../ec-canvas/echarts';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [
      { text: '河道水位', value: 'river' },
      { text: '湖泊水位', value: 'lake' },
      { text: '水库水位', value: 'reservoir' },
      { text: '降雨量', value: 'rainfall' },
    ],
    placeList: [
      { text: '离我最近', value: 'default' },
      { text: '汉口', value: '0161610010' },
      { text: '四合庄', value: '0161610040' },
      { text: '黄陂', value: '0161610050' },
    ],
    typeValue: 'rainfall',
    placeValue: 'default',
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
    this.onChangeType({detail:this.data.typeValue})
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

  //切换数据类型
  //将{type=e.detail,place=""}传给后端
    //需要返回placeList，数组类型，如下list；
    //需要返回默认站点代码string类型、默认站点名称string类型、横轴数据array类型（如ecX），纵轴数据array类型（如ecY所示）
    
  onChangeType (e) {
    console.log(e.detail);//数据类型
  
    let list = [
      { text: '汉口', value: '0161610010' },
      { text: '四合庄', value: '0161610040' },
      { text: '黄陂', value: '0161610050' }
      ]

    this.setData({
      placeList:list,
      placeValue: list[0].value,
      ecData: {
        onInit: this.initChart
      },
      ecX: ['周一', '周二', '周三','周四','周五'],//时间
      ecY: [18, 36, 65, 30, 78] //每个时间对应的水位
    })

  },

  //切换站点
  //将{type=this.data.typeValue,place=e.detail}传给后端,
  onChangePlace(e) {
    console.log(e.detail);//站点码
    console.log(this.data.typeValue);//数据类型
    
    this.setData({
      ecX: ['周一', '周二', '周三'],//时间
      ecY: [180, 36, 65, 30, 78], //每个时间对应的水位
      ecData: this.initChart,
    })

    console.log(this.data.ecY)
  },

  initChart: function (canvas, width, height) {
    console.log('初始化啦！')
    const chart = echarts.init(canvas, null, {
      width: width,
      height: height
    });
    canvas.setChart(chart);

    var option = {
      title: {
        text: '表格名称',
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
        data: this.data.ecX,
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
        data: this.data.ecY
      }]
    };
    chart.setOption(option);
    return chart;
  },
})