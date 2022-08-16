<template>
    <BaseTableLayout :data="promotionList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('promotion.promotion.promotionTable.header.id')"
                type="index"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                :label="$t('promotion.promotion.promotionTable.header.name')"
                sortable="custom"
            >
                <template #default="scope">
                    {{ scope.row.name }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="percent"
                :label="$t('promotion.promotion.promotionTable.header.percent')"
            >
                <template #default="scope"> {{ scope.row.percent || 0 }}% </template>
            </el-table-column>
            <el-table-column
                prop="note"
                :label="$t('promotion.promotion.promotionTable.header.note')"
            >
                <template #default="scope">
                    {{ scope.row.note }}
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                width="100"
                align="center"
                :label="$t('promotion.promotion.promotionTable.header.status')"
            >
                <template #default="scope">
                    <div class="accept-status-select">
                        <el-dropdown trigger="click">
                            <div
                                :class="`badge status-field badge-md bg-${statusBadge(
                                    scope.row.status,
                                )}`"
                            >
                                <span> {{ scope.row.status }} </span>
                                <ArrowDownBoldIcon class="action-icon arrow-down" />
                            </div>
                            <template #dropdown>
                                <div v-if="status !== AcceptStatus.APPROVE">
                                    <el-dropdown-menu>
                                        <el-dropdown-item
                                            @click="
                                                setStatus(
                                                    scope.row.id,
                                                    PromotionStatus.ACTIVE,
                                                )
                                            "
                                        >
                                            {{ PromotionStatus.ACTIVE }}
                                        </el-dropdown-item>
                                        <el-dropdown-item
                                            @click="
                                                setStatus(
                                                    scope.row.id,
                                                    PromotionStatus.INACTIVE,
                                                )
                                            "
                                        >
                                            {{ PromotionStatus.INACTIVE }}
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </div>
                            </template>
                        </el-dropdown>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('promotion.promotion.promotionTable.header.actions')"
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

import { Delete as DeleteIcon, Edit as EditIcon } from '@element-plus/icons-vue';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import {
    checkUserHasPermission,
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { setup } from 'vue-class-component';
import { PromotionMixins } from '../mixins';
import { IPromotion, IPromotionUpdateBody } from '../types';
import { promotionModule } from '../store';
import { setupDelete } from '../composition/promotion';
import { PromotionStatus } from '../constants';
import i18n from '@/plugins/vue-i18n';
import { ElLoading } from 'element-plus';
import { promotionService } from '../services/api.service';

@Options({
    name: 'promotion-table-component',
    components: {
        DeleteIcon,
        EditIcon,
    },
})
export default class PromotionTable extends mixins(PromotionMixins) {
    deleteAction = setup(() => setupDelete());

    get promotionList(): IPromotion[] {
        return promotionModule.promotionList;
    }

    get isCanDelete(): boolean {
        return checkUserHasPermission(promotionModule.userPermissionsPromotion, [
            `${PermissionResources.PROMOTION}_${PermissionActions.DELETE}`,
        ]);
    }

    get isCanUpdate(): boolean {
        return checkUserHasPermission(promotionModule.userPermissionsPromotion, [
            `${PermissionResources.PROMOTION}_${PermissionActions.UPDATE}`,
        ]);
    }

    async onClickButtonEdit(updatePromotion: IPromotionUpdateBody): Promise<void> {
        promotionModule.setPromotionSelected(updatePromotion);
        promotionModule.setIsShowPromotionFormPopUp(true);
    }

    async onClickButtonDelete(id: number): Promise<void> {
        await this.deleteAction.deletePromotion(id);
    }

    async setStatus(id: number, status: PromotionStatus): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });

        const response = await promotionService.update(id, {
            status: status,
        });

        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                i18n.global.t('store.checkInventory.message.update.success'),
            );
            const loading = ElLoading.service({
                target: '.content',
            });
            await promotionModule.getPromotions();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            const loading = ElLoading.service({
                target: '.content',
            });
            await promotionModule.getPromotions();
            loading.close();
        }
    }

    statusBadge(status: PromotionStatus): string {
        switch (status) {
            case PromotionStatus.ACTIVE:
                return 'info';
            case PromotionStatus.INACTIVE:
                return 'danger';
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
