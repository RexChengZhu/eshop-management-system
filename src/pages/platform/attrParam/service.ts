import request from '@/utils/request';
import { Category } from '@/pages/category/data.t';
import { AttrGroup } from '@/pages/platform/attrGroup/data.t';
import { AttrParam } from '@/pages/platform/attrParam/data.t';

export async function getList(options?: { [key: string]: any }) {
  return request.post<API.R<API.Page<AttrParam>>>('/product/attr/list', {
    data:options
  })
}
export async function add(options?: { [key: string]: any }) {
  return request.post('/product/attr/save', {
    data:options
  })
}
export async function update(options?: { [key: string]: any }) {
  return request.post('/product/attr/update', {
    data:options
  })
}
export async function del(options?: { [key: string]: any }) {
  return request.post('/product/attr/delete', {
    data:options
  })
}
