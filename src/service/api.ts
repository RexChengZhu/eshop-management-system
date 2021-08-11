import request from '@/utils/request';


/**
 * 获得分类列表
 * @param options
 */
export async function getCategoryList(options?: { [key: string]: any }) {
  return request.get<API.R<API.page<API.Category>>>('/wares/tcategory/list', {
    ...(options || {}),
  })
}

/**
 * 修改分类名称
 * @param options
 */
export async function updateCategory(options?: API.Category){
  return request.post<API.R<any>>('/wares/tcategory/update',{
    data:options
  })
}

/**
 * 添加分类
 */
export async function addCategory(options?: API.Category){
  return request.post<API.R<any>>('/wares/tcategory/add',{
    data:options
  })
}
