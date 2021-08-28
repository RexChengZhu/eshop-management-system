export type CategoryBrandRelate = {
  id?: number,
  brandId:number,
  catelogId:number,
  brandName:string,
  catelogName:string
}

export type CategoryBrandRelateStateType = {
  list?: CategoryBrandRelate[],
  totalCount?: number
}

export interface CategoryBrandRelateDispatchProps {
  getList: (options?: any) => Promise<any>
  add: (options?: any) => Promise<any>
  del: (options?: any) => Promise<any>
  update: (options?: any) => Promise<any>
  getNodes: (options?: any) => Promise<any>
}
