// pages/dataShow/index.js
var util_time = require("../../utils/time.js");
import * as echarts from '../../ec-canvas/echarts';

function setOption(chart, xdata, ydata, ymin, ymax, title) {
  console.log('max',ymax)
  console.log('min', ymin)
  let gap = (ymax - ymin).toFixed(2) /5.0;
  gap = parseFloat(gap.toFixed(3));
  if(gap==0) {
    gap = 0.5
    ymax = ymax + 0.5;
    ymin = ymin - 0.5;
  } else {
    ymax = parseFloat(parseFloat(ymax + gap).toFixed(3));
    ymin = ymin - gap;
  }
  console.log('相差值',gap)
  console.log(ymax);
  console.log(ymin);  

  const option = {
    title: {
      text: title,
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
      data: xdata,
      axisLabel: { 
        interval: 0, 
        rotate: 40,
        fontSize: 7
      },
    },
    yAxis: {
      type: 'value',

      min: ymin,
      max: ymax,
      interval: gap,
      axisLabel: {
        fontSize: 7
      },
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
      { text: '离我最近', value: '' },
      { text: '汉口', value: '0161610010' },
      { text: '四合庄', value: '0161610040' },
      { text: '黄陂', value: '0161610050' },
    ],
    typeValue: 'lake',
    placeValue: '',
    dropdownOpen: 1,

    ecX: [],
    ecY: [], //每个时间对应的水位
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
  
  transformType (type) {
    let dataType=0;
    if (type=='lake') {
      dataType = 0;
    } else if (type == 'reservoir') {
      dataType = 1;
    } else if (type == 'river') {
      dataType = 2;
    } else if (type == 'rainfall') {
      dataType = 3;
    } else {
      dataType = 0;
    } 

    return dataType;
  },
    
  onChangeType (e) {
    console.log(e.detail);//数据类型
    let dataType = this.transformType(e.detail)

    this.getOption(dataType,null).then((res) => {
      console.log('哈哈哈异步成功啦！',res);
      console.log('ecx',this.data.ecX);
      this.setData({
        dropdownOpen: 1,
        typeValue: e.detail
      })
      this.init_chart();
      });
  },

  //切换站点
  //将{type=this.data.typeValue,place=e.detail}传给后端,
  onChangePlace (e) {

    console.log(e.detail);//站点码
    console.log(this.data.typeValue);

    let dataType = this.transformType(e.detail);
    let placeCode = e.detail;

    this.getOption(dataType, placeCode).then((res) => {
      console.log('哈哈哈异步成功啦！', res);
      console.log('ecx', this.data.ecX);
      this.setData({
        dropdownOpen: 1,
        placeValue: e.detail
      });
      this.init_chart();
    });

  },

  //初始化图表
  init_chart: function () {
    console.log('初始化图表啦！')
    let _this=this
    _this.oneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
      });
      let ydata = _this.data.ecY
      let ymax = Math.max.apply(Math, ydata);
      let ymin = Math.min.apply(Math, ydata);

      let places = this.data.placeList;
      let datas = this.data.typeList;
      let placeValue = this.data.placeValue;
      let typeValue = this.data.typeValue;
      let placeName = '';
      let dataType = '';
      places.map((item) => {
        if (item.value == placeValue) {
          placeName = item.text;
        }
      })
      datas.map(item => {
        if (item.value == typeValue) {
          dataType = item.text;
        }
      })
      console.log('数据类型', dataType);
      console.log('站点名', placeName);
      let title = '近七天'+placeName+'的'+dataType+'变化趋势图';
      setOption(chart, _this.data.ecX, _this.data.ecY, ymin, ymax, title)
      _this.chart = chart;
      return chart;
    });
  },

  //给图表加上数据
  getOption: function (dataType,placeCode) {   
    console.log("getOption!");     
    var _this = this;
    let url = '';
    if(placeCode){
      url = 'https://www.windszzz.cn:9001/jcfxapi/getDataForShow?type=' + dataType + '&place=' + placeCode;
    } else {
      url = 'https://www.windszzz.cn:9001/jcfxapi/getDataForShow?type=' + dataType + '&place=';
    }
    return new Promise(function (resolve, reject){
      wx.request({
        url: url,
        method: 'GET',
        success: res => {
          console.log('获取数据成功啦！');
          console.log(res);
          let formateX = res.data.ecX.map((date) => {
            return date.slice(0, 10);
          })
          _this.setData({
            ecX: formateX,
            ecY: res.data.ecY
          });
          if(res.data.list){
            _this.setData({
              placeList: res.data.list,
              placeValue: res.data.list[0].value
            });
          }
          let result = res.data;
          resolve(result);
        },
        fail: (res) => {
          console.log('请求异常！');
          console.log(res); 
          reject("系统异常，请重试！");
        }
      });
    });
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