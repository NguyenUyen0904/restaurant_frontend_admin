import { RouteRecordRaw } from 'vue-router';
import PromotionPage from './pages/PromotionPage.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import { PageName } from '@/common/constants';
import { PermissionActions, PermissionResources } from '../role/constants';

export default [
    {
        path: '/promotion',
        component: MainLayout,
        children: [
            {
                path: '',
                name: PageName.MENU_CATEGORY_PAGE,
                component: PromotionPage,
                meta: {
                    requiresAuth: true,
                    requiredPermissions: [
                        `${PermissionResources.MENU_CATEGORY}_${PermissionActions.READ}`,
                        `${PermissionResources.MENU_CATEGORY}_${PermissionActions.CREATE}`,
                        `${PermissionResources.MENU_CATEGORY}_${PermissionActions.UPDATE}`,
                        `${PermissionResources.MENU_CATEGORY}_${PermissionActions.DELETE}`,
                    ],
                },
            },
        ],
    },
] as RouteRecordRaw[];
