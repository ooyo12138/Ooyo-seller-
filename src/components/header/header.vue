<template>
    <div class="seller_header">
        <div class="top">
            <div class="top_left">
                <img class="avatar"
                     src="https://fuss10.elemecdn.com/8/40/02872ce8aefe75c16d3190e75ad61jpeg.jpeg">
            </div>
            <div class="top_right">
                <div class="title">
                    <i class="brand"></i>
                    <span class="name">茄子哥(方舟园)</span>
                </div>
                <div class="delivery">
                    <span class="info">蜂鸟专送/38分钟送达</span>
                </div>
                <div class="supports">
                    <i class="icon"></i>
                    <span class="text">在线支付满25送25</span>
                </div>
            </div>
        </div>
        <div class="bottom"></div>
    </div>
</template>

<script>
    export default {
        name: "seller-header"
    }
</script>

<style scoped lang="stylus">
    @import "../../common/stylus/mixin.styl"
    .seller_header
        background rgba(7,17,27,.5)
        .top
            padding 24px 12px 18px 24px
            display flex
            .top_left
                width 64px
                height 64px
                margin-right 16px
                .avatar
                    width 100%
                    height 100%
            .top_right
                color rgba(255,255,255,1)
                .title
                    display flex
                    align-items center
                    font-size 16px
                    font-weight bold
                    line-height 18px
                    margin-top 2px
                    margin-bottom 8px
                    .brand
                        bg-image(brand)
                        background-repeat no-repeat
                        background-size 100%
                        display inline-block
                        width 30px
                        height 18px
                    .name
                        margin-left 6px
                .delivery
                    font-size 12px
                    font-weight 200
                    line-height 12px
                    .info
                        zoom 1
                .supports
                    display flex
                    align-items center
                    font-size 10px
                    font-weight 200
                    line-height 12px
                    margin-top 10px
                    margin-bottom 2px
                    .icon
                        bg-image(decrease_1)
                        background-repeat no-repeat
                        background-size 100%
                        display inline-block
                        width 12px
                        height 12px
                    .text
                        margin-left 4px

</style>