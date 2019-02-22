<template>
  <a :href="detailUrl">
    <div class="book-card">
      <div class="thumb">
        <img :src="book.image" mode='aspectFit' class="image">
      </div>
      <div class="book-detail">
        <div class="card-row text-primary-color title-style ">
          <div class="card-right">{{book.rate}} <rate :value="book.rate"></rate></div>
          <div class="card-left">{{book.title}}</div>
        </div>
        <div class="card-row desc-style">
          <div class="card-right">浏览量: {{book.count}}</div>
          <div class="card-left">作者: {{book.author}}</div>
        </div>
        <div class="card-row desc-style">
          <div class="card-right">添加人: {{book.user_info.nickName}}</div>
          <div class="card-left">{{book.publisher}}</div>
        </div> 
      </div>
    </div>
  </a>
  
</template>

<script>
import rate from './rate'
export default {
  methods: {
    preview () {
      console.log('preview.....', this.book.image)
      wx.previewImage({
        current: this.book.image,
        urls: [this.book.image]
      })
    }
  },
  components: {
    rate
  },
  computed: {
    detailUrl () {
      return '/pages/details/main?id=' + this.book.id
    }
  },
  props: ['book']

}
</script>

<style lang='scss' scoped>
.book-card {
  padding: 6px;
  overflow: hidden;
  margin-bottom: 6px;
  margin-top: 4px;
  .thumb {
    width: 90px;
    height: 90px;
    float: left;
    margin: 0 auto;
    overflow: hidden;
    .image {
      max-width: 100%;
      max-height: 100%;
    }
  }

  .book-detail {
    margin-left: 100px;
    margin-top: 2px;
    .card-row {
      line-height: 20px;
    }
    .card-right {
      float: right;
      margin-right: 10px;
    }
    .card-left {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      margin-right: 100px;
    }
  }

  .title-style {
    font-size: 16px;
    margin-bottom: 12px;
  }
  .desc-style {
    font-size: 12px;
  }
 
}
</style>
