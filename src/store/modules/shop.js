import Vue from  'vue'
import { reqInfo,reqGoods,reqRatings, reqAutoLogin} from '../../api/index'
export  default{
  state:{
   goods:[],
    ratings:[],
    info:{},
    cardFoods:[]
  },
  mutations:{
    getGoods(state,{goods}){
      state.goods=goods
    },
    getInfo(state,{info}){
    state.info=info
    },
    getRatings(state,{ratings}){
    state.ratings=ratings
    },
    saveAdd(state,{food}){
    if(food.count){
      food.count++
    }else{
     Vue.set(food,'count',1)
     //当count变为1的时候添加到列表中，
     state.cardFoods.push(food)
    }
    },
    saveIncrement(state,{food}){
      if(food.count>0){
        food.count--
      }
      //当count变为0的时候，删除food
     state.cardFoods.splice(state.cardfoods.indexof(food),1)  //state.cardfoods.indexof(food)求出对应
      },
      clearCard(state){
        state.cardFoods.forEach(food => {
           food.count=0
        });
       state.cardFoods=[]
      }
  },
  actions:{

    
async getGoods({commit}){
  const result = await reqGoods()
  if(result.code===0){
    const goods=result.data
    commit('getGoods',{goods})
  }
  },
  async getInfo({commit}){
    const result = await reqInfo()
    if(result.code===0){
      const info=result.data
      commit('getInfo',{info})
    }
    },
    
  async  getRatings({commit}){
      const result = await reqRatings()
      if(result.code===0){
        const ratings=result.data
        commit('getRatings',{ratings})
      }
      },
    async  getAutoLogin({commit,state}){
      const {user,token}= state
    
         if(token && !user._id){
          const result=await reqAutoLogin()
          if(result.code===0){
            commit('save_user',result.data)
          }
        
      }
  
    },
  updateFoodCount({commit},{isAdd,food}){
   if(isAdd){
     commit('saveAdd',{food})
   }else{
     
     commit('saveIncrement',{food})
   }
  
  }
  },
  getters:{

    totleCount(state){
     return state.cardFoods.reduce((pre,food)=>
      pre+food.count
     ,0)
    },
    totlePrise(state){
      return state.cardfoods.reduce((pre,food)=>
        pre+food.count*food.price
       ,0)
    }
  }
  }