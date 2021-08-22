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
          title: '首页',
          path: '/home',
          component: '@/pages/home/index',
        },
        {
          title: '品类管理',
          path: '/category',
          component: '@/pages/category/index',
        },
        {
          title: '商品管理',
          path: '/product',
          component: '@/pages/product/index',
        },
        {
          title: '商品分类管理',
          path: '/brand/category-relation',
          component: '@/pages/brand/categoryRelate/index',
        },
        {
          title: '添加商品',
          path: '/product/addupdate',
          component: '@/pages/product/addupdate/index',
        },
        {
          title: '商品详情',
          path: '/product/detail',
          component: '@/pages/product/detail/index',
        },
        {
          title: '用户管理',
          path: '/user',
          component: '@/pages/user/index',
        },
        {
          title: '角色管理',
          path: '/role',
          component: '@/pages/role/index',
        },
        {
          title: '品牌管理',
          path: '/brand',
          component: '@/pages/brand/index',
        },
        {
          title: '属性分组',
          path: '/attr_group',
          component: '@/pages/platform/attrGroup',
        },
        {
          title: '销售属性',
          path: '/attr_sku',
          component: '@/pages/platform/skuAttr',
        },
      ],
    },
  ],
});
