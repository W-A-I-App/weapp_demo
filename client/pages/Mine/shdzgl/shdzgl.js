Page({
  data: {
    userInfo: {},
    userListInfo: [{
      icon: '',
      title: '',
      name: '',
      telephone: '',
      address: '',
      isdefault: ''
    }]
  },
  onLoad: function() {
    //this.select();
    //this.insert();
    //this.update();
    //this.delete();
    this.list_address();
  },

  insert: function() {//定义函数名称
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'https://gcdojwey.qcloud.la/weapp/usr_address_insert',//请求地址
      data: {//发送给后台的数据
        usr_id: "chenglei05",
        usr_name: "renchenglei4",
        contacter: "123qwe",
        telephone: "123321456",
        usr_address: "shanghaiminhang",
        first_choice: 0
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log("success");//res.data相当于ajax里面的data,为后台返回的数据
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },

  select: function () {//定义函数名称
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'https://gcdojwey.qcloud.la/weapp/usr_address_select',//请求地址
      data: {//发送给后台的数据
        usr_id: "chenglei04"
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        for (var i = 0; i < res.data.data.length; i++) {
          var icon = 'userListInfo[' + i + '].icon';
          var name = 'userListInfo[' + i + '].name';
          var phone = 'userListInfo[' + i + '].telephone';
          var address = 'userListInfo[' + i + '].address';
          var title = 'userListInfo[' + i + '].title';
          var isdefault = 'userListInfo[' + i + '].isdefault';
          var name_data = res.data.data[i].contacter;
          var phone_data = res.data.data[i].telephone;
          var title_data = res.data.data[i].id;
          var address_data = res.data.data[i].usr_address;
          if (res.data.data[i].first_choice == 1)
            var isdefault_data = 1;
          else
            var isdefault_data = 0;
          that.setData({
            [icon]: '../images/iconfont-edit.png',
            [name]: [name_data],
            [phone]: [phone_data],
            [address]: [address_data],
            [title]: [title_data],
            [isdefault]: [isdefault_data]
          })
          console.log("success");
        }
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },

  update: function (id) {//定义函数名称
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'https://gcdojwey.qcloud.la/weapp/usr_address_update',//请求地址
      data: {//发送给后台的数据
        id: id,
        first_choice: 1
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log("success");//res.data相当于ajax里面的data,为后台返回的数据
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },
  
  delete: function () {//定义函数名称
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'https://gcdojwey.qcloud.la/weapp/usr_address_delete',//请求地址
      data: {//发送给后台的数据
        id: 8,
        usr_id: "chenglei04"
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log("success");//res.data相当于ajax里面的data,为后台返回的数据
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  },

  navigateTo: function (event) {
    console.log(event);
    var p = event.currentTarget.id;
    wx.navigateTo({ url: './modify/modify?id=' + p});
  },

  set_as_default: function (event) {
    var p = event.currentTarget.id;
    this.update(p);
  },

  list_address: function (event) {
    this.select();
  },
  add_new_address: function (event) {
    wx.navigateTo({ url: './add/add'});
  }
})
