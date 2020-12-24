// pages/home/index.js
import * as echarts from '../../ec-canvas/echarts';
var util_time=require("../../utils/time.js");

function setOption(chart, xdata, ydata, ymin, ymax, title) {
  console.log('max', ymax)
  console.log('min', ymin)
  let gap = (ymax - ymin).toFixed(3) / 5.0;
  gap = parseFloat(gap.toFixed(3));
  if (gap == 0) {
    gap = 0.5
    ymax = ymax + 0.5;
    ymin = ymin - 0.5;
  } else {
    ymax = parseFloat(parseFloat(ymax + gap).toFixed(3));
    ymin = parseFloat(parseFloat(ymin - gap).toFixed(3));
  }
  console.log('相差值', gap)
  console.log(ymax);
  console.log(ymin);

  const option = {
    title: {
      text: title,
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
    console.log('hhhhh我在bthome',this.data.ecX)
    console.log('ecY', this.data.ecY)
    let formateX = this.data.ecX.map((date) => {
      return date.slice(0, 10);
    })
    this.setData({
      ecX:formateX
    })
    //调用接口：传递homeIndex参数，返回页面所需要的数据
    if(this.data.homeIndex==='water'){
      this.oneComponent = this.selectComponent('.ecWater');
      let that = this;
      console.log(that.oneComponent)

      this.getOption()
    }
  },

  getData() {
    let _this=this;
    return new Promise(function (resolve, reject) {
      wx.request({
        url: 'https://www.windszzz.cn:9001/jcfxapi/getIndexData',
        method: 'GET',
        success: res => {
          console.log('获取数据成功啦！');
          console.log(res);
          _this.setData({
            ecY: res.data.ecY
          });
          console.log('hhhhhh,我在promise',_this.data.ecX);
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

  //初始化数据
  initData:function(){
    this.getData().then((res) => {
      console.log('我在initData', res);
      this.assignData(res);
    })
  },

  assignData (data) {
    console.log('hhhh我是assignData',this.data.ecX);
    let level = []
    for (let i = 0; i < data.predictLevels.length; i++) {
      if (data.predictLevels[i] === 4) {
        level[i] = '正常'
      } else if (data.predictLevels[i] === 0) {
        level[i] = '不严重'
      } else if (data.predictLevels[i] === 1) {
        level[i] = '严重'
      } else {
        level[i] = '很严重'
      }
    }

    let wlLevel = 0;
    let wtLevel = 0;
    let flowLevel = 0;

    if (data.predictWater < 700) {
      wlLevel = 0
    } else if (data.predictWater < 800) {
      wlLevel = 1
    } else {
      wlLevel = 2
    }

    if (data.predictTop < 700) {
      wtLevel = 0
    } else if (data.predictTop < 800) {
      wtLevel = 1
    } else {
      wtLevel = 2
    }

    if (data.predictFlow < 700) {
      flowLevel = 0
    } else if (data.predictTop < 800) {
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
      newsList: data.newsList,
      ecX: data.ecX,
      ecY: data.ecY,
    })

    console.log('level', this.data.levelText)
  },

  //初始化图表
  init_chart: function () {
    console.log('hhhh,我在init_chart',this.data.ecX)
    let _this = this
    _this.oneComponent.init((canvas, width, height) => {
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height,
      });
      let ydata = _this.data.ecY
      let ymax = Math.max.apply(Math, ydata);
      let ymin = Math.min.apply(Math, ydata);

      let title = '未来三天总体水位变化趋势预测';
      setOption(chart, _this.data.ecX, _this.data.ecY, ymin, ymax, title)
      _this.chart = chart;
      return chart;
    });
  },

  //给图表加上数据
  getOption: function () {
    console.log('hhhh,我在getoption',this.data.ecX)
    console.log('getOption')
    var _this = this;
    _this.init_chart()
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