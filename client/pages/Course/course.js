Page({
  data: {
    courseList: [{
      id: '',
      title: '',
      url: '',
      image: ''
    }],
    courseList1: '' 
  },
  onLoad: function () {
    this.loaddata();
  },
  loaddata: function (event){
    var that = this;
    for (var i = 0; i < 2; i++) {
      var id = 'courseList[' + i + '].id';
      var title = 'courseList[' + i + '].title';
      var url = 'courseList[' + i + '].url';
      var image = 'courseList[' + i + '].image';
      var id_data = i;
      if(i == 0){
        var url_data = "./list/course1";
        var title_data = "This is a course test page 1";
        var image_data = "./image/course-1.png";
      }
      else{
        var url_data = "./list/course2";
        var title_data = "This is a course test page 2";
        var image_data = "./image/course-2.png";
      }
      that.setData({
        [id]: [id_data],
        [title]: [title_data],
        [url]: [url_data],
        [image]: [image_data]
      })
    }
  },
  onPullDownRefresh: function () {
    console.log("this help to update pulldoiwn")
    wx.navigateTo({
      url: './list/course1'
    })
  },
  // banner上图片点击
  bannerImageTap: function (e) {
    wx.navigateTo({
      url: '../detail/detail?id=' + e.target.dataset.id
    })
  }

})