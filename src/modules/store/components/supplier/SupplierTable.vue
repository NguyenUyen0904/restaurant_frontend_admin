<template>
    <BaseTableLayout :data="supplierList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('store.supplier.supplierTable.header.id')"
                type="index"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                :label="$t('store.supplier.supplierTable.header.name')"
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column
                prop="phone"
                :label="$t('store.supplier.supplierTable.header.phone')"
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.phone }}
                </template>
            </el-table-column>
            <el-table-column
                prop="address"
                :label="$t('store.supplier.supplierTable.header.address')"
            >
                <template #default="scope">
                    {{ scope.row.address }}
                </template>
            </el-table-column>
            <el-table-column
                prop="updatedAt"
                :label="$t('store.supplier.supplierTable.header.updatedAt')"
                sortable="custom"
            >
                <template #default="scope">
                    {{
                        scope.row.updatedAt
                            ? parseDateTime(
                                  scope.row.updatedAt,
                                  YYYY_MM_DD_HYPHEN_HH_MM_COLON,
                              )
                            : ''
                    }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('store.supplier.supplierTable.header.actions')"
                fixed="right"
                width="150"
            >
                <template #default="scope">
                    <div class="button-group">
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.supplier.tooltip.edit')"
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
                            :content="$t('store.supplier.tooltip.delete')"
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

import { ISupplier, ISupplierUpdate } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { StoreMixins } from '../../mixins';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { storeModule } from '../../store';
import { setupDelete } from '../../composition/supplierList';
import { setup } from 'vue-class-component';

@Options({
    name: 'supplier-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
    },
})
export default class SupplierTable extends mixins(StoreMixins) {
    deleteAction = setup(() => setupDelete());

    get supplierList(): ISupplier[] {
        return storeModule.supplierList;
    }

    get isCanDelete(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsSupplier, [
            `${PermissionResources.STORE_SUPPLIER}_${PermissionActions.DELETE}`,
        ]);
    }

    get isCanUpdate(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsSupplier, [
            `${PermissionResources.STORE_SUPPLIER}_${PermissionActions.UPDATE}`,
        ]);
    }

    async onClickButtonEdit(updateSupplier: ISupplierUpdate): Promise<void> {
        storeModule.setSelectedSupplier(updateSupplier);
        storeModule.setIsShowSupplierFormPopUp(true);
    }

    async onClickButtonDelete(id: number): Promise<void> {
        await this.deleteAction.deleteSupplier(id);
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
