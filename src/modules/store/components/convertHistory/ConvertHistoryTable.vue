<template>
    <BaseTableLayout :data="convertHistoryList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('store.convertHistory.convertHistoryTable.header.id')"
                type="index"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="convertTime"
                :label="$t('store.convertHistory.convertHistoryTable.header.convertTime')"
                width="220"
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
                prop="performer"
                :label="$t('store.convertHistory.convertHistoryTable.header.performer')"
                width="175"
            >
                <template #default="scope">
                    {{ scope.row.performer.fullName }}
                </template>
            </el-table-column>
            <el-table-column
                prop="convertFrom"
                :label="$t('store.convertHistory.convertHistoryTable.header.convertFrom')"
                width="175"
            >
                <template #default="scope">
                    {{
                        parseMaterial(
                            scope.row.materialFrom.material,
                            scope.row.materialFrom.unit,
                        )
                    }}
                </template>
            </el-table-column>
            <el-table-column
                prop="quantityFrom"
                :label="
                    $t('store.convertHistory.convertHistoryTable.header.quantityFrom')
                "
                width="250"
            >
                <template #default="scope">
                    {{ scope.row.quantityFrom }}
                </template>
            </el-table-column>
            <el-table-column
                prop="convertTo"
                :label="$t('store.convertHistory.convertHistoryTable.header.convertTo')"
                width="175"
            >
                <template #default="scope">
                    {{
                        parseMaterial(
                            scope.row.materialTo.material,
                            scope.row.materialTo.unit,
                        )
                    }}
                </template>
            </el-table-column>
            <el-table-column
                prop="quantityTo"
                :label="$t('store.convertHistory.convertHistoryTable.header.quantityTo')"
                width="250"
            >
                <template #default="scope">
                    {{ scope.row.quantityTo }}
                </template>
            </el-table-column>
            <el-table-column
                prop="note"
                :label="$t('store.convertHistory.convertHistoryTable.header.note')"
                width="150"
            >
                <template #default="scope">
                    {{ scope.row.note }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('store.convertHistory.convertHistoryTable.header.detail')"
                fixed="right"
                width="150"
            >
                <template #default="scope">
                    <div class="button-group">
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.convertHistory.tooltip.detail')"
                            placement="top"
                            v-if="isCanUpdate"
                        >
                            <el-button
                                type="warning"
                                size="mini"
                                @click="onClickDetail(scope.row)"
                            >
                                <DocumentIcon class="action-icon" />
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

import { IConvertHistory } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { storeModule } from '../../store';
import { StoreMixins } from '../../mixins';
import { Document as DocumentIcon } from '@element-plus/icons-vue';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';

@Options({
    name: 'import-material-table-component',
    components: {
        CompIcon,
        DocumentIcon,
    },
})
export default class ExportMaterialTable extends mixins(StoreMixins) {
    get convertHistoryList(): IConvertHistory[] {
        return storeModule.convertHistoryList;
    }

    isCanUpdate(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsConvert, [
            `${PermissionResources.STORE_CONVERT}_${PermissionActions.UPDATE}`,
        ]);
    }

    onClickDetail(convertMaterial: IConvertHistory): void {
        storeModule.setSelectedConvertMaterial(convertMaterial);
        storeModule.setIsShowConvertHistoryFormPopUp(true);
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
