<template>
  <div class="container">
    <commentList type="user" :comments="comments" v-if="userinfo.openId"/>
    <div class="book-list" v-if="userinfo.openId">
      <div class="page-title">
        图书
      </div>
      <card :key="book.id" v-for="book in books" :book='book'></card>
      <div v-if='!books.length'>暂时还没添加过书，快去添加几本吧!</div>
    </div>
  </div>
</template>

<script>
import commentList from '@/components/commentList'
import card from '@/components/card'
import {get} from '@/util'
export default {
  methods: {
    init() {
      wx.showNavigationBarLoading()
      this.getCommentList()
      this.getBookList()
      wx.hideNavigationBarLoading()
    },
    async getBookList () {
      const bookList = await get('/weapp/booklist', {openid : this.userinfo.openId})
      this.books = bookList.list
    },
    async getCommentList() {
      const commentList = await get('/weapp/commentlist', {openid : this.userinfo.openId})
      this.comments = commentList.list
    }
  },
  components: {
    commentList,
    card
  },
  data() {
    return {
      comments : [],
      userinfo : {},
      books: []
    }
  },
  onPullDownRefresh() {
    this.init()
    wx.stopPullDownRefresh()
  },
  onShow() {
    if(!this.userinfo.openId) {
      let info = wx.getStorageSync("userInfo")
      if(info) {
        this.userinfo = info
        this.init()
      }
    }
  }
}

</script>

<style lang="scss">
.book-list {
  margin: 10px 10px;
  border: #eee 1px solid;
}
</style>
