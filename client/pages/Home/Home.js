Page({
  //TODO: Replace Picture and adjust ui
  data: {
    swiper: [
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
    workbench: [
      {
        url: '../../images/Home/home_wb1.png',
        title: "./home_wb1/home_wb1",
      },
      {
        url: '../../images/Home/home_wb2.png',
        title: '../Course/list/course1',
      },
      {
        url: '../../images/Home/home_wb3.png',
        title: 'home_wb3',
      },
      {
        url: '../../images/Home/home_wb4.png',
        title: 'home_wb4',
      },
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
    wx.navigateTo({ url: p });
  }
})
