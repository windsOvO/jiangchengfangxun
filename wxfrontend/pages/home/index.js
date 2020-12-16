// pages/home/index.js
import * as echarts from '../../ec-canvas/echarts';
var util_time=require("../../utils/time.js");

function setOption(chart, xdata, ydata) {
  const option = {
    title: {
      text: '你好呀,cl!',
      left: 'center',
      textStyle: {
        fontSize: 14,
        color: '#696969'
      },
      top: '10rpx'
    },
    color: ["#006EFF", "#67E0E3", "#9FE6B8"],
    grid: {
      show: false,
      containLable: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
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
    homeIndex:'map',
    predictPlaceList:['长江', '汉江', '东湖','举水'],
    predictPlaceListIndex: 0,
    predictData1:'',
    predictData2: '',
    predictData3: '',
    predictLevel1: 0,  //0一般，1严重，2特别严重
    predictLevel2: 0,
    predictLevel3: 0,
    levelText: ['一般', '一般', '一般'],
    waterLevel:200,
    waterTop:400,
    flow:1000,
    wlLevel: 0,//0绿色，1橘色，2红色
    wtLevel: 0,
    flowLevel:0,
    levelPic:'',
    topPic:'',
    flowPic:'',
    newsList:[],

    ecX: ['周一', '周二', '周三'],
    ecY: [18, 36, 65, 30, 78], //每个时间对应的水位
    ecData: {}


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取当前时间
    var timeForCal = util_time.formatTimeForHome(new Date());
    console.log(timeForCal)

    var predictDatas = util_time.formatTimeForPredict(new Date());
    console.log(predictDatas)
    this.setData({
      time: timeForCal,
      predictData1: predictDatas[0],
      predictData2: predictDatas[1],
      predictData3: predictDatas[2],
    })

    this.initData();

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

    wx.request({
      url: 'https://www.windszzz.cn:9001/jcfxapi/getIndexData', //你请求数据的接口地址
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      // data: {               //传的参数，这些都不用多说了吧
      //   id: xxxx
      // },
      success: function (res) {
        //我这里就假设res.xdata和res.ydata是我们需要的数据，即在x轴和y轴展示的数据，记住一定是数组哦！
        console.log('res',res)
      }
    })

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


      this.oneComponent = this.selectComponent('.ecWater');

      let that = this;
      console.log(that.oneComponent)

      this.getOption()

    }
  },

  //初始化数据
  initData:function(){
    let data={
      predictLevels: [0,1,2], //汛情等级：0一般，1严重，2特别严重
      predictWater:100, //水位
      predictTop:1000, //洪峰
      predictFlow: 520, //流量
      newsList: [//[地点、消息内容、等级]  //等级0通知，1警告,2严重警告
        ['江汉关', '水位已漫过警戒线，附近居民迅速撤离', 2], 
        ['楚河汉街', '水位上升至警戒线', 1]
        ] ,
      ecX: ['12月10日', '12月11日', '12月12日', '12月13日', '12月14日', '12月15日', '12月16日'],
      ecY:[23,56,29,90,12,56,34]
    }

    let level=[]
    for(let i =0;i<data.predictLevels.length;i++){
      if (data.predictLevels[i]===0){
        level[i]='一般'
      } else if (data.predictLevels[i] === 1) {
        level[i] = '严重'
      } else {
        level[i] = '很严重'
      } 
    }

    let wlLevel = 0;
    let wtLevel = 0;
    let flowLevel = 0;
    
    if(data.predictWater<400){
      wlLevel = 0
    } else if (data.predictWater < 1000){
      wlLevel = 1
    } else {
      wlLevel = 2
    }

    if (data.predictTop < 400) {
      wtLevel = 0
    } else if (data.predictTop < 1000) {
      wtLevel = 1
    } else {
      wtLevel = 2
    }

    if (data.predictFlow < 400) {
      flowLevel = 0
    } else if (data.predictTop < 1000) {
      flowLevel = 1
    } else {
      flowLevel = 2
    }

    this.setData({
      predictLevel1: data.predictLevels[0],
      predictLevel2: data.predictLevels[1],
      predictLevel3: data.predictLevels[2],
      levelText: level,
      waterLevel: data.predictWater,
      waterTop: data.predictTop,
      flow: data.predictFlow,
      wlLevel: wlLevel,
      wtLevel: wtLevel,
      flowLevel: flowLevel,
      newsList:data.newsList,
      ecX: data.ecX,
      ecY: data.ecY, 
    })

    console.log(this.data.levelText)

  },

  //初始化图表
  init_chart: function (xdata, ydata) {
    let _this = this
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
    console.log('getOption')
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