import { Effect, Reducer } from '@@/plugin-dva/connect';
import { deleteCategory, getCategoryList, updateCategory,addCategory } from '@/pages/category/service';
import { Category, CategoryStateType } from '@/pages/category/data.t';

interface ICategory {
  namespace?: string,
  effects: {
    getCategoryListAsync: Effect
    addCategory: Effect,
    deleteCategory: Effect,
    updateCategory: Effect
  },
  reducers?: {
    getCategoryList: Reducer,
  },
  state: CategoryStateType
}

const Model: ICategory = {
  namespace: 'category',
  state: {
    list: [],
    totalCount: 0,
  },
  effects: {
    * getCategoryListAsync({ payload }, { put, call }) {
      const { data }: API.R<API.Page<Category>> = yield call(getCategoryList, { ...payload });
      yield put({
        type: 'getCategoryList',
        payload: {
          list: data?.list,
          totalCount: data?.totalCount,
        },
      });
    },
    * addCategory({ payload }, { put, call }) {

      yield call(addCategory, { ...payload });

    },
    * deleteCategory({ payload }, { put, call }) {
      yield call(deleteCategory, payload[0]);

    },
    * updateCategory({payload},{put,call}){
      yield call(updateCategory,{...payload})
    }
  },
  reducers: {
    getCategoryList(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
