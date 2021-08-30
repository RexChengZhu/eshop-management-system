import { Effect, Reducer } from '@@/plugin-dva/connect';
import { getList } from '@/pages/platform/attrGroup/attrGroupRelate/service';
import { AttrGroup } from '@/pages/platform/attrGroup/data.t';

interface AttrGroupRelate {
  namespace: string,
  state: {
    list:[]
  },
  effects: {
    getListAsync: Effect
    save: Effect
  },
  reducers: {
    getList: Reducer
  },
}

const Model: AttrGroupRelate = {
  namespace: 'attrGroupRelate',
  state: {
    list: [],
  },
  effects: {
    * getListAsync({ payload }, { put, call }) {
      const { data }: API.R<AttrGroup[]> = yield call(getList,payload);
      yield put({
        type: 'getList',
        payload: {
          list: data,
        },
      });
    },
    * save({ payload }, { put, call }) {

    },
  },
  reducers: {
    getList(state, { payload }) {
      return [...payload]
    },
  },
};
export default Model;
