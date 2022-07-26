import yup from '@/plugins/yup';
import { INPUT_TEXT_MAX_LENGTH } from '@/common/constants';

export enum PermissionResources {
    DASHBOARD = 'dashboard',
    USER = 'user',
    TABLE_DIAGRAM = 'table_diagram',
    BOOKING = 'booking',
    MENU_FOOD = 'food',
    MENU_CATEGORY = 'category',
    STORE_MATERIAL = 'store_material',
    STORE_CONVERT = 'store_convert',
    STORE_SUPPLIER = 'store_supplier',
    STORE_IMPORT_MATERIAL = 'store_import_material',
    STORE_IMPORT_MATERIAL_DETAIL = 'store_import_material_detail',
    STORE_EXPORT_MATERIAL = 'store_export',
    STORE_EXPORT_MATERIAL_DETAIL = 'store_export_material_detail',
    STORE_CHECK_INVENTORY = 'store_check_inventory',
    STORE_INVENTORY_DETAIL = 'store_inventory_detail',
    BILLING = 'billing',
    CLOSING_REVENUE = 'closing_revenue',
    ROLE = 'role',
}

export enum PermissionActions {
    READ = 'read',
    CREATE = 'create',
    UPDATE = 'update',
    DELETE = 'delete',
    LOGIN = 'login',
    UPDATE_ROLE = 'update_role',
    CONVERT_MATERIAL = 'convert_material',
}

export const personalPermissionSuffix = '_personal';

export const permissionSchema = yup.object({
    description: yup.string().trim().nullable().max(INPUT_TEXT_MAX_LENGTH),
    name: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH).label('roleName').required(),
    permissionIds: yup.array().min(1, 'role.list.common.error.noPermission').required(),
});

export const permissions = [
    {
        model: 'user',
        actions: ['read', 'create', 'update', 'delete', 'change_status'],
    },
    {
        model: 'role',
        actions: ['read', 'update'],
    },
];

export const SortOptions = [
    {
        label: 'role.list.sort.name',
        value: 'name',
    },
    {
        label: 'role.list.sort.createdAt',
        value: 'createdAt',
    },
];

export const PERMISSION_LOGIN = 'login';

export const LOADING_BACKGROUND_COLOR = 'rgba(255, 255, 255, 0.9)';
