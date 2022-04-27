// pages/me/me.js
const app = getApp();
Page({
  // 页面的初始数据
  data: {
    userInfo: null,
  },
  onShow(options) {
    var user = app.globalData.userInfo;
    console.log("个人中心user", user)
    if (user && user.nickName) {
      this.setData({
        userInfo: user,
      })
    } else {
      this.setData({
        userInfo: wx.getStorageSync('user')
      })
    }
    //获取最新积分
    this.getScore()
  },
  // 获取积分
  getScore() {
    wx.cloud.database().collection('user')
      .doc(app.globalData.openid)
      .get()
      .then(res => {
        if (res && res.data && res.data.score > 0) {
          let score = res.data.score;
          console.log('刷新积分', score)
          this.setData({
            score: score
          })
        }
      })
      .catch(res => {
        console.log('获取积分失败')
      })
  },
  //获取用户信息
  getUserProfile() {
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log("获取用户信息成功", res)
        let user = res.userInfo

        app.globalData.userInfo.nickName = user.nickName;
        app.globalData.userInfo.avatarUrl = user.avatarUrl;
        app._saveUserInfo(app.globalData.userInfo);
        this.setData({
          userInfo: app.globalData.userInfo,
        })
      },
      fail: res => {
        console.log("获取用户信息失败", res)
      }
    })
  },
  //退出登录
  tuichu() {
    wx.setStorageSync('user', null)
    this.setData({
      userInfo: null,
    })
  },
  //去排行榜
  goRanking() {
    wx.navigateTo({
      url: '/pages/ranking/ranking',
    })
  },
  //去我的错题集
  goMyError() {
    wx.switchTab({
      url: '/pages/errorList/errorList'
    })
  },

  //修改个人信息
  change() {
    wx.navigateTo({
      url: '/pages/change/change',
    })
  },


})