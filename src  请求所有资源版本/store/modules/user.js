export  default{
  state:{
    token:localStorage.getItem('token_key') ||'',
    user:[],

  },
  mutations:{
    save_token(state,token){
      state.token=token
    },
    
    save_user(state,user){
      state.user=user
    },
  },
  actions:{
    saveUser({commit},user){
      const token=user.token
      localStorage.setItem('token_key',token)
      //保存token
      commit('save_token',token)
      //保存user
      commit('save_user',user)
    },
    
  },
  getters:{}
  }