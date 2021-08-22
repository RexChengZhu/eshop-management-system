import request from '@/utils/request';
import { Brand } from '@/pages/brand/data.t';

export async function brandList(options?:any){
  return request.post<API.R<API.Page<Brand>>>('/product/brand/list',{
    data:options
  })
}
export async function update(options?:any){
  return request.post('/product/brand/update',{
    data:options
  })
}
export async function save(options?:any){
  return request.post('/product/brand/save',{
    data:options
  })
}
export async function del(options?:any){
  return request.post('/product/brand/delete',{
    data:options
  })
}
