import request from '@/utils/request';

import { AttrParam } from '@/pages/platform/attrParam/data.t';

export async function getList(id: string) {
  return request.get<API.R<AttrParam[]>>('/product/attrattrgrouprelation/list?id=' + id);
}

export async function add(options?: { [key: string]: any }) {
  return request.post('/product/attrattrgrouprelation/save', {
    data: options,
  });
}

export async function update(options?: { [key: string]: any }) {
  return request.post('/product/attrattrgrouprelation/update', {
    data: options,
  });
}

export async function del(options?: { [key: string]: any }) {
  return request.post('/product/attrattrgrouprelation/delete', {
    data: options,
  });
}
