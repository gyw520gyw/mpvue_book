<template>
    <div class="progressbar">
        <progress :percent='percent' activeColor='#EA5149'></progress>
        <p>{{year}}年已经过去了{{days}}天 , 今年还剩{{100-percent}}% !</p>
    </div>
</template>
<script>
export default {
  methods: {
    isLeapYear () { // 是否是闰年
      const year = new Date().getFullYear()
      if (year / 400 === 0) {
        return true
      } else if (year / 4 === 0 && year / 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    getYearDays () {
      return this.isLeapYear() ? 366 : 365
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      // start是今年的第一天
      let start = new Date()
      start.setMonth(0)
      start.setDate(1)
      // 过了多少天
      let offset = new Date().getTime() - start.getTime()

      return parseInt(offset / 1000 / 60 / 60 / 24) + 1
    },
    percent () {
      return (this.days * 100 / this.getYearDays()).toFixed(0)
    }
  }
}
</script>
<style lang='scss'>
    .progressbar {
        width: 100%;
        margin-bottom: 40px;
        progress {
            margin-top: 20px;
        }
        p {
            text-align: right;
            font-size: 12px;
        }
    }
</style>

