<template>
    <BaseTableLayout :data="inventoryDetailList">
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
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.material.material }}
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
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.inventoryQuantity }}
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
                prop="damagedQuantity"
                width="200"
                :label="
                    $t(
                        'store.inventoryDetail.inventoryDetailTable.header.damagedQuantity',
                    )
                "
            >
                <template #default="scope">
                    {{ scope.row.damagedQuantity }}
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                width="200"
                :label="$t('store.inventoryDetail.inventoryDetailTable.header.note')"
            >
                <template #default="scope">
                    {{ scope.row.note }}
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

import { IInventoryDetail } from '../../types';
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
