import { Category } from '@/pages/category/data.t';

export type Brand = {
  id?: number,
  name?:string,
  logo?:string,
  descript?:string,
  showStatus?:number,
  firstLetter?:string,
  sort?:number
}

export type BrandStateType = {
  list?: Brand[],
  totalCount?: number
}

export interface BrandDispatchProps {
  getList: (options?: any) => Promise<any>
  addBrand: (options?: any) => Promise<any>
  deleteBrand: (options?: any) => Promise<any>
  updateBrand: (options?: any) => Promise<any>
}
