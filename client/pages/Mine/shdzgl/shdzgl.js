Page({
  data: {
    logs: []
  },
  onLoad: function() {
   this.getdata();
  },
  getdata: function() {//定义函数名称
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'https://gcdojwey.qcloud.la/weapp/usr_address',//请求地址
      data: {//发送给后台的数据
        usr_id: "chenglei01",
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(res.data);//res.data相当于ajax里面的data,为后台返回的数据
        console.log(res.data.data[0].usr_name)
      　that.setData({//如果在sucess直接写this就变成了wx.request()的this了.必须为getdata函数的this,不然无法重置调用函数
          logs: res.data.data[0].usr_adress
　　　　 })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  }
})