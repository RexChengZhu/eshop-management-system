declare namespace API{
  type R<T> = {
    code?:number,
    msg?:string,
    data?:T
  }
  type page<T> = {
    curPage?:number,
    totalCount?:number,
    list?:T[]
  }
  // 商品分类
  type Category = {
    id?:number,
    pid?:number,
    name?:string,
    unit?:string,
    avatar?:string,
    count?:number,
    subList?:Category[]
  }
}
