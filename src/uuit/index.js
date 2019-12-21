//定义包含要给函数，用来纯属sessionage中数据{key：value，key：value}
import Vue from 'vue'
export function saveCartFoods(shopId,cardFoods){
 const cardCounts= cardFoods.reduce((pre,food)=>{
    pre[food.id]=food.count
    return pre},{})
 sessionStorage.setItem(shopId+'_key',JSON.stringify(cardCounts))
}

export function  getCartFoods(shop) {
  const cardFoods=[]
  const cardCounts=JSON.parse(sessionStorage.getItem(shop.id + '_key')) || {}
  shop.goods.forEach(
    good=>{
      good.foods.forEach(
       food=>{
         const count=cardCounts[shop.id]
         if(count>0){
           Vue.set(food,'count',count)
           //food.count=count
           cardFoods.push(food) }
      })
    })
  return cardFoods
}
