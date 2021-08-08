export default {

  'POST /api/users/create': {
    code: 200,
    msg: '登陆成功',
    data: {
      id:12,
      username: 'peter',
    },
  },
  'POST /api/category/list': {
    code: 200,
    msg: '成功',
    data: [
      {
        pid:0,
        id: 1,
        name: 'John Brown',
      },
      {
        pid:0,
        id: 2,
        name: 'Joe Black',
      },
    ]
  },
  'POST /api/category/update': {
    code: 200,
    msg: '成功',
    data: {}
  },


};
