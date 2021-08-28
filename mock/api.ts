import mockjs, { Random } from 'mockjs';

export default {
  /**
   * 分类列表
   */
  'POST /product/category/list': mockjs.mock({
    msg: '',
    code: '',
    data: {
      curPage: 1,
      totalCount: 10,
      'list|10-20': [
        {
          id: '@increment(1)',
          pid: 0,
          name: '@ctitle(3)',
          unit: '',
          avatar: '',
          count: '',
          subList: [
            {
              id: '@increment(1)',
              pid: '',
              name: '@ctitle(3)',
              unit: '',
              avatar: '',
              count: '',
              subList: [],
            },
          ],
        },
      ],
    },
  }),

  'POST /product/brand/list': mockjs.mock({
    msg: '',
    code: '',
    data: {
      curPage: 1,
      totalCount: 10,
      'list|10-20': [
        {
          id: '@increment(1)',
          name: '@ctitle(3)',
          logoUrl: '',
          desc: '@ctitle(20)',
          "status|0-1": 0,
          searchKey: '',
        },
      ],
    },
  }),

  'POST /product/attrGroup/list': mockjs.mock({
    msg: '',
    code: '',
    data: {
      curPage: 1,
      totalCount: 10,
      'list|10-20': [
        {
          id: '@increment(1)',
          name: '@ctitle(3)',
          catId:'@increment(100)'
        },
      ],
    },
  }),

  'POST /product/brand/brandCatList': mockjs.mock({
    msg: '',
    code: '',
    data: {
      curPage: 1,
      totalCount: 10,
      'list|10-20': [
        {
          id: '@increment(1)',
          brandId: '@increment(1)',
          catId:'@increment(100)',
          catName:'@ctitle(3)'
        },
      ],
    },
  }),

  'POST /product/categoryRelate/getList':mockjs.mock({
    msg: '',
    code: '',
    data: {
      curPage: 1,
      totalCount: 10,
      'list|10-20': [
        {
          id: '@increment(1)',
          brandId: '@increment(1)',
          catelogId:'@increment(100)',
          brandName:'@ctitle(3)',
          catelogName:"@ctitle(3)"
        },
      ],
    },
  })
};
