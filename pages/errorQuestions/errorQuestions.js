const app = getApp()
const db = wx.cloud.database()
let options = null
let titles = []

Page({
  data: {
    total: 0,
    current: 0 //0代表第一个
  },
  onLoad(e) {
    options = e
    this.getData()
  },
  //获取错题数据
  getData() {
    db.collection('error').where({
        type: options.type1,
        type2: options.type2
      }).get()
      .then(res => {
        titles = res.data
        console.log("错题题库", titles)
        let subject = titles[0]
        console.log('当前错题', subject)
        this.setData({
          current: 0,
          subject,
          total: titles.length
        })
      })
  },
  //上一个错题
  pre() {
    let currentNum = this.data.current
    if (currentNum <= 0) {
      wx.showToast({
        icon: "error",
        title: '已是第一道',
      })
    } else {
      currentNum = currentNum - 1
      this.setData({
        current: currentNum,
        subject: titles[currentNum],
      })
    }
  },
  //下一个错题
  next() {
    let currentNum = this.data.current
    if (currentNum >= titles.length - 1) {
      wx.showToast({
        icon: "error",
        title: '已是最后一道',
      })
    } else {
      currentNum = currentNum + 1
      this.setData({
        current: currentNum,
        subject: titles[currentNum],
      })
    }
  },
  //删除错题
  removeError(e) {
    let id = e.currentTarget.dataset.subject._id
    db.collection('error').doc(id).remove()
      .then(res => {
        console.log('删除错题', res)
        if (res.stats && res.stats.removed > 0) {
          wx.showToast({
            title: '删除成功',
          })
          this.getData()
        } else {
          wx.showToast({
            icon: 'error',
            title: '网络不给力',
          })
        }
      })
  }
})