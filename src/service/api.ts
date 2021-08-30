import request from '@/utils/request';

/**
 * 获得oss签名
 */
export async function getOssSignature(options?: { [key: string]: any }) {
  return request.get<API.R<API.Oss>>('/third/oss/policy', {
    ...(options || {}),
  })
}

/**
 * 获得分类列表
 * @attrParam options
 */
export async function categoryList(options?: { [key: string]: any }) {
  return request.post<API.R<API.Page<API.Category>>>('/product/category/list', {
    data:options
  })
}

/**
 * 修改分类名称
 * @attrParam options
 */
export async function updateCategory(options?: API.Category){
  return request.post<API.R<any>>('/product/category/update',{
    data:options
  })
}

/**
 * 添加分类
 */
export async function addCategory(options?: API.Category){
  return request.post<API.R<any>>('/product/category/save',{
    data:options
  })
}

export async function productList(options?:any){
  return request.post<API.R<API.Page<API.Product>>>('/product/product/list',{
    data:options
  })
}


export async function brandList(options?:any){
  return request.post<API.R<API.Page<API.Product>>>('/product/brand/list',{
    data:options
  })
}

/**
 * 添加品牌分类关联
 * @attrParam options
 */
export async function addBrandCat(options?:any){
  return request.post<API.R<API.Page<API.Product>>>('/product/brand/addCat',{
    data:options
  })
}

export async function brandCatList(options?:any){
  return request.post<API.R<API.Page<API.BrandCat>>>('/product/brand/brandCatList',{
    data:options
  })
}
export async function addBrand(options:API.Brand){
  return request.post<API.R<API.Page<API.Product>>>('/product/brand/save',{
    data:options
  })
}
export async function delBrand(options:number){
  return request.post<API.R<API.Page<API.Product>>>('/product/brand/delete',{
    data:options
  })
}


export async function getAttrGroups(options?:any){
  return request.post<API.R<API.Page<API.AttrGroup>>>('/product/attrGroup/list',{
    data:options
  })
}

export async function addAttrGroups(options?:any){
  return request.post<API.R<API.Page<API.Product>>>('/product/attrGroup/add',{
    data:options
  })
}

export async function delAttrGroups(options?:any){
  return request.post<API.R<API.Page<API.Product>>>('/product/attrGroup/delete',{
    data:options
  })
}

export async function updateAttrGroups(options?:any){
  return request.post<API.R<API.Page<API.Product>>>('/product/attrGroup/update',{
    data:options
  })
}
