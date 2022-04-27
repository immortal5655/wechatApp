const db = wx.cloud.database()
Page({
  data: {
    // 顶部轮播图
    topImgs: [
      {
        url:'/images/banner2.png',
        type:'四级词汇'
      },
      {
        url:'/images/banner1.png',
        type:'六级词汇'
      } 
    ],
  },
  //获取所有题目类型
  onLoad() {
    const $ = db.command.aggregate
    db.collection('questions').aggregate()
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
      url: '/pages/questionList/questionList?type=' + e.currentTarget.dataset.type,
    })
  },
  //随机答题
  goRandom() {
    wx.navigateTo({
      url: '/pages/questions/questions',
    })
  }

})