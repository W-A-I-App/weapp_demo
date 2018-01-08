
var app = getApp()

Page({
  data: {
    courseList: [{
      id: '',
      title: '',
      url: '',
      image: ''
    }]
  },

  onLoad: function (options) {
    this.loaddata()
  },

  loaddata: function(){
    var that = this;
    for (var i = 0; i < 2; i++) {
      var id = 'courseList[' + i + '].id';
      var title = 'courseList[' + i + '].title';
      var url = 'courseList[' + i + '].url';
      var image = 'courseList[' + i + '].image';
      var id_data = i;
      var title_data = i + 1;
      var url_data = i + 2;
      var image_data = 'aa';
      that.setData({
        id: id_data,
        title: title_data,
        url: url_data,
        image: image_data
      })
    }
    console.log("hello")
    console.log(this.data.courseList)
  },

  onPullDownRefresh: function () {
  },

  // banner上图片点击
  bannerImageTap: function (e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  }

})