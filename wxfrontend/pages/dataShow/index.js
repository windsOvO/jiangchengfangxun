// pages/dataShow/index.js
var util_time = require("../../utils/time.js");
import * as echarts from '../../ec-canvas/echarts';

function setOption(chart, xdata, ydata) {
  const option = {
    title: {
      text: '你好呀,cl!',
      left:'center',
      textStyle: {
        fontSize: 14,
        color: '#696969'
      },
      top: '10rpx'
    },
    color: ["#006EFF", "#67E0E3", "#9FE6B8"],
    grid: {
      show: false,
      containLable:true
    },
    xAxis: {
      type: 'category',
      boundaryGap:false,
      data: xdata,      //动态参数来
      // axisLabel: {
      //   interval: 5,   //x轴间隔多少显示刻度
      //   formatter: function (value) {   //显示时间
      //     var date = new Date(value * 1000);
      //     var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
      //     var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
      //     return h + m
      //   },
      //   fontSize: 8
      // }
    },
    yAxis: {
      x: 'center',
      type: 'value',
      // axisLabel: {
      //   formatter: function (value) {
      //     var val = value / 1000000000 + 'G';
      //     return val
      //   }
      // }
    },
    series: [{
      type: 'line',
      data: ydata,    //y轴上的数据也是动态的，也作为参数传进来
      smooth: true,
      lineStyle: {
        width: 1
      }
    }]
  };
  chart.setOption(option)
}

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
    dropdownOpen: 1,

    ecX: ['周一', '周二', '周三'],
    ecY: [18, 36, 65, 30, 78], //每个时间对应的水位
    ecData: {}

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
    this.oneComponent = this.selectComponent('#mychart-dom-line');

    this.onChangeType({detail:this.data.typeValue})
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
      ecX: ['周一', '周二', '周三','周四'],//时间
      ecY: [18, 36, 65, 30, 78], //每个时间对应的水位
      dropdownOpen:1
    })

    this.getOption()
  },

  //切换站点
  //将{type=this.data.typeValue,place=e.detail}传给后端,
  onChangePlace (e) {

    console.log(e.detail);//站点码
    console.log(this.data.typeValue);
    
    this.setData({
      ecX : ['周一', '周二', '周三'],
      ecY : [18, 36, 65, 30, 78], //每个时间对应的水位
      dropdownOpen:1
    })

    this.getOption()

  },

  //初始化图表
  init_chart: function (xdata, ydata) {
    let _this=this
    _this.oneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
      });
      setOption(chart, xdata, ydata)
      _this.chart = chart;
      return chart;
    });
  },

  //给图表加上数据
  getOption: function () {        
    var _this = this;
    // wx.request({
    //   url: 'https://xxxxxxx.com',    //你请求数据的接口地址
    //   method: 'POST',
    //   header: {
    //     "Content-Type": "application/json"
    //   },
    //   data: {               //传的参数，这些都不用多说了吧
    //     id: xxxx
    //   },
    //   success: function (res) {
    //     //我这里就假设res.xdata和res.ydata是我们需要的数据，即在x轴和y轴展示的数据，记住一定是数组哦！
    //     _this.init_chart(res.xdata, res.ydata)
    //   }
    // })
    // let ecX= ['周一', '周二', '周三']
    // let ecY=[18, 36, 65, 30, 78]//每个时间对应的水位

    _this.init_chart(_this.data.ecX, _this.data.ecY)
  },

  onOpenMenu(e){
    this.setData({
      dropdownOpen: 0
    })
  },

  onCloseMenu(e) {
    this.setData({
      dropdownOpen: 1
    })
  },
  
})