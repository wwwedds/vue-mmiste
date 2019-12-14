import ajax from './ajax'
//根据经纬度获取位置
export const addAdress=(latitude,longitude)=>ajax(`/position/${latitude},${longitude}`)
//获取食品分类列表
export const foodCategoryList=()=>ajax('/index_category')

//获取商铺分类列表
export const shopCategoryList=(latitude,longitude)=>ajax('/shops',{params:{latitude,longitude}})