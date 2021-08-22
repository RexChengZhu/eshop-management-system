import { Effect, Reducer } from '@@/plugin-dva/connect';
import { add, getList } from '@/pages/platform/attrGroup/service';
import { del } from '@/pages/brand/service';
import { AttrGroup, AttrGroupStateType } from '@/pages/platform/attrGroup/data.t';

interface IAttrGroup {
  namespace: string,
  state: AttrGroupStateType,
  effects: {
    getListAsync: Effect
    add: Effect,
    del:Effect
  },
  reducers: {
    getList: Reducer
  },
}

const Model: IAttrGroup = {
  namespace: 'attrGroup',
  state: {
    list:[],
    totalCount:0,

  },
  effects: {
    * getListAsync({ payload }, { put, call }) {
      const { data }:API.R<API.Page<AttrGroup>> = yield call(getList,{...payload});

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
    * del({ payload }, { put, call }) {
      yield call(del, { ...payload });
    },
  },
  reducers: {
    getList(state, { payload }) {

      return {...state,...payload}
    },
  },
};
export default Model;
