import mockjs, { Random } from 'mockjs';

export default {
  // 使用 mockjs 等三方库

  'GET /wares/tcategory/list': mockjs.mock({
    msg:'',
    code:'',
    data: {
      curPage:1,
      totalCount:10,
      'list|10-20':[
        {
          id:"@increment(1)",
          pid:0,
          name:'@first',
          unit:'',
          avatar:'',
          count:'',
          subList:[
            {
              id:'@increment(1)',
              pid:'',
              name:'',
              unit:'',
              avatar:'',
              count:'',
              subList:[

              ]
            }
          ]
        }
      ]
    },
  }),

  'POST /product/tproduct/list':mockjs.mock({
    msg:'ok',
    code:'200',
    data: {
      curPage: 1,
      totalCount: 10,
      'list|10-20':[
        {
          // 主键id
          id:"@increment(1)",
          // 商品分类id
          cid:"@increment(2)",
          // 商品名称
          name:"@name",
          // 商品价格
          price:"@price",
          // 商品描述
          desc:"@text",
          // 商品状态
          status:"0|1",
        }
      ]
    }
  }),

  'POST /brand/tbrand/list':mockjs.mock({
    msg:'ok',
    code:'200',
    data: {
      curPage: 1,
      totalCount: 10,
      'list|10-20':[
        {
          id:"@increment(1)",
          name:"@cname",
          logoUrl:"",
          desc:"@ctitle(20)",
          status:"",
          searchKey:"",
        }
      ]
    }
  })


};
