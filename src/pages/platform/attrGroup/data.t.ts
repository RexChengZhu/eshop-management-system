export type AttrGroup = {
  id?: number,
  attrGroupName:string,
  sort:number,
  descript:string,
  icon:string,
  catId:number
}

export type AttrGroupStateType = {
  list?: AttrGroup[],
  totalCount?: number
}

export interface AttrGroupDispatchProps {
  getList: (options?: any) => Promise<any>
  add: (options?: any) => Promise<any>
  del: (options?: any) => Promise<any>
  update: (options?: any) => Promise<any>
  cateTree: (options?: any) => Promise<any>

}
