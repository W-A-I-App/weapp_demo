var app = getApp()
Page({
  data: {
    userInfo: {},
    userListInfo: [{
      icon: '../../images/Mine/wddd.png',
      text: '我的订单',
      isunread: true,
      unreadNum: 2
    }, {
      icon: '../../images/Mine/wddjq.png',
      text: '我的代金券',
      isunread: false,
      unreadNum: 2
    }, {
      icon: '../../images/Mine/gwc.png',
      text: '购物车',
      isunread: true,
      unreadNum: 1
    }, {
      icon: '../../images/Mine/shdzgl.png',
      text: '收货地址管理'
    }, {
      icon: '../../images/Mine/lxkf.png',
      text: '联系客服'
    }, {
      icon: '../../images/Mine/cjwt.png',
      text: '常见问题'
    }]
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})