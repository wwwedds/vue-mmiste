<template>
  <div>
    <shopHeader/>
    <div class="tab">
      <div class="tab-item">
        <routerLink :to="`/shop/${id}/goods`" replace>点餐</routerLink>
      </div>
      <div class="tab-item">
        <routerLink :to="`/shop/${id}/ratings`" replace>评价</routerLink>
      </div>
      <div class="tab-item">
        <routerLink :to="`/shop/${id}/info`" replace>商家</routerLink>
      </div>
      
    </div>
    <routerView></routerView>
  </div>
</template>

<script type="text/ecmascript-6">
import shopHeader from "../../components/shopHeader/shopHeader";
import { mapState } from 'vuex';
import {saveCartFoods} from '../../uuit/index'
export default {
  props:['id'],
  components: {
    shopHeader
  },
  computed: {
    ...mapState({
      shop:state=>state.shop
    })
  },
  mounted() {
    const id=this.id
    console.log(id);
    // this.$store.dispatch("getGoods");
    // this.$store.dispatch("getInfo");
    // this.$store.dispatch("getRatings");
    this.$store.dispatch('getShop',id)
  },
  beforeDestroy() {
    const {cardFoods,shop:{id}}=this.shop
      saveCartFoods(id,cardFoods)
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.tab
    height 40px
    line-height 40px
    background #fff
    bottom-border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      float left
      width: 33.33333%
      text-align center
      font-size 14px
      color rgb(77, 85, 93)
      a
        display block
        position relative
        &.router-link-active
          color #02a774
          &::after
            content ''
            position absolute
            left 50%
            bottom 1px
            width 35px
            height 2px
            transform translateX(-50%)
            background #02a774
</style>
