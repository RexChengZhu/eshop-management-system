import { Effect, Reducer } from '@@/plugin-dva/connect';
import { CategoryBrandRelateStateType } from '@/pages/brand/categoryRelate/data.t';
import { categoryRelateList } from '@/pages/brand/categoryRelate/service';
import { add, del } from '@/pages/platform/attrGroup/service';

interface CategoryBrandRelate {
  namespace: string,
  state: CategoryBrandRelateStateType,
  effects: {
    getListSync: Effect,
    del: Effect,
    add: Effect
  },
  reducers: {
    getRelationList: Reducer
  },
}

const Model: CategoryBrandRelate = {
  namespace: 'categoryBrandRelate',
  state: {
    totalCount: 0,
    list: [],
  },
  effects: {
    * getListSync({ payload }, { put, call }) {
      const { data } = yield call(categoryRelateList,{...payload});
      yield put({
        type: 'getRelationList',
        payload: {
          totalCount: data.totalCount,
          list: data.list,
        },
      });
    },
    * del({ payload }, { call }) {
      yield call(del,{...payload})
    },
    * add({ payload }, { call }) {
      yield call(add,[...payload])
    },
  },
  reducers: {
    getRelationList(state, { payload }) {
      return { ...payload };
    },
  },
};
export default Model;
