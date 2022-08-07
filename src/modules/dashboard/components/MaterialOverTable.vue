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
        </template>
    </BaseTableLayout>
</template>

<script lang="ts">
import { StoreMixins } from '@/modules/store/mixins';
import { IMaterial } from '@/modules/store/types';
import { mixins, Options, Prop } from 'vue-property-decorator';

@Options({
    name: 'material-over-table-component',
})
export default class MaterialOverTable extends mixins(StoreMixins) {
    @Prop({ type: String, default: [] })
    readonly materialList: IMaterial[] | undefined;
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

function Prop(arg0: { type: StringConstructor; default: string; }) { throw new
Error('Function not implemented.'); }
