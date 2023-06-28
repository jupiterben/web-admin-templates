
import { t } from '@/hooks/web/useI18n'
import { Layout, getParentLayout } from '@/utils/routerHelper'

export const pagesRouterMap: AppRouteRecordRaw[] = [
    {
        path: '/group1',
        component: Layout,
        redirect: '/group1/page1',
        name: 'Dashboard',
        meta: {
            title: t('router.group1'),
            icon: 'ant-design:dashboard-filled',
            alwaysShow: true
        },
        children: [
            {
                path: 'page1',
                component: () => import('@/views/Group1/Page1.vue'),
                name: 'Analysis',
                meta: {
                    title: t('router.page1'),
                    noCache: true,
                    affix: true
                }
            },
            {
                path: 'page2',
                component: () => import('@/views/Group1/Page2.vue'),
                name: 'Workplace',
                meta: {
                    title: t('router.page2'),
                    noCache: true
                }
            }
        ]
    }
]

export const DefaultPagePath = "/group1/page1";