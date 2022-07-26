<template>
    <BaseTableLayout :data="exportList">
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
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.transporters }}
                </template>
            </el-table-column>
            <el-table-column
                prop="warehouseStaff"
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
                prop="status"
                :label="$t('store.exportMaterial.exportMaterialTable.header.status')"
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
                :label="$t('store.exportMaterial.exportMaterialTable.header.note')"
            >
                <template #default="scope">
                    {{ scope.row.note }}
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
                                @click="onClickUpdateExportMaterial(scope.row.id)"
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

import { IExportMaterial } from '../../types';
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
import { exportMaterialService } from '../../services/api.service';
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
export default class ExportMaterialTable extends mixins(StoreMixins) {
    get exportList(): IExportMaterial[] {
        return storeModule.exportMaterialList;
    }

    isCanUpdate(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsExportMaterial, [
            `${PermissionResources.STORE_EXPORT_MATERIAL}_${PermissionActions.UPDATE}`,
        ]);
    }

    onClickUpdateExportMaterial(id: number): void {
        storeModule.setQueryStringExportMaterialDetail({ exportMaterialId: id });
        this.$router.push(`/export-material/${id}`);
    }

    async setStatus(data: IEmitStatus): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });

        const response = await exportMaterialService.update(data.id, {
            status: data.status,
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
