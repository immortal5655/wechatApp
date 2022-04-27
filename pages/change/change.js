const app = getApp()
const DB = wx.cloud.database().collection('user')
let openid = ''
Page({
  data: {
    user: null
  },
  onLoad(option) {
    console.log('修改页openid', app.globalData.openid)
    openid = app.globalData.openid
    this.getUserInfo()
  },
  //获取用户信息
  getUserInfo() {
    DB.doc(openid).get()
      .then(res => {
        console.log('获取用户信息成功', res)
        this.setData({
          user: res.data
        })
      })
      .catch(res => {
        wx.showToast({
          icon: 'error',
          title: '还未注册用户',
        })
        console.log('获取用户信息失败')
        this.setData({
          user: null
        })
      })
  },
  //提交修改
  formSubmit(e) {
    let user = e.detail.value
    console.log(user)
    if (!user.name) {
      wx.showToast({
        icon: 'none',
        title: '请填写姓名',
      })
    } else if (!user.age) {
      wx.showToast({
        icon: 'none',
        title: '请填写年龄',
      })
    } else if (!user.phone) {
      wx.showToast({
        icon: 'none',
        title: '请填写电话',
      })
    } else { //所有内容都不为空，才提交数据
      if (this.data.user && this.data.user.name) { //已经添加过，就做修改操作
        DB.doc(openid).update({
          data: {
            name: user.name,
            age: user.age,
            phone: user.phone,
            nickName: app.globalData.userInfo.nickName,
            avatarUrl: app.globalData.userInfo.avatarUrl
          }
        }).then(res => {
          this.savaStudent(user)
          wx.showToast({
            title: '添加成功',
          })
        })
      } else { //没有添加过，做add操作
        DB.add({
          data: {
            _id: openid,
            name: user.name,
            age: user.age,
            phone: user.phone,
            nickName: app.globalData.userInfo.nickName,
            avatarUrl: app.globalData.userInfo.avatarUrl,
            score: 0
          }
        }).then(res => {
          this.savaStudent(user)
          wx.showToast({
            title: '修改成功',
          })
        })
      }
    }
  },
  savaStudent(user) {
    app.globalData.userInfo.name = user.name;
    app.globalData.userInfo.xuehao = user.xuehao;
    app.globalData.userInfo.kahao = user.kahao;
    app.globalData.userInfo.yuanxi = user.yuanxi;
    app._saveUserInfo(app.globalData.userInfo);
  }
})