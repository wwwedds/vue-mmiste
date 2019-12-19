import ajax from './ajax'
//根据经纬度获取位置
export const addAdress=(latitude,longitude)=>ajax(`/position/${latitude},${longitude}`)
//获取食品分类列表
export const foodCategoryList = () => ajax('/index_category',{
  headers:{
    needCheck:true
  }
})

//获取商铺分类列表
export const shopCategoryList=(latitude,longitude)=>ajax('/shops',
{params:{latitude,longitude},
headers:{
  needCheck:true
}
})
//用户名密码登录
export const userLogin=({name,pwd,captcha})=>ajax.post('/login_pwd', {name, pwd, captcha})
//手机短信
export const phoneCode= (phone) => ajax.get('/sendcode', { params: {phone}})
//手机号验证码
export const phoneSms=({phone,code})=>ajax.post('/login_sms', {phone, code})

//获取shop信息
export const reqGoods= ()=> ajax('/goods')
export const reqRatings=()=>ajax('/ratings')
export const reqInfo=()=>ajax('/info')

//自动登录
export const  reqAutoLogin=()=>ajax.get('/auto_login')
