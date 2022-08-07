<template>
    <BaseTableLayout :data="materialList">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('store.material.materialTable.header.id')"
                type="index"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="material"
                :label="$t('store.material.materialTable.header.material')"
                width="150"
            >
                <template #default="scope">
                    {{ scope.row.material }}
                </template>
            </el-table-column>
            <el-table-column
                prop="quantity"
                :label="$t('store.material.materialTable.header.quantity')"
                min-width="120"
            >
                <template #default="scope">
                    {{ scope.row.quantity }}
                </template>
            </el-table-column>
            <el-table-column
                prop="limitOver"
                :label="$t('store.material.materialTable.header.limitOver')"
                min-width="175"
            >
                <template #default="scope">
                    {{ scope.row.limitOver }}
                </template>
            </el-table-column>
            <el-table-column
                prop="unit"
                :label="$t('store.material.materialTable.header.unit')"
                min-width="120"
            >
                <template #default="scope">
                    {{ scope.row.unit }}
                </template>
            </el-table-column>
            <el-table-column
                prop="updateAt"
                :label="$t('store.material.materialTable.header.updateAt')"
                width="175"
            >
                <template #default="scope">
                    {{
                        scope.row.updatedAt
                            ? parseDateTime(
                                  scope.row.updatedAt,
                                  YYYY_MM_DD_HYPHEN_HH_MM_COLON,
                              )
                            : ''
                    }}
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('store.material.materialTable.header.actions')"
                fixed="right"
                width="200"
            >
                <template #default="scope">
                    <div class="button-group">
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.material.tooltip.edit')"
                            placement="top"
                            v-if="isCanConvert"
                        >
                            <el-button
                                type="primary"
                                size="mini"
                                @click="onClickButtonConvert(scope.row)"
                            >
                                <SwitchIcon class="action-icon" />
                            </el-button>
                        </el-tooltip>
                        <el-tooltip
                            effect="dark"
                            :content="$t('store.material.tooltip.edit')"
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
                            :content="$t('store.material.tooltip.delete')"
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

import { IMaterial, IMaterialUpdate } from '../../types';
import CompIcon from '../../../../components/CompIcon.vue';
import { storeModule } from '../../store';
import { StoreMixins } from '../../mixins';
import {
    Delete as DeleteIcon,
    Edit as EditIcon,
    Switch as SwitchIcon,
} from '@element-plus/icons-vue';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { setupDelete } from '../../composition/materialList';
import { setup } from 'vue-class-component';

@Options({
    name: 'material-table-component',
    components: {
        CompIcon,
        DeleteIcon,
        EditIcon,
        SwitchIcon,
    },
})
export default class MaterialTable extends mixins(StoreMixins) {
    deleteAction = setup(() => setupDelete());

    get materialList(): IMaterial[] {
        return storeModule.materialList;
    }

    isCanConvert(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsMaterial, [
            `${PermissionResources.STORE_MATERIAL}_${PermissionActions.CONVERT_MATERIAL}`,
        ]);
    }

    isCanDelete(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsMaterial, [
            `${PermissionResources.STORE_MATERIAL}_${PermissionActions.DELETE}`,
        ]);
    }

    isCanUpdate(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsMaterial, [
            `${PermissionResources.MENU_CATEGORY}_${PermissionActions.UPDATE}`,
        ]);
    }

    onClickButtonConvert(convertMaterial: IMaterialUpdate): void {
        storeModule.setSelectedMaterial(convertMaterial);
        storeModule.setIsShowConvertMaterialFormPopUp(true);
    }

    onClickButtonEdit(updateMaterial: IMaterialUpdate): void {
        storeModule.setSelectedMaterial(updateMaterial);
        storeModule.setIsShowMaterialFormPopUp(true);
    }

    async onClickButtonDelete(id: number): Promise<void> {
        await this.deleteAction.deleteMaterial(id);
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
