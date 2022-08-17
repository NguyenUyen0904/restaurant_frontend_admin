<template>
    <BaseTableLayout :data="exportList" @row-click="onClickRow">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('store.exportMaterial.exportMaterialTable.header.id')"
                type="index"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="transporters"
                width="200"
                :label="
                    $t('store.exportMaterial.exportMaterialTable.header.transporters')
                "
            >
                <template #default="scope">
                    {{ scope.row.transporters }}
                </template>
            </el-table-column>
            <el-table-column
                prop="warehouseStaff"
                width="250"
                :label="
                    $t('store.exportMaterial.exportMaterialTable.header.warehouseStaff')
                "
            >
                <template #default="scope">
                    {{ scope.row.warehouseStaff?.fullName }}
                </template>
            </el-table-column>
            <el-table-column
                prop="importTime"
                width="200"
                :label="$t('store.exportMaterial.exportMaterialTable.header.exportTime')"
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
                prop="totalPaymentImport"
                width="250"
                :label="
                    $t(
                        'store.exportMaterial.exportMaterialTable.header.totalPaymentExport',
                    )
                "
            >
                <template #default="scope">
                    {{ parseMoney(scope.row.totalPaymentExport | 0) }}
                </template>
            </el-table-column>
            <el-table-column
                prop="status"
                width="200"
                :label="$t('store.exportMaterial.exportMaterialTable.header.status')"
            >
                <template #default="scope">
                    <MenuAcceptStatus
                        :status="scope.row.status"
                        :canApprove="isCanApproveStatus"
                        :id="scope.row.id"
                        @set-status="setStatus"
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                width="250"
                :label="$t('store.exportMaterial.exportMaterialTable.header.note')"
            >
                <template #default="scope">
                    <div v-if="scope.row.status === AcceptStatus.APPROVE">
                        {{ scope.row.note }}
                    </div>
                    <BaseInputNumber
                        v-model:value="scope.row.note"
                        :placeholder="
                            $t(
                                'store.exportMaterialDetail.exportMaterialDetailTable.placeholder.note',
                            )
                        "
                        @blur="updateExportMaterialNote"
                        v-else
                    />
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('store.exportMaterial.exportMaterialTable.header.actions')"
                fixed="right"
                width="150"
            >
                <template #default="scope">
                    <div class="button-group">
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.exportMaterial.tooltip.detail')"
                            placement="top"
                            v-if="isCanUpdate"
                        >
                            <el-button
                                type="warning"
                                size="mini"
                                @click="onClickUpdateExportMaterial(scope.row)"
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

import { IExportMaterial, IExportMaterialUpdate } from '../../types';
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
import { exportMaterialService, importMaterialService } from '../../services/api.service';
import { HttpStatus } from '@/common/constants';
import { IEmitStatus } from '@/common/types';
import i18n from '@/plugins/vue-i18n';
import { ElLoading } from 'element-plus';
import MenuAcceptStatus from '@/layouts/components/MenuAcceptStatus.vue';
import { AcceptStatus } from '../../constants';

@Options({
    name: 'import-material-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
        MenuAcceptStatus,
    },
})
export default class ExportMaterialTable extends mixins(StoreMixins) {
    get exportList(): IExportMaterial[] {
        return storeModule.exportMaterialList;
    }

    rowId = 0;
    onClickRow(rowData: IExportMaterial): void {
        this.rowId = rowData.id;
    }

    get isCanUpdate(): boolean {
        return (
            checkUserHasPermission(storeModule.userPermissionsExportMaterial, [
                `${PermissionResources.STORE_EXPORT_MATERIAL}_${PermissionActions.UPDATE}`,
            ]) && storeModule.selectedExportMaterial?.status !== AcceptStatus.APPROVE
        );
    }

    get isCanApproveStatus(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsExportMaterial, [
            `${PermissionResources.STORE_EXPORT_MATERIAL}_${PermissionActions.APPROVE_STATUS}`,
        ]);
    }

    onClickUpdateExportMaterial(exportMaterial: IExportMaterial): void {
        storeModule.setQueryStringExportMaterialDetail({
            exportMaterialId: exportMaterial.id,
        });
        storeModule.setSelectedExportMaterial(exportMaterial);
        this.$router.push(`/export-material/${exportMaterial.id}`);
    }

    async setStatus(data: IEmitStatus): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });

        const response = await exportMaterialService.update(data.id, {
            status: data.status
        });

        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                i18n.global.t('store.exportMaterial.message.update.success'),
            );
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getExportMaterials();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                storeModule.setIsShowMaterialFormPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getExportMaterials();
                loading.close();
            }
        }
    }

    async updateExportMaterialNote(data: string): Promise<void> {
        await this.updateExportMaterial({
            note: data ? (data as unknown as string) : '',
        });
    }

    async updateExportMaterial(data: IExportMaterialUpdate): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });

        const response = await importMaterialService.update(this.rowId, data);

        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                i18n.global.t('store.exportMaterialDetail.message.update.success'),
            );
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getImportMaterialOrders();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getImportMaterialOrders();
                loading.close();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
:deep(.form-group) {
    margin-bottom: 1px;
}
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
