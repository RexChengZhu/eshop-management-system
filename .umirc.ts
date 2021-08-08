import { defineConfig } from 'umi';

export default defineConfig({

  nodeModulesTransform: {
    type: 'none',
  },
  fastRefresh: {},
  theme: {
    'primary-color': '#1DA57A',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/index',
      wrappers: [
        '@/utils/auth',
      ],
      routes: [
        {
          title:'首页',
          path: '/home',
          component: '@/pages/home/index',
        },
        {
          title:'品类管理',
          path: '/category',
          component: '@/pages/category/index',
        },
        {
          title:'商品管理',
          path: '/brand',
          component: '@/pages/brand/index',
        },{
          title:'用户管理',
          path: '/user',
          component: '@/pages/user/index',
        },{
          title:'角色管理',
          path: '/role',
          component: '@/pages/role/index',
        },
        // {
        //   title:'图表管理',
        //   path: '/chart',
        //   component: '@/pages/chart/index',
        // },

      ],
    },

  ],
});
