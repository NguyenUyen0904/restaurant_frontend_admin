<template>
    <div class="export-material-detail-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('store.exportMaterialDetail.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalExportMaterialDetails"
            @onPaginate="handlePaginate"
            :isShowBackButton="true"
            :isShowCreateButton="isCanCreate"
            @on-click-back-button="onBack"
            @create="onClickButtonCreate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <ExportMaterialDetailTable />
        <ExportMaterialDetailFormPopup />
        <ExportMaterialDetailExcelPopup />
        <ExportMaterialDetailExcelResultPopup />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE, PageName } from '@/common/constants';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import ExportMaterialDetailTable from '../components/exportMaterialDetail/ExportMaterialDetailTable.vue';
import { storeModule } from '../store';
import FilterForm from '../components/exportMaterialDetail/FilterForm.vue';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { AcceptStatus } from '../constants';
import ExportMaterialDetailFormPopup from '../components/exportMaterialDetail/ExportMaterialDetailFormPopup.vue';
import ExportMaterialDetailExcelPopup from '../components/exportMaterialDetail/ExportMaterialDetailExcelPopup.vue';
import ExportMaterialDetailExcelResultPopup from '../components/exportMaterialDetail/ExportMaterialDetailExcelResultPopup.vue';

@Options({
    components: {
        ExportMaterialDetailTable,
        FilterForm,
        ExportMaterialDetailFormPopup,
        ExportMaterialDetailExcelPopup,
        ExportMaterialDetailExcelResultPopup,
    },
})
export default class ExportMaterialDetailPage extends Vue {
    isToggleFilterForm = true;

    get totalExportMaterialDetails(): number {
        return storeModule.totalExportMaterialDetails;
    }

    // check permission

    get selectedPage(): number {
        return storeModule.queryStringExportMaterialDetail?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        storeModule.queryStringExportMaterialDetail.page = value;
    }

    created(): void {
        if (!storeModule.selectedExportMaterial) {
            this.onBack();
        }
        storeModule.clearQueryStringExportMaterialDetail();
        this.fetchData();
    }

    async getExportMaterialDetailList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await storeModule.getExportMaterialOrders();
        loading.close();
    }

    async handlePaginate(): Promise<void> {
        storeModule.setQueryStringExportMaterialDetail({ page: this.selectedPage });
        this.getExportMaterialDetailList();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    // check permission
    get isCanCreate(): boolean {
        return (
            checkUserHasPermission(storeModule.userPermissionsExportMaterial, [
                `${PermissionResources.STORE_EXPORT_MATERIAL}_${PermissionActions.CREATE}`,
            ]) && storeModule.selectedExportMaterial?.status !== AcceptStatus.APPROVE
        );
    }

    onClickButtonCreate(): void {
        storeModule.setIsShowExportMaterialDetailFormPopUp(true);
    }

    onBack(): void {
        this.$router.push({ name: PageName.STORE_EXPORT_PAGE });
    }

    async fetchData(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        this.getExportMaterialDetailList();
        await storeModule.getMaterials();
        loading.close();
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
