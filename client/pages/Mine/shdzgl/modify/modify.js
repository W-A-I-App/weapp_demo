const App = getApp()

Page({
  data: {
    id: '',
    show: !0,
    form: {
      name: '',
      gender: 'male',
      tel: '',
      address: '',
      is_def: '',
    },
    radio: [
      {
        name: '先生',
        value: 'male',
        checked: !0,
      },
      {
        name: '女士',
        value: 'female',
      },
    ],
  },
  onLoad(option) {
    this.WxValidate = App.WxValidate({
      name: {
        required: true,
        minlength: 2,
        maxlength: 10,
      },
      tel: {
        required: true,
        tel: true,
      },
      address: {
        required: true,
        minlength: 2,
        maxlength: 100,
      },
    }, {
        name: {
          required: '请输入收货人姓名',
        },
        tel: {
          required: '请输入收货人电话',
        },
        address: {
          required: '请输入收货人地址',
        },
      })

    //this.address = App.HttpResource('/address/:id', { id: '@id' })
    //this.setData({
    // id: option.id
    //})
    this.address_onload(option.id);
    this.setData({
      id: option.id,
    })
  },
  onShow() {
    this.renderForm(this.data.id)
  },
  renderForm(id) {
    // App.HttpService.getAddressDetail(id)
    this.address.getAsync({ id: id })
      .then(data => {
        console.log(data)
        if (data.meta.code == 0) {
          const params = {
            name: data.data.name,
            gender: data.data.gender,
            tel: data.data.tel,
            address: data.data.address,
            is_def: data.data.is_def,
          }

          const radio = this.data.radio
          radio.forEach(n => n.checked = n.value === data.data.gender)

          this.setData({
            show: !params.is_def,
            radio: radio,
            form: params,
          })
        }
      })
  },
  update: function (id, params) {//定义函数名称
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    console.log(params)
    console.log(that.params)
    var first_choice_data;
    if (params.is_def)
      first_choice_data = 1;
    else
      first_choice_data = 0;
    console.log(first_choice_data);
    wx.request({
      url: 'https://gcdojwey.qcloud.la/weapp/usr_address_update',//请求地址
      data: {//发送给后台的数据
        id: id,
        first_choice: first_choice_data,
        usr_name: "chenglei04",
        contacter: params.name,
        telephone: params.tel,
        usr_address: params.address
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
  submitForm(e) {
    /*
     * Get input date from user
     */
    const params = e.detail.value;
    console.log(params);
    console.log(params.name);
    console.log(params.gender);
    console.log(params.tel);
    console.log(params.address);

    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      App.WxService.showModal({
        title: '友情提示',
        content: `${error.param} : ${error.msg}`,
        showCancel: !1,
      })
      return false
    }
    console.log(params)
    this.update(this.data.id, params)
    console.log("submit message");
  },
  delete: function (id) {//定义函数名称
  console.log('delete id')
  console.log(id)
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    wx.request({
      url: 'https://gcdojwey.qcloud.la/weapp/usr_address_delete',//请求地址
      data: {//发送给后台的数据
        id: id,
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
  delete_tb() {
    // App.HttpService.deleteAddress(this.data.id)
    delete (this.data.id)
    /*
    this.address.deleteAsync({ id: this.data.id })
      .then(data => {
        if (data.meta.code == 0) {
          this.showToast(data.meta.message)
        }
      })
      */
  },
  showToast(message) {
    App.WxService.showToast({
      title: message,
      icon: 'success',
      duration: 1500,
    })
      .then(() => App.WxService.navigateBack())
  },
  chooseLocation() {
    console.log("chooseLocation");
    App.WxService.chooseLocation()
      .then(data => {
        console.log(data)
        this.setData({
          'form.address': data.address
        })
      })
  },
  address_onload(id){
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    console.log(id);
    wx.request({
      url: 'https://gcdojwey.qcloud.la/weapp/usr_address_select',//请求地址
      data: {//发送给后台的数据
        id: id
      },
      header: {//请求头
        "Content-Type": "applciation/json"
      },
      method: "GET",//get为默认方法/POST
      success: function (res) {
        console.log(res);
        var name_data = res.data.data[0].contacter;
        var phone_data = res.data.data[0].telephone;
        var title_data = res.data.data[0].id;
        var address_data = res.data.data[0].usr_address;
        console.log(name_data)
        if (res.data.data[0].first_choice == 1)
          var isdefault_data = 1;
        else
          var isdefault_data = 0;
        console.log(isdefault_data)
        that.setData({
          ['form.name']: [name_data],
          ['form.tel']: [phone_data],
          ['form.address']: [address_data],
          ['form.is_def']: [isdefault_data]
        })
      },
      fail: function (err) { },//请求失败
      complete: function () { }//请求完成后执行的函数
    })
  }
})