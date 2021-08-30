import { Effect, Reducer } from '@@/plugin-dva/connect';
import { add, getList } from '@/pages/platform/attrParam/service';
import { AttrParamStateType } from '@/pages/platform/attrParam/data.t';

interface AttrParam {
  namespace: string,
  state: AttrParamStateType,
  effects: {
    getListAsync: Effect,
    add: Effect
  },
  reducers: {
    getList: Reducer
  },
}

const Model: AttrParam = {
  namespace: 'attrParam',
  state: {
    list:[],
    totalCount:0
  },
  effects: {
    * getListAsync({ payload }, { put, call }) {
      const {data} = yield call(getList,{...payload});
      yield put({
        type:"getList",
        payload: {
          list:data?.list,
          totalCount:data?.totalCount
        }
      })
    },
    * add({ payload }, { put, call }) {
      yield call(add, { ...payload });
    },
  },
  reducers: {
    getList(state, { payload }) {
      return {...state,...payload}
    },
  },
};
export default Model;
