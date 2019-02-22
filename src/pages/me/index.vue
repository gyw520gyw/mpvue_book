<template>
  <div class="container">
    <div class="userinfo" @click='login'>
      <img :src="userinfo.avatarUrl" alt="">
      <p>{{userinfo.nickName}}</p>
      <!-- <open-data type="userAvatarUrl"></open-data> -->
      <!-- <button open-type="getUserInfo"  bindgetuserinfo="onGotUserInfo">{{userinfo.nickName}}</button>  -->
    </div>
    <yearProgress></yearProgress>
    <button v-if="userinfo.openId" @click="scanBook" class='btn'>添加图书</button>
  </div>
</template>

<script>
import yearProgress from '@/components/yearProgress'
import {showSuccess, post, showModal} from '@/util'

export default {
  components: {
    yearProgress
  },
  data () {
    return {
      userinfo: {
        avatarUrl: '../../static/img/unlogin.png',
        nickName: '点击登录'
      }
    }
  },
  methods: {
    async addBook (isbn) {
      console.log('goyw', isbn)
      const res = await post('/weapp/addbook', {
        isbn,
        openid: this.userinfo.openId
      })
      console.log('goyw456', res)
      // if(res.title) {
      showModal('添加成功', `${res.title}添加成功`)
      // }
    },
    scanBook () {
      wx.scanCode({
        success: (res) => {
          if (res.result) {
            this.addBook(res.result)
          }
        }
      })
    },
    login () {
      let user = wx.getStorageSync('userInfo')
      if (!user) {
        var userInfo = {
          openId: 'oQmbb4sNZdxaUQZ0sfYgvtOP2S7c',
          nickName: '你好2019',
          gender: 1,
          language: 'zh_CN',
          city: 'Changping',
          province: 'Beijing',
          country: 'China',
          avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIbWFEIJj8IpGeHM7dGic1aTFZALjWcMm9ltWfFiaQfVRYticWBfgGfzXWMt2EkJWiaicPtftHAlWxUibxQ/132',
          watermark: { timestamp: 1535513485, appid: 'wx5f497873ceb61c75' }
        }
        var openId = userInfo.openId
        wx.setStorageSync('userInfo', userInfo)
        wx.setStorageSync('openId', openId)

        this.userinfo = userInfo

        showSuccess('登录成功')
      }
    }
  },
  onShow () {
    let userinfo = wx.getStorageSync('userInfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  }
}
</script>

<style lang='scss'>
.container {
  padding: 0 30rpx;
}
.userinfo {
  margin-top: 100rpx;
  text-align: center;
  img{
    width: 180rpx;
    height: 180rpx;
    border-radius: 50%;
  }
}

</style>
