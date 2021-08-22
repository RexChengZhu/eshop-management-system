import { Effect, Reducer } from '@@/plugin-dva/connect';
import { BrandStateType } from '@/pages/brand/data.t';
import { brandList, del, update } from '@/pages/brand/service';
import { addBrand } from '@/service/api';

interface IBrandModel {
  namespace?: string,
  effects: {
    getListSync: Effect
    add: Effect,
    delete: Effect,
    update: Effect
  },
  reducers?: {
    getList: Reducer,
  },
  state: BrandStateType

}

const Model: IBrandModel = {
  namespace: 'brand',
  state: {
    totalCount: 0,
    list: [],
  },
  effects: {
    * getListSync({ payload }, { put, call }) {
      const { data }: API.R<API.Page<API.Product>> = yield call(brandList, { ...payload });
      yield put({
        type: 'getList',
        payload: {
          list: data?.list,
          totalCount: data?.totalCount,
        },
      });
    },
    * add({ payload }, { put, call }) {
      yield call(addBrand, { ...payload });
    },
    * delete({ payload }, { put, call }) {
      yield call(del, payload);
    },
    * update({ payload }, { put, call }) {
      yield call(update, { ...payload });
    },
  },
  reducers: {
    getList(state, { payload }) {
      return { ...payload };
    },
  },

};

export default Model;
