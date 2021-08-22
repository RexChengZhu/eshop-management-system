import request from '@/utils/request';
import { Category } from '@/pages/category/data.t';

export async function getCategoryList(options?: { [key: string]: any }) {
  return request.post<API.R<API.Page<Category>>>('/product/category/list', {
    data:options
  })
}
export async function getCategoryTree(options?: { [key: string]: any }) {
  return request.post<API.R<Category[]>>('/product/category/tree', {
    data:options
  })
}
export async function addCategory(options?: { [key: string]: any }) {
  return request.post<API.R<API.Page<Category>>>('/product/category/save', {
    data:options
  })
}
export async function updateCategory(options?: { [key: string]: any }) {
  return request.post<API.R<API.Page<Category>>>('/product/category/update', {
    data:options
  })
}
export async function deleteCategory(options?: { [key: string]: any }) {
  return request.post<API.R<API.Page<Category>>>('/product/category/delete', {
    data:options
  })
}
