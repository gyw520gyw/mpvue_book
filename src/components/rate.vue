<template>
    <div class="rate">
        <span>☆☆☆☆☆</span>
        <div class="hollow" :style="style">
            ★★★★★
        </div>
    </div>
</template>
<script>
export default {
  props: {
    value: {type: [Number, String], defalut: '0'}
  },
  computed: {
    style () {
      // console.log('value', this.value, this.value / 2)
      return `width: ${this.value / 2}em`
    }
  }
}
</script>
<style lang="scss">
.rate {
    position: relative;
    display: inline-block;
    .hollow {
        position: absolute;
        display: inline-block;
        height: 20px;
        top: 0;
        left: 0;
        width: 0;
        overflow: hidden;
    }
}
</style>


