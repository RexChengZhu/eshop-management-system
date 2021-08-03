import { Reducer, Effect, Subscription } from 'umi';
import { Action } from '@@/plugin-dva/connect';
import request from '@/utils/request';
import { login } from './service';
import { Resp } from '@/common/type';
import { UserType } from '@/pages/login/data';
import { history } from 'umi';
import { message } from 'antd';
import {saveUser} from '../../utils/storage'
interface ILoginModel {
  namespace: 'login',
  state: {},
  reducers: {
    login: Reducer
  },
  effects: {
    loginAsync: Effect,
  },
  subscriptions: {}
}

const model: ILoginModel = {
  namespace: 'login',
  state: {},
  effects: {
    * loginAsync({ payload }, { put, call }) {
      const  data : Resp<UserType> = yield call(login, payload);
      if (data.success){
        debugger
        message.success("登陆成功")
        saveUser(data.data)
        history.replace('/')
      }
    },
  },
  reducers: {
    login(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions: {},

};
export default model;
