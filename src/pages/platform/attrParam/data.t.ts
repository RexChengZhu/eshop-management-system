export type AttrParam = {
  id?: number,
  attrName:string,
  searchTpe:number,
  icon:string,
  valueSelect:string[],
  attrType:number,
  enable:number,
  catId:number,
  showDesc:number,
  catName:string,
  groupName:string
}

export type AttrParamStateType = {
  list?: AttrParam[],
  totalCount?: number
}

export interface AttrParamDispatchProps {
  getList: (options?: any) => Promise<any>
  add: (options?: any) => Promise<any>
  del: (options?: any) => Promise<any>
  update: (options?: any) => Promise<any>
}
