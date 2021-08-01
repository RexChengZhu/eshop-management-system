import { Effect, Reducer } from '@@/plugin-dva/connect';
import { register } from '@/pages/register/service';

interface IRegisterModel {
  namespace: 'register',
  state:{},
  reducers: {
    register:Reducer
  },
  effects: {
    registerAsync: Effect,
  },
  subscriptions: {}
}

 const model:IRegisterModel = {
  effects: {
    *registerAsync({ payload },{put,call}){
      const data = yield call(register)
      put({
        type:'register',
        payload:data
      })
    }
  },
  namespace: 'register',
  reducers: {
    register(state,{payload}){

    }
  },
  state: {},
  subscriptions: {}

}
export default model;
