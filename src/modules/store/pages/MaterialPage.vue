<template>
    <div class="booking-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('store.material.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalMaterials"
            :isShowCreateButton="isCanCreate"
            @create="onClickButtonCreate"
            @onPaginate="handlePaginate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <MaterialTable />
        <MaterialFormPopup />
        <ConvertMaterialFormPopup />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import MaterialTable from '../components/material/MaterialTable.vue';
import { storeModule } from '../store';
import FilterForm from '../components/material/FilterForm.vue';
import MaterialFormPopup from '../components/material/MaterialFormPopup.vue';
import ConvertMaterialFormPopup from '../components/material/ConvertMaterialFormPopup.vue';

@Options({
    components: {
        MaterialTable,
        FilterForm,
        MaterialFormPopup,
        ConvertMaterialFormPopup,
    },
})
export default class MaterialPage extends Vue {
    isToggleFilterForm = true;

    get totalMaterials(): number {
        return storeModule.totalMaterials;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(storeModule.userPermissionsMaterial, [
            `${PermissionResources.STORE_MATERIAL}_${PermissionActions.CREATE}`,
        ]);
    }

    get selectedPage(): number {
        return storeModule.queryStringMaterial?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        storeModule.queryStringMaterial.page = value;
    }

    created(): void {
        storeModule.clearQueryStringMaterial();
        this.getMaterialList();
    }

    async getMaterialList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await storeModule.getMaterials();
        loading.close();
    }

    async handlePaginate(): Promise<void> {
        storeModule.setQueryStringMaterial({ page: this.selectedPage });
        this.getMaterialList();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    onClickButtonCreate(): void {
        storeModule.setIsShowMaterialFormPopUp(true);
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
