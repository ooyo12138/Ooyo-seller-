<template>
    <div class="goodsWrap">
        <div class="goods">
            <div class="left" ref="left">
                <ul class="typeList" ref="typeList">
                    <li class="typeItem" :class="{active:currentIndex === index}"
                        v-for="(good,index) in goods" :key="index" @click="leftToRight(index)">
                        <seller-icon class="icon" size="3"
                          v-show="good.type >= 0"  :type="good.type"></seller-icon>
                        <span class="name">{{good.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="right" ref="right">
                <ul class="classList" ref="classList">
                    <li class="classItem" v-for="(good,index) in goods" :key="index">
                        <h2 class="title">{{good.name}}</h2>
                        <ul class="foodList">
                            <li class="foodItem" v-for="(food,index) in good.foods" :key="index">
                                <seller-food :food="food"></seller-food>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <seller-cart @clear="clear" class="cartWrap"
                :selectedFoods="selectedFoods"></seller-cart>
    </div>
</template>

<script>
    import {GETSELLER,GETSGOODS,GETRATINGS} from "store/mutation_types.js";
    import {mapState,mapActions} from "vuex";
    import BScroll from 'better-scroll'
    import food from "components/food/food"
    import cart from "components/cart/cart"
    export default {
        name: "goods",
        data(){
            return {
                scrollY:0,//需要当前右侧列表滑动的实时距离 : scrollY
                heightArr:[]//需要所有右侧分类项高度组成的一个累加数组 : heightArr
            }
        },
        computed:{
            ...mapState(["goods","iconTypes"]),
            //代表我们当前滑在哪一个列表上
            currentIndex(){
                //根据右侧的滑屏情况来决定当前应该返回怎样的下标
                //需要当前右侧列表滑动的实时距离 : scrollY
                //需要所有右侧分类项高度组成的一个累加数组 : heightArr
                var index = 0;
                index = this.heightArr.findIndex((item,index,arr)=>{
                    return (this.scrollY >= item && this.scrollY < arr[index+1])
                })


                if(index !== this.oldIndex){
                    //以下两行代码 应该在index产生改变时在执行
                    this.oldIndex = index
                    //选中的那个分类项 要尽量的出现在最顶部
                    let typeLiNodes = this.$refs.typeList && this.$refs.typeList.children;
                    //尽量的让typeLiNodes[index] 出现在滑屏区域的最顶部
                    this.leftScroll && this.leftScroll.scrollToElement(typeLiNodes[index],300)
                }


                //让对应的左侧分类项选中
                return index
            },
            //购物车组件需要的数据(选中的商品数组)
            selectedFoods(){
                let arr = [];
                this.goods.forEach((good)=>{
                    good.foods.forEach((food)=>{
                        if(food.count && food.count>0){
                            arr.push(food)
                        }
                    })
                })
                return arr;
            }
        },
        methods:{
            ...mapActions([GETSGOODS]),
            //初始化滑屏
            initScroll(){
                this.$nextTick(()=>{
                    //将滑屏的包裹器传入到BScroll内部就可以产生滑屏
                    this.leftScroll = new BScroll(this.$refs.left,{click:true});
                    //计算得到右侧滑屏元素移动的实时距离(正值)
                    this.rightScroll =new BScroll(this.$refs.right,{
                        probeType:3,
                        click:true
                    });
                    this.rightScroll.on("scroll",({x, y})=>{
                        this.scrollY = Math.abs(y)
                    })
                })
            },
            //初始化heightArr
            initHeightArr(){
                /*1. 有没有可能在当前代码被执行时  仓库中goods的数据还是空的?
                    当前代码在执行时 我们请求goods这个接口还没有响应
                    响应式更新还没起作用 这个时候去操作一个dom节点的相关api是肯定不安全的
                2. 有没有可能在当前代码被执行时 仓库中goods的数据已经被填上了?
                        哪怕当前代码在被执行时 数据已经回来了 可是mounted阶段
                        只是来做挂载的 它并不能保证界面已经完成渲染
                        这个时候去操作一个dom节点的相关api是有可能不安全的*/

                /*vm.$nextTick(cb)
                    将cb延迟到下次 DOM 更新循环之后执行。
                    在修改数据之后立即使用它，然后等待 DOM 更新
                    在cb中的代码执行 上一次数据引起的dom更新百分百已经完成渲染了!!!
                */
                //确保当前的这个注册 在goods数据被修改之后再进行
                this.$nextTick(()=>{
                    //计算得到所有分类列表高度累加的一个数组
                    //children会剔除所有的文本节点
                    //childNodes会包含文本节点
                    let rightLiNodes = this.$refs.classList.children;

                    let height = 0;
                    let heights = [height];
                    rightLiNodes.forEach((item)=>{
                        height += item.offsetHeight;
                        heights.push(height)
                    })
                    this.heightArr = heights

                    /*let heights = [];
                    let res = Array.from(rightLiNodes).reduce((adder,item)=>{
                        //offsetHeight : 代表的是元素的高度
                        heights.push(adder);
                        return adder + item.offsetHeight
                    },0)
                    heights.push(res);
                    this.heightArr = heights
                    */
                })
            },
            //左侧列表同步右侧列表
            leftToRight(index){
                this.rightScroll.scrollTo(0,-this.heightArr[index],300)
            },
            //购物车添加的方法
            add(food){
                //food中有可能是不存在count属性的
                if(food.count > 0){
                    food.count++
                }else{
                    //给仓库中派生出来的数据添加一个响应式属性count 代表当前food被购物车选中的数量
                    this.$set(food,"count",1)
                }
            },
            //购物车删减的方法
            remove(food){
                if(food.count > 0)
                    food.count--
            },
            //清除购物车的方法
            clear(){
                this.goods.forEach((good)=>{
                    good.foods.forEach((food)=>{
                        if(food.count && food.count>0)
                            food.count = 0
                    })
                })
            }
        },
        components:{
            "seller-food":food,
            "seller-cart":cart
        },
        //mounted代表挂载完成 但是挂载完成并不代表页面渲染成功
        async mounted(){
            //在路由组件中去转发action 发送请求 获取数据 修改仓库  整个过程的实时性是特别高的
            //会照成大量的请求浪费
            await this[GETSGOODS](); //当前这个await是必须的! 确保goods数据得到更新 再注册nextTick
            this.initScroll();
            this.initHeightArr();

            //为购物车的加减 在总线上注册事件
            this.$bus.$on("add",this.add);
            this.$bus.$on("remove",this.remove);
        },
    }
</script>

<style scoped lang="stylus">
@import "../../common/stylus/mixin.styl"
.goodsWrap
    display flex
    flex-direction column
    .goods
        flex 1
        display flex
        overflow hidden
        .left
            width 80px
            .typeList
                .typeItem
                    one-px(rgba(7,17,27,.1))
                    display flex
                    justify-content center
                    align-items center
                    box-sizing border-box
                    width 80px
                    height 54px
                    padding 0 12px
                    background #f3f5f7
                    font-size:12px
                    line-height 14px
                    color rgba(0,0,0,.6)
                    font-weight bold
                    &.active
                        background pink
                    &:after
                        width 56px
                    &:last-child
                        border-none()
                    .icon
                        margin-right 3px
                    .name
                        zoom 1
        .right
            flex 1
            .classList
                .classItem
                    .title
                        height 26px
                        padding-left 14px
                        background #f3f5f7
                        border-left 5px solid #d9dde1
                        font-size 12px
                        line-height 26px
                        color rgba(147,153,159,1)
                    .foodList
                        zoom 1
                        .foodItem
                            overflow hidden
                            one-px(rgba(7,17,27,.1))
                            &:last-child
                                border-none()
    .cartWrap
        height 46px
</style>