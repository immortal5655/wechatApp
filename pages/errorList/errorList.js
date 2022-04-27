const db = wx.cloud.database()
Page({
  data: {},
  //获取所有题目类型
  onShow() {
    const $ = db.command.aggregate
    db.collection('error').aggregate()
      .group({
        _id: '$type',
        num: $.sum(1)
      }).end().then(res => {
        console.log('题目类型', res)
        this.setData({
          list: res.list
        })
      })
  },

  //去题目列表页
  goQuestionList(e) {
    wx.navigateTo({
      url: '/pages/errorTypeList/errorTypeList?type=' + e.currentTarget.dataset.type,
    })
  },
  //去答题页重新答题
  goHome() {
    wx.switchTab({
      url: '/pages/home/home',
    })
  }

})