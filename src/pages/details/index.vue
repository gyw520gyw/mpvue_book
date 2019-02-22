<template>
  <div>
    <bookInfo :info="this.info"></bookInfo>
    <commentList :comments="this.comments" ></commentList>
    <div class="comment" v-if="showAdd">
      <textarea v-model="comment" class="textarea" :maxlength="100" lens
      placeholder="请输入图书短评"></textarea>
      <div class="location">
        地理位置
        <switch color="#EA5149" @change="getGeo" />
        <span>{{location}}</span>
      </div>
      <div class="phone-model">
        手机型号
        <switch color="#EA5149" @change="getPhoneModel" />
        <span>{{phoneModel}}</span>
      </div>
      <div class="btn-comment">
        <button class="btn" @click="addComment">评论</button>
      </div>
    </div>
    <div v-else class="text-footer">
      未登录或者已经评论过啦
    </div>
    <div class="share">
      <button open-type='share' class="btn">转发给好友</button>
    </div>
    
  </div>
</template>

<script>
import {get, post, showToast} from '@/util'
import bookInfo from '@/components/bookInfo'
import commentList from '@/components/commentList'
export default {
  components: {
    bookInfo,
    commentList
  },
  computed: {
    showAdd () {
      if (!this.userinfo.openId) { // 没登录
        return false
      }
      // 评论列表中有自己的评论
      if (this.comments.filter(v => v.openid === this.userinfo.openId).length) {
        return false
      }
      return true
    }
  },
  data () {
    return {
      bookid: '',
      info: {},
      phoneModel: '',
      location: '',
      userinfo: {},
      comment: '',
      comments: []
    }
  },
  methods: {

    async getCommentList () {
      const commentList = await get('/weapp/commentlist', {bookid: this.bookid})
      this.comments = commentList.list || []
    },

    async addComment () {
      if (!this.comment) {
        showToast('请输入评论')
        return
      }
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookid,
        comment: this.comment,
        phone: this.phoneModel,
        location: this.location
      }
      try {
        await post('/weapp/addcomment', data)
        this.comment = ''
        this.getCommentList()
      } catch (error) {
        showToast('失败' + error.msg)
      }

      // console.log(res)
    },
    getGeo (e) {
      // 0GgFk99I6CEAlwUtevZvopCf3Kreoiaa
      if (e.target.value) {
        wx.getLocation({
          type: 'wgs84',
          success: res => {
            // console.log(res);
            this.getCityInfo(res)
          }
        })
      } else {
        this.location = ''
      }
    },
    getCityInfo (res) {
      const url = 'http://api.map.baidu.com/geocoder/v2/'
      wx.request({
        data: {
          output: 'json',
          ak: '0GgFk99I6CEAlwUtevZvopCf3Kreoiaa',
          location: `${res.latitude}, ${res.longitude}`
        },
        method: 'GET',
        url: url,
        success: res => {
          if (res.data.status === 0) {
            this.location = res.data.result.addressComponent.city
          } else {
            this.location = '未知地点'
          }
          // console.log('goyw', res)
        }
      })
    },
    getPhoneModel (e) {
      if (e.target.value) {
        const phoneInfo = wx.getSystemInfoSync()
        // console.log(phoneInfo)
        this.phoneModel = phoneInfo.model
      } else {
        // 没选中
        this.phoneModel = ''
      }
    },
    async getBookDetails () {
      const info = await get('/weapp/bookdetail', {id: this.bookid})
      this.info = info
      wx.setNavigationBarTitle({
        title: info.title
      })
    }
  },
  mounted () {
    this.bookid = this.$root.$mp.query.id
    this.getBookDetails()
    const userinfo = wx.getStorageSync('userInfo')
    if (userinfo) {
      this.userinfo = userinfo
    }

    this.getCommentList()
  }
}
</script>

<style lang="scss">
.btn-comment {
  margin: 0 12px;
}
.comment {
  margin-top: 10px;
  font-size: 16px;
  .textarea {
    width: 690rpx;
    padding: 10rpx;
    margin: 10rpx 20rpx;
    background-color: #ece3e3;
  }
  .location {
    margin-top: 10px;
    padding: 0 12px;
    
  }
  .phone-model {
    margin:10px 0px;
    padding: 0 12px;
  }
  span {
    margin-left: 20px;
    font-size: 14px;
    color: #EA5149;
  }

}
.share {
  margin: 0px 10px;
}
</style>
