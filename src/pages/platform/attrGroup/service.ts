import request from '@/utils/request';
import { Category } from '@/pages/category/data.t';
import { AttrGroup } from '@/pages/platform/attrGroup/data.t';

export async function getList(options?: { [key: string]: any }) {
  return request.post<API.R<API.Page<AttrGroup>>>('/product/attrGroup/list', {
    data:options
  })
}
export async function add(options?: { [key: string]: any }) {
  return request.post('/product/attrGroup/save', {
    data:options
  })
}
export async function update(options?: { [key: string]: any }) {
  return request.post('/product/attrGroup/update', {
    data:options
  })
}
export async function del(options?: { [key: string]: any }) {
  return request.post('/product/attrGroup/delete', {
    data:options
  })
}
