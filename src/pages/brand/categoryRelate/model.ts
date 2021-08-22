import { Effect, Reducer } from '@@/plugin-dva/connect';
import { CategoryBrandRelateStateType } from '@/pages/brand/categoryRelate/data.t';

interface CategoryBrandRelate {
  namespace: string,
  state: CategoryBrandRelateStateType,
  effects: {
    getRelationListAsync: Effect
  },
  reducers: {
    getRelationList : Reducer
  },
}
const Model:CategoryBrandRelate = {
  namespace:'categoryBrandRelate',
  state: {
    totalCount:0,
    list:[]
  },
  effects:{
    *getRelationListAsync(action,{put,call}){

    }
  },
  reducers:{
    getRelationList(state,{payload}){

    }
  }
}
export default Model
