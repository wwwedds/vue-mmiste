<template>
<div>
 <div class="goods">
    <div class="menu-wrapper" ref="left">
      <ul ref="leftUl">
        <li
          class="menu-item"
          v-for="(good, index) in goods"
          :key="index"
          :class="{current:index===currentIndex}"
          @click="clickGood(index)"
        >
          <span class="text bottom-border-1px">
            <img class="icon" v-if="good.icon" :src="good.icon" />
            {{good.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="right">
      <ul ref="rightUl">
        <li class="food-list-hook" v-for="(good, index) in goods" :key="index">
          <h1 class="title">{{good.name}}</h1>
          <ul>
            <li
              class="food-item bottom-border-1px"
              v-for="(food, index) in good.foods"
              :key="index" @click='clickShow(food) '
            >
              <div class="icon">
                <img width="57" height="57" :src="food.image" />
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}份</span>
                  <span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{food.price}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <CartControl :food='food'/>
                  </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <ShopCard/>  
  </div>
   <Food :food='food' ref='isShow'/>
</div>
 
</template>

<script type="text/ecmascript-6">
import BScroll from "better-scroll";
import { mapState } from "vuex";
import Food  from '../../components/food/food'
import ShopCard   from '../../components/shopCard/shopCard'
export default {

  data() {
    return {
      tops: [],
      scrollY: 0,
      food:{}
    };
  },
  computed: {
    ...mapState({"goods":state=>state.shop.goods}),
    currentIndex() {
      const { scrollY, tops } = this;
      let  index = tops.findIndex(
        (top, index) => scrollY >= top && scrollY < tops[index + 1]
      );
      if (index !== this.index && this.leftScroll) {
        //保存上一次index
        this.index = index
        //让左侧列表滑到当前指定位置
        const li = this.$refs.leftUl.children[index];
        this.leftScroll.scrollToElement(li, 300);
      }
      return index;
    }
  },
  methods: {
    inScroll() {
      this.leftScroll = new BScroll(this.$refs.left, {click:true});
      this.rightScroll = new BScroll(this.$refs.right, { 
        
        probeType: 2 ,
        click:true});
      this.rightScroll.on("scroll", ({x,y}) => {

        this.scrollY = Math.abs(y);
      });
      this.rightScroll.on("scrollEnd", ({x, y}) => {

        this.scrollY = Math.abs(y);
      });
    },
    inTop() {
      const tops = [];
      let top = 0;
      tops.push(top);
      let lis = Array.prototype.slice.call(this.$refs.rightUl.children);
      lis.forEach(li => {
        top += li.clientHeight;
        tops.push(top);
      });
      this.tops = tops;
    },
    clickGood(index){
      let top=this.tops[index]
      this.scrollY=top
      this.rightScroll.scrollTo(0,-top,300)
    },
    clickShow(food){
      this.food=food
      this.$refs.isShow.toggleShow()
    }
  },
 
  watch: {
    goods() {
      this.$nextTick(() => {
        this.inScroll();
        this.inTop();
      });
    }
  },
 
     components:{
    Food,
    ShopCard  
  },
  //     mounted() {
  //    this.$nextTick(() => {
  //       this.inScroll();
  //       this.inTop();
  //     });
  // },

};
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.goods {
  display: flex;
  position: absolute;
  top: 225px;
  bottom: 46px;
  width: 100%;
  background: #fff;
  overflow: hidden;

  .menu-wrapper {
    flex: 0 0 auto;
    width: 80px;
    background: #f3f5f7;

    .menu-item {
      display: table;
      height: 54px;
      width: 56px;
      padding: 0 12px;
      line-height: 14px;

      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        color: $green;
        font-weight: 700;

        .text {
          border-none();
        }
      }

      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
      }

      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        bottom-border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }

  .foods-wrapper {
    flex: 1;

    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7;
    }

    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      bottom-border-1px(rgba(7, 17, 27, 0.1));

      &:last-child {
        border-none();
        margin-bottom: 0;
      }

      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }

      .content {
        flex: 1;

        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }

        .desc, .extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }

        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }

        .extra {
          .count {
            margin-right: 12px;
          }
        }

        .price {
          font-weight: 700;
          line-height: 24px;

          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }

          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }

        .cartcontrol-wrapper {
          position: absolute;
          right: 0;
          bottom: 12px;
        }
      }
    }
  }
}
</style>