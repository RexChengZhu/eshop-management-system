
import {Reducer,Effect,Subscription} from 'umi'
import { Action } from '@@/plugin-dva/connect';
import request from '@/utils/request';
import {login} from './service'
interface ILoginModel {
  namespace: 'login',
  state:{},
  reducers: {
    login:Reducer
  },
  effects: {
    loginAsync: Effect,
  },
  subscriptions: {}
}
const model:ILoginModel = {
  namespace: 'login',
  state:{},
  effects: {
    *loginAsync({ payload },{put,call}){
      const data = yield call(login,payload)
      yield put({
        type:'login',
        payload:data
      })
      debugger
    },
  },
  reducers: {
    login(state,{payload}){
      return {...state,...payload}
    }
  },
  subscriptions: {}

}
export default model;
