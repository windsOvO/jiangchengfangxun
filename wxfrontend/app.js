//app.js
App({
  globalData: {
    navBarHeight: 0, // 导航栏高度
    statusBarHeight: 0, // 状态栏高度
    menuButtonTop: 0 // 胶囊距上距离
  },
  onLaunch: function () {
    this.setNavBarInfo()
  },
  setNavBarInfo: function () {
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 可使用窗口高度，单位px
    this.globalData.windowHeight = systemInfo.windowHeight;
    // 状态栏高度
    this.globalData.statusBarHeight = systemInfo.statusBarHeight;
    // 胶囊距上距离
    this.globalData.menuButtonTop = menuButtonInfo.top;
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    this.globalData.navBarHeight =
      (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 +
      menuButtonInfo.height + systemInfo.statusBarHeight;
  }
})