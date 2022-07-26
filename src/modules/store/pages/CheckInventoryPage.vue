<template>
    <div class="supplier-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('store.checkInventory.pageName')"
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
        <CheckInventoryTable />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import CheckInventoryTable from '../components/checkInventory/CheckInventoryTable.vue';
import { storeModule } from '../store';
import FilterForm from '../components/checkInventory/FilterForm.vue';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import {
    checkUserHasPermission,
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { checkInventoryService } from '../services/api.service';
import i18n from '@/plugins/vue-i18n';

@Options({
    components: {
        CheckInventoryTable,
        FilterForm,
    },
})
export default class CheckInventoryPage extends Vue {
    isToggleFilterForm = true;

    get totalSuppliers(): number {
        return 20;
    }

    // check permission

    get selectedPage(): number {
        return storeModule.queryStringCheckInventory?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        storeModule.queryStringCheckInventory.page = value;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsCheckInventory, [
            `${PermissionResources.STORE_CHECK_INVENTORY}_${PermissionActions.CREATE}`,
        ]);
    }

    created(): void {
        storeModule.clearQueryStringCheckInventory();
        this.getCheckInventoryList();
    }

    async getCheckInventoryList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await storeModule.getCheckInventories();
        loading.close();
    }

    async handlePaginate(): Promise<void> {
        storeModule.setQueryStringCheckInventory({ page: this.selectedPage });
        this.getCheckInventoryList();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    async onClickButtonCreate(): Promise<void> {
        const loading = ElLoading.service({
            target: '.import-material-form-popup',
        });
        const response = await checkInventoryService.create({});
        if (response.success) {
            showSuccessNotificationFunction(
                i18n.global.t('store.importMaterial.message.create.success'),
            );
            await storeModule.getCheckInventories();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            loading.close();
        }
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
