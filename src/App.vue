<template>
  <div id="app">
    <seller-header></seller-header>
    <div class="navs">
      <div class="nav">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="nav">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="nav">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
  import {mapState} from "vuex";
  import header from "components/header/header.vue";
  export default {
    name: 'App',
    computed:{
        ...mapState(["test"])
    },
    components:{
        "seller-header":header
    } ,
    async mounted(){
        const seller = await this.$axios.get("/api/seller");
        console.log(seller);
    }
  }
</script>

<style scoped lang="stylus">
  @import "./common/stylus/mixin.styl"
  #app
    .navs
      one-px(black)
      display flex
      height 40px
      .nav
        flex 1
        a
          display flex
          justify-content center
          align-items center
          width 100%
          height 100%
          font-size 14px
          color rgba(77,85,93,1)
          &.active
            color rgba(240,20,20,1)

</style>
