<template>
  <div>
    <banner :banners='banners'></banner>
    <card :key='book.id' v-for="book in books" :book='book'></card>
    <p class="text-footer" v-if="!more">
      没有更多数据
    </p>
  </div>
</template>

<script>
  import {get} from '@/util'
  import card from '@/components/card'
  import banner from '@/components/banner'
  export default {
    components: {
      card,
      banner
    },
    data () {
      return {
        books: [],
        page: 0,
        more: true,
        banners: []
      }
    },
    methods: {
      async getTopBanner () {
        const tops = await get('/weapp/top')
        this.banners = tops.list
      },
      async getBookList (flag) {
        wx.showNavigationBarLoading()

        const books = await get('/weapp/booklist', {page: this.page})
        // this.books = books.list
        if (books.list.length < 5 && this.page > 0) {
          this.more = false
        }

        if (flag) {
          this.books = books.list
          wx.stopPullDownRefresh()
        } else { // 上拉加载更多
          this.books = this.books.concat(books.list)
        }

        // console.log('goyw', this.books)
        wx.hideNavigationBarLoading()
      }
    },
    onPullDownRefresh () {
      // console.log('下来刷新')
      this.page = 0
      this.more = true
      this.getBookList(true)
      this.getTopBanner()
    },
    onReachBottom () {
      // console.log(this.more)
      if (!this.more) {
        return false
      }
      this.page = this.page + 1
      this.getBookList(false)
    },
    mounted () {
      this.getBookList(true)
      this.getTopBanner()
    }
  }
</script>

<style>

</style>
