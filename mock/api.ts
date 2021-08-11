import mockjs from 'mockjs';

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

};
