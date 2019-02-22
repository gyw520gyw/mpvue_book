<template>
    <div class="book-info">
        <div class="thumb">
            <image :src="info.image" mode="aspectFill" class="back-img"/>
             <image :src="info.image" mode="aspectFit" class="front-img"/>
             <div class="content">
                 <div class="title">
                    {{info.title}}
                 </div>
                 <div class="author">
                    {{info.author}}
                 </div>
             </div>
        </div>
        <div class="detail">
            <img :src="userinfo.image" class="avatar" mode="aspectFit">
            {{userinfo.nickName}}
            <div class="right text-primary-color">
                {{info.rate}}分
                <rate :value="info.rate"></rate>
            </div>
        </div>
        <div class="detail">
            {{info.publisher}}
            <div class="right">
                {{info.price}}
            </div>
        </div>
        <div class="tags">
            <div class="badge" :key="tag" v-for="tag in info.tags">{{tag}}</div>
        </div>
        <div class="summary">
            <p :key="i" v-for="(sum, i) in info.summary">{{sum}}</p>
        </div>
    </div>
</template>
<script>
import rate from './rate'
export default {
  components: {
    rate
  },
  computed: {
    userinfo () {
      return this.info.user_info || {}
    }
  },
  props: ['info']
}
</script>

<style lang="scss">

.book-info {
    .tags {
        padding: 0 8px;

        .badge {
        display: inline-block;
        margin:4px;
        padding: 2px 4px;
        border-radius: 8px;
        border: 1px #EA5149 solid;
        color: #EA5149;
        font-size: 12px;
        }
    }

    .summary {
        padding: 0 12px;
        margin-top: 12px;

        p {
            text-indent: 2em;
            font-size: 14px;
        }
    }
    

    .right {
        float: right;
    }
    .detail {
        padding: 6px 12px;
        font-size: 14px;
        .avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
            vertical-align: middle;
        }
    }

    .thumb {
        width: 750rpx;
        height: 400rpx;
        overflow: hidden;
        position: relative;
        .back-img {
            filter: blur(12px);
            width: 100%;
        }
        .front-img {
            position: absolute;
            width: 100%;
            height: 200rpx;
            left: 0;
            top: 40rpx;
        }
        .content {
            color: white;
            position: absolute;
            width: 100%;
            text-align: center;
            top: 260rpx;
            .title {
                font-size: 18px;
            }
            .author {
                font-size: 14px;
            }
        }
    }
}
</style>


