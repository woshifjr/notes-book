import { createRouter, createWebHashHistory } from 'vue-router';
import { RouteRecordRaw } from 'vue-router';
import main from '../views/main.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: main,
    children: [
      {
        path: '/',
        name: 'index',
        component: () => import('../views/index/index.vue'),
        meta: {
          title: '便笺'
        }
      },
      {
        path: '/editor',
        name: 'editor',
        component: () => import('../views/editor/index.vue'),
        meta: {
          title: ''
        }
      },
      {
        path: '/setting',
        name: 'setting',
        component: () => import('../views/setting/index.vue'),
        meta: {
          title: '设置'
        }
      }
    ]
  },
  {
    path: '/image-preview',
    name: 'imagePreview',
    component: () => import('../views/ImagePreview/index.vue'),
    meta: {
      title: '图片预览'
    }
  }
];

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
});

export default router;
