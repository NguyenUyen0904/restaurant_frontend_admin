<template>
    <BaseTableLayout :data="materialExportList" @row-click="onClickRow">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="
                    $t('store.exportMaterialDetail.exportMaterialDetailTable.header.id')
                "
                type="index"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="nameMaterial"
                :label="
                    $t(
                        'store.exportMaterialDetail.exportMaterialDetailTable.header.nameMaterial',
                    )
                "
            >
                <template #default="scope">
                    {{ scope.row.material.material }}
                </template>
            </el-table-column>
            <el-table-column
                prop="unit"
                :label="
                    $t('store.exportMaterialDetail.exportMaterialDetailTable.header.unit')
                "
            >
                <template #default="scope">
                    {{ scope.row.material.unit }}
                </template>
            </el-table-column>
            <el-table-column
                prop="exportPrice"
                :label="
                    $t(
                        'store.exportMaterialDetail.exportMaterialDetailTable.header.pricePerUnit',
                    )
                "
            >
                <template #default="scope">
                    <div v-if="isApprove">{{ parseMoney(scope.row.pricePerUnit) }}</div>
                    <BaseInputNumber
                        v-model:value="scope.row.pricePerUnit"
                        :placeholder="
                            $t(
                                'store.exportMaterialDetail.exportMaterialDetailTable.placeholder.pricePerUnit',
                            )
                        "
                        @blur="updatePricePerUnit"
                        @change="changeDataRow(scope.row.id)"
                        v-else
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="quantity"
                :label="
                    $t(
                        'store.exportMaterialDetail.exportMaterialDetailTable.header.quantity',
                    )
                "
            >
                <template #default="scope">
                    <div v-if="isApprove">{{ scope.row.quantity }}</div>
                    <BaseInputNumber
                        v-model:value="scope.row.quantity"
                        :placeholder="
                            $t(
                                'store.exportMaterialDetail.exportMaterialDetailTable.placeholder.quantity',
                            )
                        "
                        @blur="updateQuantity"
                        @change="changeDataRow(scope.row.id)"
                        v-else
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                :label="
                    $t('store.exportMaterialDetail.exportMaterialDetailTable.header.note')
                "
            >
                <template #default="scope">
                    <div v-if="isApprove">{{ scope.row.note }}</div>
                    <BaseInputText
                        v-model:value="scope.row.note"
                        :placeholder="
                            $t(
                                'store.exportMaterialDetail.exportMaterialDetailTable.placeholder.note',
                            )
                        "
                        v-else
                        @blur="updateNote"
                        @change="changeDataRow(scope.row.id)"
                    />
                </template>
            </el-table-column>
        </template>
    </BaseTableLayout>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-property-decorator';

import { IExportMaterialDetail, IExportMaterialDetailCreate } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { StoreMixins } from '../../mixins';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { storeModule } from '../../store';
import { exportMaterialDetailService } from '../../services/api.service';
import { HttpStatus } from '@/common/constants';
import { IEmitStatus } from '@/common/types';
import i18n from '@/plugins/vue-i18n';
import { ElLoading } from 'element-plus';
import MenuAcceptStatus from '@/layouts/components/MenuAcceptStatus.vue';

@Options({
    name: 'export-material-detail-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
        MenuAcceptStatus,
    },
})
export default class ExportMaterialDetailTable extends mixins(StoreMixins) {
    get materialExportList(): IExportMaterialDetail[] {
        return storeModule.exportMaterialDetailList;
    }

    get isApprove(): boolean {
        return storeModule.selectedExportMaterial?.status === this.AcceptStatus.APPROVE;
    }

    rowId = 0;
    onClickRow(exportMaterialDetail: IExportMaterialDetail): void {
        this.rowId = exportMaterialDetail.id;
    }

    async updatePricePerUnit(data: string): Promise<void> {
        await this.updateExportDetail({
            pricePerUnit: data ? (data as unknown as number) : 0,
        });
    }

    async updateQuantity(data: string): Promise<void> {
        await this.updateExportDetail({
            quantity: data ? (data as unknown as number) : 0,
        });
    }

    async updateNote(data: string): Promise<void> {
        await this.updateExportDetail({
            note: data,
        });
    }

    async updateExportDetail(data: IExportMaterialDetailCreate): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });

        const response = await exportMaterialDetailService.update(this.rowId, data);

        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                i18n.global.t('store.exportMaterialDetail.message.update.success'),
            );
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getExportMaterialOrders();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getExportMaterialOrders();
                loading.close();
            }
        }
    }

    async setStatus(data: IEmitStatus): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });

        const response = await exportMaterialDetailService.update(data.id, {
            status: data.status,
        });

        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                i18n.global.t('store.exportMaterialDetail.message.update.success'),
            );
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getExportMaterialOrders();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getExportMaterialOrders();
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
