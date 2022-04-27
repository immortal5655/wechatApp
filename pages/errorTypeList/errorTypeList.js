const db = wx.cloud.database()
Page({
  onLoad(e) {
    console.log("一级题目类型", e.type)
    wx.setNavigationBarTitle({
      title: e.type + '错题',
    })
    this.setData({
      type: e.type
    })

    const $ = db.command.aggregate
    db.collection('error').aggregate()
      .match({
        type: e.type
      })
      .group({
        _id: '$type2',
        num: $.sum(1)
      }).end().then(res => {
        console.log('二级题目类型', res)
        this.setData({
          list: res.list
        })
      })
  },
  //去答题
  goDetail(e) {
    let type1 = this.data.type
    let type2 = e.currentTarget.dataset.type2

    wx.navigateTo({
      url: '/pages/errorQuestions/errorQuestions?type1=' + type1 + '&type2=' + type2,
    })
  }
})