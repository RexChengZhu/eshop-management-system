import request from '@/utils/request';
import { Brand } from '@/pages/brand/data.t';
import { CategoryBrandRelate } from '@/pages/brand/categoryRelate/data.t';

export async function categoryRelateList(options?:any){
  return request.post<API.R<API.Page<CategoryBrandRelate>>>('/product/categoryRelate/list',{
    data:options
  })
}
export async function save(options?:any){
  return request.post('/product/categoryRelate/save',{
    data:options
  })
}
export async function del(options?:any){
  return request.post('/product/categoryRelate/delete',{
    data:options
  })
}
