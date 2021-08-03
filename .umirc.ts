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
      path: '/login',
      component: '@/pages/login/index',
    },
    {
      path: '/register',
      component: '@/pages/register/index',
    },
    {
      path: '/',
      component: '@/layouts/index',
      routes: [
        {
          path: '/home',
          component: '@/pages/home/index',
        },

        {
          path: '/category',
          component: '@/pages/category/index',
          wrappers: [
            '@/utils/auth',
          ],
        },
      ],
    },
  ],
});
