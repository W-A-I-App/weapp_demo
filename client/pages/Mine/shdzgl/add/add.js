const App = getApp()

Page({
  data: {
    show: !0,
    form: {
      name: '',
      gender: 'male',
      tel: '',
      address: '',
      is_def: !1,
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
  onLoad() {
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
  },
  insert: function (params) {//定义函数名称
    var that = this;   // 这个地方非常重要，重置data{}里数据时候setData方法的this应为以及函数的this, 如果在下方的sucess直接写this就变成了wx.request()的this了
    var first_choice_data;
    if (params.is_def)
      first_choice_data = 1;
    else
      first_choice_data = 0;
    wx.request({
      url: 'https://gcdojwey.qcloud.la/weapp/usr_address_insert',//请求地址
      data: {//发送给后台的数据
        usr_id: "chenglei06",
        first_choice: first_choice_data,
        usr_name: "chenglei06",
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
    const params = e.detail.value
    console.log(params)
    if (!this.WxValidate.checkForm(e)) {
      const error = this.WxValidate.errorList[0]
      App.WxService.showModal({
        title: '友情提示',
        content: `${error.param} : ${error.msg}`,
        showCancel: !1,
      })
      return false
    }
    this.insert(params)
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
    App.WxService.chooseLocation()
      .then(data => {
        console.log(data)
        this.setData({
          'form.address': data.address
        })
      })
  },
})