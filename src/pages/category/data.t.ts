export type Category = {
  id?: number,
  pid?: number,
  name?: string,
  unit?: string,
  avatar?: string,
  count?: number,
  subList?: Category[]
}

export type CategoryStateType = {
  list?: Category[],
  totalCount?: number,
  tree:Category[]
}

export interface CategoryDispatchProps {
  getList: (options?: any) => Promise<any>
  addCategory: (options?: any) => Promise<any>
  deleteCategory: (options?: any) => Promise<any>
  updateCategory: (options?: any) => Promise<any>
}
