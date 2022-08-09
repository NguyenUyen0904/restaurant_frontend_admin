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
                            v-if="isCanUpdate(scope.row?.status)"
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
                            v-if="isCanDelete(scope.row?.status)"
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
import { checkUserHasPermission } from '@/utils/helper';
import { setup } from 'vue-class-component';
import { PromotionMixins } from '../mixins';
import { IPromotion, IPromotionUpdateBody } from '../types';
import { promotionModule } from '../store';
import { setupDelete } from '../composition/promotion';

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

    isCanDelete(): boolean {
        return checkUserHasPermission(promotionModule.userPermissionsPromotion, [
            `${PermissionResources.MENU_CATEGORY}_${PermissionActions.DELETE}`,
        ]);
    }

    isCanUpdate(): boolean {
        return checkUserHasPermission(promotionModule.userPermissionsPromotion, [
            `${PermissionResources.MENU_CATEGORY}_${PermissionActions.UPDATE}`,
        ]);
    }

    async onClickButtonEdit(updatePromotion: IPromotionUpdateBody): Promise<void> {
        promotionModule.setPromotionSelected(updatePromotion);
        promotionModule.setIsShowPromotionFormPopUp(true);
    }

    async onClickButtonDelete(id: number): Promise<void> {
        await this.deleteAction.deletePromotion(id);
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
