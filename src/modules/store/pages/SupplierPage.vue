<template>
    <div class="supplier-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('store.supplier.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalSuppliers"
            :isShowCreateButton="isCanCreate"
            @create="onClickButtonCreate"
            @onPaginate="handlePaginate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <SupplierTable />
        <SupplierFormPopup />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import SupplierTable from '../components/supplier/SupplierTable.vue';
import { storeModule } from '../store';
import FilterForm from '../components/supplier/FilterForm.vue';
import SupplierFormPopup from '../components/supplier/SupplierFormPopup.vue';

@Options({
    components: {
        SupplierTable,
        FilterForm,
        SupplierFormPopup,
    },
})
export default class SupplierPage extends Vue {
    isToggleFilterForm = true;

    get totalSuppliers(): number {
        return 20;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsSupplier, [
            `${PermissionResources.STORE_SUPPLIER}_${PermissionActions.CREATE}`,
        ]);
    }

    get selectedPage(): number {
        return storeModule.queryStringSupplier?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        storeModule.queryStringSupplier.page = value;
    }

    created(): void {
        storeModule.clearQueryStringSupplier();
        this.getSupplierList();
    }

    async getSupplierList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await storeModule.getSuppliers();
        loading.close();
    }

    async handlePaginate(): Promise<void> {
        storeModule.setQueryStringMaterial({ page: this.selectedPage });
        this.getSupplierList();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    onClickButtonCreate(): void {
        storeModule.setIsShowSupplierFormPopUp(true);
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
