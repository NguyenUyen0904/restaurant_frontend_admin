<template>
    <div class="import-material-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('store.importMaterial.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalImportMaterials"
            :isShowCreateButton="isCanCreate"
            @create="onClickButtonCreate"
            @onPaginate="handlePaginate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <ImportMaterialTable />
        <ImportMaterialFormPopup />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import { Options, Vue } from 'vue-class-component';
import FilterForm from '../components/importMaterial/FilterForm.vue';
import { storeModule } from '../store';
import ImportMaterialTable from '../components/importMaterial/ImportMaterialTable.vue';
import { ElLoading } from 'element-plus';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import ImportMaterialFormPopup from '../components/importMaterial/ImportMaterialFormPopup.vue';

@Options({
    components: {
        ImportMaterialTable,
        FilterForm,
        ImportMaterialFormPopup,
    },
})
export default class ImportMaterialPage extends Vue {
    isToggleFilterForm = true;

    get totalImportMaterials(): number {
        return storeModule.totalImportMaterials;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsImportMaterial, [
            `${PermissionResources.STORE_IMPORT_MATERIAL}_${PermissionActions.CREATE}`,
        ]);
    }

    get selectedPage(): number {
        return storeModule.queryStringImportMaterial?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        storeModule.queryStringImportMaterial.page = value;
    }

    created(): void {
        storeModule.clearQueryStringImportMaterial();
        this.fetchData();
    }

    async fetchData(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await storeModule.getImportMaterials();
        await storeModule.getSupplierList();
        loading.close();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    onClickButtonCreate(): void {
        storeModule.setIsShowImportMaterialFormPopUp(true);
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
