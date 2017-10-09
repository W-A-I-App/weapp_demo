var app = getApp()
Page({
  data: {
    userInfo: {},
    userListInfo: [{
      icon: '../../images/Mine/wddd.png',
      title: 'wddd',
      text: '我的订单',
      isunread: true,
      unreadNum: 2
    }, {
      icon: '../../images/Mine/wddjq.png',
      title: 'wddjq',
      text: '我的代金券',
      isunread: false,
      unreadNum: 2
    }, {
      icon: '../../images/Mine/gwc.png',
      title: 'gwc',
      text: '购物车',
      isunread: true,
      unreadNum: 1
    }, {
      icon: '../../images/Mine/shdzgl.png',
      title: 'shdzgl',
      text: '收货地址管理'
    }, {
      icon: '../../images/Mine/lxkf.png',
      title: 'lxkf',
      text: '联系客服'
    }, {
      icon: '../../images/Mine/cjwt.png',
      title: 'cjwt',
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
  },
  navigateTo: function (event) {
    console.log(event);
    var p = event.currentTarget.id;
    //TODO: Add othe work tab link
    if (p == "wddd") {
      wx.navigateTo({ url: './wddd/wddd' });
    }
    else if (p == "wddjq") {
      wx.navigateTo({ url: './wddjq/wddjq' });
    }
    else if (p == "shdzgl") {
      wx.navigateTo({ url: './shdzgl/shdzgl' });
    }
  }
})