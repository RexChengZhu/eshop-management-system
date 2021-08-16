declare namespace API{
  type R<T> = {
    code?:number,
    msg?:string,
    data?:T
  }
  type Page<T> = {
    curPage?:number,
    totalCount?:number,
    list?:T[]
  }
  type Oss = {
    dir?:string,
    expire?:number,
    host?:string,
    accessId?:string,
    policy?:string,
    signature?:string,
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

  // 商品
  type Product = {
    // 主键id
    id?:number,
    // 商品分类id
    cid?:number,
    // 商品名称
    name?:string,
    // 商品价格
    price?:number,
    // 商品描述
    desc?:string,
    // 商品状态
    status?:number,

  }

  // 品牌
  type Brand = {
    id?:number,
    name?:string,
    logoUrl?:string,
    desc?:string,
    status?:number | boolean,
    searchKey?:string

  }

  // spu属性分组
  type AttrGroup = {
    id:number,
    catId:number,
    name:string
  }
}
