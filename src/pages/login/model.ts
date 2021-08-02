import { Reducer, Effect, Subscription } from 'umi';
import { Action } from '@@/plugin-dva/connect';
import request from '@/utils/request';
import { login } from './service';
import { Resp } from '@/common/type';
import { UserType } from '@/pages/login/data';
import { history } from 'umi';
import { message } from 'antd';
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
        message.success("登陆成功")
        history.replace('/')
      }

      // yield put({
      //   type: 'login',
      //   payload: data,
      // });
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
