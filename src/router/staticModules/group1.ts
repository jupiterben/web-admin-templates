import type { RouteRecordRaw } from 'vue-router';
import RouterView from '@/layout/routerView/index.vue';
import { t } from '@/hooks/useI18n';

const moduleName = 'group1';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/group1',
        component: RouterView,
        redirect: '/group1/page1',
        meta: {
            title: '个人中心',
            hideInMenu: false,
        },
        children: [
            {
                path: 'page1',
                name: `${moduleName}-page1`,
                component: () => import('@/views/group1/page1.vue'),
                meta: { title: t('routes.group1.page1'), hideInMenu: false },
            },
            {
                path: 'page2',
                name: `${moduleName}-page2`,
                component: () => import('@/views/group1/page2.vue'),
                meta: { title: t('routes.group1.page2'), hideInMenu: false },
            },
        ],
    },
];

export default routes;