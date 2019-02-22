<template>
    <div class="comment-list" v-if="comments.length">
        <div class="page-title" >
            评论
        </div>
        <div class="comment-info" :key="comment.id" v-for="comment in comments" @click="gotoBookDetail(comment)">
            <div class="user-info">
                <div class="inline">
                    <img :src="comment.image" class="avatar" mode="aspectFit">
                </div>
                <span>{{comment.title}}</span>
                <div class="right">
                    {{comment.location || "未知地点"}}
                    /
                    {{comment.phone || "未知型号"}}
                </div>
            </div>
            <div class="content">
                    {{comment.comment}}
                </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['comments', 'type'],
  methods: {
        gotoBookDetail(comment) {
            if(this.type === "user") {
                wx.navigateTo({
                    url: '/pages/details/main?id='+comment.bookid
                })
            }
        }
    }
}
</script>

<style lang="scss">
.comment-list {
    background: white;
    border: #eee 1px solid;
    margin: 10px 10px;
    .comment-info {
        padding: 8px 16px;
        margin-bottom: 10px;
        font-size: 12px;
        }
    }

    .content {
        margin-top: 6px;
        margin-bottom: 10px;
        margin-left: 20px;
    }

    .user-info {
        .inline {
            display: inline;
            vertical-align: middle;
        }
        .avatar {
            width: 20px;
            height: 20px;
            border-radius: 50%;
        }
        .right {
            float: right;
        }
        span {
            margin-left: 8px;
        }   
}

</style>


