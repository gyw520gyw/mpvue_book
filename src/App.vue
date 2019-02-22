<script>

export default {
  async created () {
    // 调用API从本地缓存中获取数据
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 设置登录地址
    // qcloud.setLoginUrl(config.loginUrl);
    // qcloud.login({
    //     success: function (userInfo) {
    //         console.log('登录成功', userInfo);
    //     },
    //     fail: function (err) {
    //         console.log('登录失败', err);
    //     }
    // });

    // wx.request({
    //   url: config.host + '/weapp/demo',
    //   success: function (res) {
    //     console.log(res)
    //   }
    // })

    // const res = await get('/weapp/demo')
    // console.log(123, res)

    console.log('小程序启动了')
  }
}
</script>



<style>

.page-title {
    padding-left:  20px;
    background: #eee;
    line-height: 40px;
    font-size: 16px;
}

.text-footer {
  text-align: center;
  font-size: 12px;
  padding: 8px;
}

.text-primary-color {
  color: #EA5149;
}

.btn {
  color: #fff;
  background: #EA5149;
  margin: 10px 0;
  padding-right: 15px;
  padding-left: 15px;
  border-radius: 2px;
  line-height: 40px;
  height: 40px;
  font-size: 16px;
  width: 100%;
}

.btn:active {
  background: #FF6649;
}



</style>
