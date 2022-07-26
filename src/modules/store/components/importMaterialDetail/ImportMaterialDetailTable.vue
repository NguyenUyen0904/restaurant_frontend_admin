<template>
    <BaseTableLayout :data="importDetailList" @row-click="onClickRow">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="
                    $t('store.importMaterialDetail.importMaterialDetailTable.header.id')
                "
                type="index"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="nameMaterial"
                :label="
                    $t(
                        'store.importMaterialDetail.importMaterialDetailTable.header.nameMaterial',
                    )
                "
                sortable="custom"
                width="200"
            >
                <template #default="scope">
                    {{ scope.row?.material?.material }}
                </template>
            </el-table-column>
            <el-table-column
                prop="unit"
                :label="
                    $t('store.importMaterialDetail.importMaterialDetailTable.header.unit')
                "
            >
                <template #default="scope">
                    {{ scope.row?.material?.unit }}
                </template>
            </el-table-column>
            <el-table-column
                prop="importPrice"
                :label="
                    $t(
                        'store.importMaterialDetail.importMaterialDetailTable.header.pricePerUnit',
                    )
                "
                sortable="custom"
            >
                <template #default="scope">
                    <div v-if="isApprove">{{ parseMoney(scope.row.pricePerUnit) }}</div>
                    <BaseInputNumber
                        v-model:value="scope.row.pricePerUnit"
                        :placeholder="
                            $t(
                                'store.importMaterialDetail.importMaterialDetailTable.placeholder.pricePerUnit',
                            )
                        "
                        @blur="updatePricePerUnit"
                        v-else
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="quantity"
                :label="
                    $t(
                        'store.importMaterialDetail.importMaterialDetailTable.header.quantity',
                    )
                "
            >
                <template #default="scope">
                    <div v-if="isApprove">{{ scope.row.quantity }}</div>
                    <BaseInputNumber
                        v-model:value="scope.row.quantity"
                        :placeholder="
                            $t(
                                'store.importMaterialDetail.importMaterialDetailTable.placeholder.quantity',
                            )
                        "
                        v-else
                        @blur="updateQuantity"
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                :label="
                    $t('store.importMaterialDetail.importMaterialDetailTable.header.note')
                "
            >
                <template #default="scope">
                    <div v-if="isApprove">{{ scope.row.note }}</div>
                    <BaseInputText
                        v-model:value="scope.row.note"
                        :placeholder="
                            $t(
                                'store.importMaterialDetail.importMaterialDetailTable.placeholder.note',
                            )
                        "
                        v-else
                        @blur="updateNote"
                    />
                </template>
            </el-table-column>
        </template>
    </BaseTableLayout>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-property-decorator';

import { IImportMaterialDetail, IImportMaterialDetailCreate } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { StoreMixins } from '../../mixins';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { storeModule } from '../../store';
import { importMaterialDetailService } from '../../services/api.service';
import { HttpStatus } from '@/common/constants';
import { IEmitStatus } from '@/common/types';
import i18n from '@/plugins/vue-i18n';
import { ElLoading } from 'element-plus';
import MenuAcceptStatus from '@/layouts/components/MenuAcceptStatus.vue';
import { AcceptStatus } from '../../constants';

@Options({
    name: 'import-material-detail-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
        MenuAcceptStatus,
    },
})
export default class ImportMaterialDetailTable extends mixins(StoreMixins) {
    get importDetailList(): IImportMaterialDetail[] {
        return storeModule.importMaterialDetailList;
    }

    get isApprove(): boolean {
        return storeModule.selectedImportMaterial?.status === AcceptStatus.APPROVE;
    }

    rowId = 0;
    onClickRow(importMaterialDetail: IImportMaterialDetail): void {
        this.rowId = importMaterialDetail.id;
    }

    async updatePricePerUnit(data: string): Promise<void> {
        await this.updateImportDetail({
            pricePerUnit: data ? (data as unknown as number) : 0,
        });
    }

    async updateQuantity(data: string): Promise<void> {
        await this.updateImportDetail({
            quantity: data ? (data as unknown as number) : 0,
        });
    }

    async updateNote(data: string): Promise<void> {
        await this.updateImportDetail({
            note: data,
        });
    }

    async updateImportDetail(data: IImportMaterialDetailCreate): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });

        const response = await importMaterialDetailService.update(this.rowId, data);

        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                i18n.global.t('store.importMaterialDetail.message.update.success'),
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

    async setStatus(data: IEmitStatus): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });

        const response = await importMaterialDetailService.update(data.id, {
            status: data.status,
        });

        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                i18n.global.t('store.importMaterialDetail.message.update.success'),
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
