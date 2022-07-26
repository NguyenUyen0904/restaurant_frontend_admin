<template>
    <BaseTableLayout :data="inventoryDetailList" @row-click="onClickRow">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('store.inventoryDetail.inventoryDetailTable.header.id')"
                type="index"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="nameMaterial"
                width="200"
                :label="
                    $t('store.inventoryDetail.inventoryDetailTable.header.nameMaterial')
                "
            >
                <template #default="scope">
                    {{ scope.row.material.material }}
                </template>
            </el-table-column>
            <el-table-column
                prop="unit"
                width="150"
                :label="$t('store.inventoryDetail.inventoryDetailTable.header.unit')"
            >
                <template #default="scope">
                    {{ scope.row.material.unit }}
                </template>
            </el-table-column>
            <el-table-column
                prop="inventoryQuantity"
                width="250"
                :label="
                    $t(
                        'store.inventoryDetail.inventoryDetailTable.header.inventoryQuantity',
                    )
                "
            >
                <template #default="scope">
                    <div v-if="isApprove(scope.row.status)">
                        {{ scope.row.inventoryQuantity }}
                    </div>
                    <BaseInputNumber
                        v-model:value="scope.row.inventoryQuantity"
                        :placeholder="
                            $t(
                                'store.exportMaterialDetail.exportMaterialDetailTable.placeholder.quantity',
                            )
                        "
                        @blur="updateInventoryQuantity"
                        @change="changeDataRow(scope.row.id)"
                        v-else
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="damagedQuantity"
                width="200"
                :label="
                    $t(
                        'store.inventoryDetail.inventoryDetailTable.header.damagedQuantity',
                    )
                "
            >
                <template #default="scope">
                    <div v-if="isApprove(scope.row.status)">
                        {{ scope.row.damagedQuantity }}
                    </div>
                    <BaseInputNumber
                        v-model:value="scope.row.damagedQuantity"
                        :placeholder="
                            $t(
                                'store.exportMaterialDetail.exportMaterialDetailTable.placeholder.quantity',
                            )
                        "
                        @blur="updateDamagedQuantity"
                        @change="changeDataRow(scope.row.id)"
                        v-else
                    />
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                width="200"
                :label="$t('store.inventoryDetail.inventoryDetailTable.header.note')"
            >
                <template #default="scope">
                    <div v-if="isApprove(scope.row.status)">
                        {{ scope.row.note }}
                    </div>
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
            <el-table-column
                prop="status"
                width="200"
                fixed="right"
                :label="$t('store.inventoryDetail.inventoryDetailTable.header.status')"
            >
                <template #default="scope">
                    <MenuAcceptStatus
                        :status="scope.row.status"
                        :id="scope.row.id"
                        @set-status="setStatus"
                    />
                </template>
            </el-table-column>
        </template>
    </BaseTableLayout>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-property-decorator';

import { IInventoryDetail, IInventoryDetailUpdate } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { StoreMixins } from '../../mixins';
import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { storeModule } from '../../store';
import MenuAcceptStatus from '@/layouts/components/MenuAcceptStatus.vue';
import { IEmitStatus } from '@/common/types';
import { checkInventoryDetailService } from '../../services/api.service';
import { ElLoading } from 'element-plus';
import { HttpStatus } from '@/common/constants';
import i18n from '@/plugins/vue-i18n';
import { AcceptStatus } from '../../constants';

@Options({
    name: 'check-inventory-detail-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
        MenuAcceptStatus,
    },
})
export default class CheckInventoryDetailTable extends mixins(StoreMixins) {
    get inventoryDetailList(): IInventoryDetail[] {
        return storeModule.inventoryDetailList;
    }

    isApprove(status: AcceptStatus): boolean {
        return status === this.AcceptStatus.APPROVE;
    }

    rowId = 0;
    onClickRow(rowData: IInventoryDetail): void {
        this.rowId = rowData.id;
    }

    async updateInventoryQuantity(data: string): Promise<void> {
        await this.updateInventoryDetail({
            damagedQuantity: data ? (data as unknown as number) : 0,
        });
    }

    async updateDamagedQuantity(data: string): Promise<void> {
        await this.updateInventoryDetail({
            inventoryQuantity: data ? (data as unknown as number) : 0,
        });
    }

    async updateNote(data: string): Promise<void> {
        await this.updateInventoryDetail({
            note: data,
        });
    }

    async updateInventoryDetail(data: IInventoryDetailUpdate): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });

        const response = await checkInventoryDetailService.update(this.rowId, data);

        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                i18n.global.t('store.checkInventoryDetail.message.update.success'),
            );
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getInventoryDetails();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getInventoryDetails();
                loading.close();
            }
        }
    }

    async setStatus(data: IEmitStatus): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });

        const response = await checkInventoryDetailService.update(data.id, {
            status: data.status,
        });

        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                i18n.global.t('store.inventoryDetail.message.update.success'),
            );
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getInventoryDetails();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getInventoryDetails();
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
