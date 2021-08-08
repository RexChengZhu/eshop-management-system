import request from '@/utils/request';


export async function getCategoryList(options?: { [key: string]: any }) {
  return request.get<API.R<API.page<API.Category>>>('/wares/tcategory/list', {
    ...(options || {}),
  })
}

export async function updateCategory(options?: API.Category){
  return request.post<API.R<any>>('/wares/tcategory/update',{
    data:options
  })
}
