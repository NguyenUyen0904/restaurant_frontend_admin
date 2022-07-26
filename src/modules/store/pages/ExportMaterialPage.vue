<template>
    <div class="export-material-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('store.exportMaterial.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalExportMaterials"
            :isShowCreateButton="isCanCreate"
            @create="onClickButtonCreate"
            @onPaginate="handlePaginate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <ExportMaterialTable />
        <ExportMaterialFormPopup />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import ExportMaterialTable from '../components/exportMaterial/ExportMaterialTable.vue';
import { storeModule } from '../store';
import FilterForm from '../components/exportMaterial/FilterForm.vue';
import ExportMaterialFormPopup from '../components/exportMaterial/ExportMaterialFormPopup.vue';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';

@Options({
    components: {
        ExportMaterialTable,
        FilterForm,
        ExportMaterialFormPopup,
    },
})
export default class ExportMaterialPage extends Vue {
    isToggleFilterForm = true;

    get totalExportMaterials(): number {
        return storeModule.totalExportMaterials;
    }

    get selectedPage(): number {
        return storeModule.queryStringExportMaterial?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        storeModule.queryStringExportMaterial.page = value;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsExportMaterial, [
            `${PermissionResources.STORE_EXPORT_MATERIAL}_${PermissionActions.CREATE}`,
        ]);
    }

    created(): void {
        storeModule.clearQueryStringExportMaterial();
        this.getExportMaterialList();
    }

    async getExportMaterialList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await storeModule.getExportMaterials();
        loading.close();
    }

    async handlePaginate(): Promise<void> {
        storeModule.setQueryStringExportMaterial({ page: this.selectedPage });
        this.getExportMaterialList();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    onClickButtonCreate(): void {
        storeModule.setIsShowExportMaterialFormPopUp(true);
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
