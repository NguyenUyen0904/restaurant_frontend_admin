<template>
    <div class="inventory-detail-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('store.inventoryDetail.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalSuppliers"
            @onPaginate="handlePaginate"
            :isShowBackButton="true"
            @on-click-back-button="onBack"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <InventoryDetailTable />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE, PageName } from '@/common/constants';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import InventoryDetailTable from '../components/checkInventoryDetail/CheckInventoryDetailTable.vue';
import { storeModule } from '../store';
import FilterForm from '../components/checkInventoryDetail/FilterForm.vue';

@Options({
    components: {
        InventoryDetailTable,
        FilterForm,
    },
})
export default class CheckInventoryDetailPage extends Vue {
    isToggleFilterForm = true;

    get totalSuppliers(): number {
        return 20;
    }

    // check permission

    get selectedPage(): number {
        return storeModule.queryStringInventoryDetail?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        storeModule.queryStringInventoryDetail.page = value;
    }

    created(): void {
        storeModule.clearQueryStringInventoryDetail();
        this.getInventoryDetailList();
    }

    async getInventoryDetailList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await storeModule.getInventoryDetails();
        loading.close();
    }

    async handlePaginate(): Promise<void> {
        storeModule.setQueryStringInventoryDetail({ page: this.selectedPage });
        this.getInventoryDetailList();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    onBack(): void {
        this.$router.push({ name: PageName.STORE_CHECK_INVENTORY_PAGE });
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
