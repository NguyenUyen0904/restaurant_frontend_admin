<template>
    <BaseTableLayout :data="supplierList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('store.importMaterial.importMaterialTable.header.id')"
                type="index"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="supplier"
                :label="$t('store.importMaterial.importMaterialTable.header.supplier')"
                sortable="custom"
                width="200"
            >
                <template #default="scope">
                    {{ scope.row.supplier?.name || '' }}
                </template>
            </el-table-column>
            <el-table-column
                prop="warehouseStaff"
                width="200"
                :label="
                    $t('store.importMaterial.importMaterialTable.header.warehouseStaff')
                "
            >
                <template #default="scope">
                    {{ scope.row.warehouseStaff?.fullName || '' }}
                </template>
            </el-table-column>
            <el-table-column
                prop="totalPaymentImport"
                width="250"
                :label="
                    $t(
                        'store.importMaterial.importMaterialTable.header.totalPaymentImport',
                    )
                "
            >
                <template #default="scope">
                    {{ parseMoney(scope.row.totalPaymentImport | 0) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="importTime"
                width="200"
                :label="$t('store.importMaterial.importMaterialTable.header.importTime')"
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
                prop="status"
                width="200"
                :label="$t('store.importMaterial.importMaterialTable.header.status')"
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
                :label="$t('store.importMaterial.importMaterialTable.header.note')"
                width="200"
            >
                <template #default="scope">
                    {{ scope.row.note }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('store.importMaterial.importMaterialTable.header.actions')"
                fixed="right"
                width="150"
            >
                <template #default="scope">
                    <div class="button-group">
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.importMaterial.tooltip.detail')"
                            placement="top"
                            v-if="isCanUpdate(scope.row?.status)"
                        >
                            <el-button
                                type="warning"
                                size="mini"
                                @click="onClickUpdateImportMaterial(scope.row)"
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

import { IImportMaterial } from '../../types';
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
import { importMaterialService } from '../../services/api.service';
import { HttpStatus } from '@/common/constants';
import { IEmitStatus } from '@/common/types';
import i18n from '@/plugins/vue-i18n';
import { ElLoading } from 'element-plus';
import MenuAcceptStatus from '@/layouts/components/MenuAcceptStatus.vue';

@Options({
    name: 'import-material-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
        MenuAcceptStatus,
    },
})
export default class ImportMaterialTable extends mixins(StoreMixins) {
    get supplierList(): IImportMaterial[] {
        return storeModule.importMaterialList;
    }

    isCanUpdate(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsImportMaterial, [
            `${PermissionResources.STORE_IMPORT_MATERIAL}_${PermissionActions.UPDATE}`,
        ]);
    }

    onClickUpdateImportMaterial(importMaterial: IImportMaterial): void {
        storeModule.setSelectedImportMaterial(importMaterial);
        this.$router.push(`/import-material/${importMaterial.id}`);
    }

    async setStatus(data: IEmitStatus): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });

        const response = await importMaterialService.update(data.id, {
            status: data.status,
        });

        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                i18n.global.t('store.importMaterial.message.update.success'),
            );
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getImportMaterials();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getImportMaterials();
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
