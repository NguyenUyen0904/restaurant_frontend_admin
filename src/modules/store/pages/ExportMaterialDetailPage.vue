<template>
    <div class="export-material-detail-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('store.exportMaterialDetail.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalExportMaterialDetails"
            @onPaginate="handlePaginate"
            :isShowBackButton="false"
            @on-click-back-button="onBack"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <ExportMaterialDetailTable />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE, PageName } from '@/common/constants';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import ExportMaterialDetailTable from '../components/exportMaterialDetail/ExportMaterialDetailTable.vue';
import { storeModule } from '../store';
import FilterForm from '../components/exportMaterialDetail/FilterForm.vue';

@Options({
    components: {
        ExportMaterialDetailTable,
        FilterForm,
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
        storeModule.clearQueryStringExportMaterialDetail();
        this.getExportMaterialDetailList();
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

    onBack(): void {
        this.$router.push({ name: PageName.STORE_EXPORT_PAGE });
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
