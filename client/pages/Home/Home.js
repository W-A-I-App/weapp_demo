Page({
  //TODO: Replace Picture and adjust ui
  data: {
    movies: [
      {
        url: './images/autoplay1.png',
        title: "autoplay1",
      },
      {
        url: './images/autoplay2.png',
        title: 'autoplay2',
      },
      {
        url: './images/autoplay3.png',
        title: 'autoplay3',
      }
    ],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1200
  },
  navigateTo: function (event) {
    console.log(event);
    var p = event.currentTarget.id;
    //TODO: Add othe work tab link
    if (p == "autoplay1") {
      wx.navigateTo({ url: './autoplay1/autoplay1' });
    }
    else if (p == "home_wb1") {
      wx.navigateTo({ url: './home_wb1/home_wb1' });
    }
  }
})
