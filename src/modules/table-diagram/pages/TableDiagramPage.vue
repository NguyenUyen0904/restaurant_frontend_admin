<template>
    <BaseListPageHeader
        @toggle-filter-form="toggleFilterForm"
        :pageTitle="$t('tableDiagram.table.pageName')"
        :hasSortBox="true"
        :isShowCreateButton="isCanCreate"
        @create="onClickButtonCreate"
        @onPaginate="handlePaginate"
    >
        <template #sort-box-content>
            <Sort />
        </template>
    </BaseListPageHeader>
    <TableDiagram />
    <TableFormPopup />
</template>

<script lang="ts">
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import TableDiagram from '../components/TableDiagram.vue';
import TableFormPopup from '../components/TableFormPopup.vue';
import { tableDiagramModule } from '../store';
import { ITable } from '../types';

@Options({
    name: 'table-diagram-component',
    components: {
        TableDiagram,
        TableFormPopup,
    },
})
export default class TableDiagramPage extends Vue {
    get tableList(): ITable[] {
        return tableDiagramModule.tableList || [];
    }

    isCanCreate(): boolean {
        return checkUserHasPermission(tableDiagramModule.userPermissionsTable, [
            `${PermissionResources.TABLE_DIAGRAM}_${PermissionActions.CREATE}`,
        ]);
    }

    created(): void {
        tableDiagramModule.clearQueryString();
        this.getTableList();
    }

    async getTableList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await tableDiagramModule.getTables();
        loading.close();
    }

    onClickButtonCreate(): void {
        tableDiagramModule.setIsShowTableFormPopUp(true);
    }
}
</script>

<style lang="scss" scoped>
.img-item {
    width: 75px;
    height: 75px;
    margin: 20px auto;
}

.list-note-diagram {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    .note-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        .note-color {
            width: 30px;
            height: 30px;
            margin-right: 20px;
            border-radius: 5px;
        }

        .booked {
            background: #ebff78;
        }

        .used {
            background: #9eb3fa;
        }

        .not-enough {
            opacity: 0.2;
        }

        .selected {
            border: 1px solid #ff0000;
        }
    }
}

.list-table {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    border-top: 1px solid #bebebe;
    border-bottom: 1px solid #bebebe;
}
</style>
