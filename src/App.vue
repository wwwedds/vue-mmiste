<template>
 <div id="app">
  <router-view></router-view>
  <FooterGuide v-show='$route.meta.isShow'></FooterGuide>
 </div>
</template>

<script>
import FooterGuide from './components/FooterGuide/FooterGuide'
export default {
 components:{
   FooterGuide,
   
 },
 mounted() {
   this.$store.dispatch('getAdress')
   this.$store.dispatch(' getFoodList')
    this.$store.dispatch('getShopsList')
 },
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import './common/stylus/mixins.styl';
#app
  width 100%
  height 100%
</style>

