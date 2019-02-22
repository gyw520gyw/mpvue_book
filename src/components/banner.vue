<template>
    <div class="swiper">
        <swiper :indicator-dots="true" 
            indicator-color="#EA5149"
            :autoplay="true"
            :interval="5000"
            :duration="1000"
            :circular="true">
            <div :key="top.id" v-for="top in banners">
                <swiper-item>
                    <image :src="top.image"  class="slide-image" mode="aspectFill" @click='bookDetail(top)' />
                </swiper-item>
            </div>
        </swiper>
    </div>
</template>

<script>
export default {
  methods: {
    bookDetail (item) {
      // console.log("item", item.id)
      wx.navigateTo({
        url: '/pages/details/main?id=' + item.id
      })
    }
  },
  props: ['banners']
}
</script>

<style>
.slide-image {
    width: 100%;
    height: 150px;
}
</style>


