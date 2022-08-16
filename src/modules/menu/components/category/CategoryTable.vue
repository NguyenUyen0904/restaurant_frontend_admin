<template>
    <BaseTableLayout :data="categoryList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('menu.category.categoryTable.header.id')"
                type="index"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                :label="$t('menu.category.categoryTable.header.name')"
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                :label="$t('menu.category.categoryTable.header.note')"
            >
                <template #default="scope">
                    {{ scope.row.note }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('menu.category.categoryTable.header.actions')"
                fixed="right"
                width="150"
            >
                <template #default="scope">
                    <div class="button-group">
                        <el-tooltip
                            effect="dark"
                            :content="$t('common.app.tooltip.edit')"
                            placement="top"
                            v-if="isCanUpdate"
                        >
                            <el-button
                                type="warning"
                                size="mini"
                                @click="onClickButtonEdit(scope.row)"
                            >
                                <EditIcon class="action-icon" />
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            effect="dark"
                            :content="$t('common.app.tooltip.delete')"
                            placement="top"
                            v-if="isCanDelete"
                        >
                            <el-button
                                type="danger"
                                size="mini"
                                @click="onClickButtonDelete(scope.row?.id)"
                            >
                                <DeleteIcon class="action-icon" />
                            </el-button>
                        </el-tooltip>
                    </div>
                </template>
            </el-table-column>
        </template>
    </BaseTableLayout>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-property-decorator';

import CompIcon from '../../../../components/CompIcon.vue';
import { menuModule } from '../../store';
import { MenuMixins } from '../../mixins';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { ICategory, ICategoryUpdateBody } from '../../types';
import { setupDelete } from '../../composition/category';
import { setup } from 'vue-class-component';

@Options({
    name: 'category-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
    },
})
export default class CategoryTable extends mixins(MenuMixins) {
    deleteAction = setup(() => setupDelete());

    get categoryList(): ICategory[] {
        return menuModule.categoryList;
    }

    get isCanDelete(): boolean {
        return checkUserHasPermission(menuModule.userPermissionsCategory, [
            `${PermissionResources.MENU_CATEGORY}_${PermissionActions.DELETE}`,
        ]);
    }

    get isCanUpdate(): boolean {
        return checkUserHasPermission(menuModule.userPermissionsCategory, [
            `${PermissionResources.MENU_CATEGORY}_${PermissionActions.UPDATE}`,
        ]);
    }

    async onClickButtonEdit(updateCategory: ICategoryUpdateBody): Promise<void> {
        menuModule.setCategorySelected(updateCategory);
        menuModule.setIsShowCategoryFormPopUp(true);
    }

    async onClickButtonDelete(id: number): Promise<void> {
        await this.deleteAction.deleteCategory(id);
    }
}
</script>

<style lang="scss" scoped>
.button-group {
    display: flex;
    justify-content: space-around;
    flex-wrap: nowrap;
}

.action-icon {
    height: 1em;
    width: 1em;
}
</style>
