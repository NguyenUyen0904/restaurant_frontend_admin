<template>
    <BaseTableLayout :data="checkInventoryList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('store.checkInventory.checkInventoryTable.header.id')"
                type="index"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="checkTime"
                :label="$t('store.checkInventory.checkInventoryTable.header.checkTime')"
                sortable="custom"
            >
                <template #default="scope">
                    {{
                        scope.row.createdAt
                            ? parseDateTime(
                                  scope.row.createdAt,
                                  YYYY_MM_DD_HYPHEN_HH_MM_COLON,
                              )
                            : ''
                    }}
                </template>
            </el-table-column>
            <el-table-column
                prop="warehouseStaff"
                :label="
                    $t('store.checkInventory.checkInventoryTable.header.warehouseStaff')
                "
            >
                <template #default="scope">
                    {{ scope.row.warehouseStaff.fullName }}
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                :label="$t('store.checkInventory.checkInventoryTable.header.status')"
            >
                <template #default="scope">
                    <MenuAcceptStatus
                        :status="scope.row.status"
                        :id="scope.row.id"
                        @set-status="setStatus"
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                :label="$t('store.checkInventory.checkInventoryTable.header.note')"
            >
                <template #default="scope">
                    {{ scope.row.note }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('store.checkInventory.checkInventoryTable.header.actions')"
                fixed="right"
                width="150"
            >
                <template #default="scope">
                    <div class="button-group">
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.checkInventory.tooltip.detail')"
                            placement="top"
                            v-if="isCanUpdate"
                        >
                            <el-button
                                type="warning"
                                size="mini"
                                @click="onClickUpdateInventory(scope.row.id)"
                            >
                                <EditIcon class="action-icon" />
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

import { ICheckInventory } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { StoreMixins } from '../../mixins';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import {
    checkUserHasPermission,
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { storeModule } from '../../store';
import MenuAcceptStatus from '@/layouts/components/MenuAcceptStatus.vue';
import { HttpStatus } from '@/common/constants';
import { IEmitStatus } from '@/common/types';
import i18n from '@/plugins/vue-i18n';
import { ElLoading } from 'element-plus';
import { checkInventoryService } from '../../services/api.service';

@Options({
    name: 'check-inventory-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
        MenuAcceptStatus,
    },
})
export default class CheckInventoryTable extends mixins(StoreMixins) {
    get checkInventoryList(): ICheckInventory[] {
        return storeModule.checkInventoryList;
    }

    isCanUpdate(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsCheckInventory, [
            `${PermissionResources.STORE_CHECK_INVENTORY}_${PermissionActions.UPDATE}`,
        ]);
    }

    onClickUpdateInventory(id: number): void {
        storeModule.setQueryStringInventoryDetail({
            checkInventoryId: id,
        });
        this.$router.push(`/check-inventory/${id}`);
    }

    async setStatus(data: IEmitStatus): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });

        const response = await checkInventoryService.update(data.id, {
            status: data.status,
        });

        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                i18n.global.t('store.checkInventory.message.update.success'),
            );
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getCheckInventories();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                storeModule.setIsShowMaterialFormPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getCheckInventories();
                loading.close();
            }
        }
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
