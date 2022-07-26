<template>
    <div class="import-material-detail-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('store.importMaterialDetail.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalImportMaterialDetails"
            @onPaginate="handlePaginate"
            :isShowBackButton="true"
            :isShowCreateButton="isCanCreate"
            @create="onClickButtonCreate"
            @on-click-back-button="onBack"
        >
            <template #sort-box-content>
                <Sort />
            </template>
            <template #custom-button>
                <el-tooltip
                    v-if="isCanCreate"
                    :content="$t('user.list.upload.uploadUser')"
                    placement="top"
                >
                    <el-button
                        :style="{ backgroundImage: `url(${uploadUserImage})` }"
                        size="medium"
                        type="default"
                        @click="onClickButtonUploadUserFile"
                        class="icon-button"
                    />
                </el-tooltip>
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <ImportMaterialDetailTable />
        <ImportMaterialDetailFormPopup />
        <ImportMaterialDetailExcelPopup />
        <ImportMaterialDetailExcelResultPopup />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE, PageName } from '@/common/constants';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import { storeModule } from '../store';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import FilterForm from '../components/importMaterialDetail/FilterForm.vue';
import ImportMaterialDetailTable from '../components/importMaterialDetail/ImportMaterialDetailTable.vue';
import ImportMaterialDetailFormPopup from '../components/importMaterialDetail/ImportMaterialDetailFormPopup.vue';
import ImportMaterialDetailExcelPopup from '../components/importMaterialDetail/ImportMaterialDetailExcelPopup.vue';
import ImportMaterialDetailExcelResultPopup from '../components/importMaterialDetail/ImportMaterialDetailExcelResultPopup.vue';
import { AcceptStatus } from '../constants';

@Options({
    components: {
        FilterForm,
        ImportMaterialDetailTable,
        ImportMaterialDetailFormPopup,
        ImportMaterialDetailExcelPopup,
        ImportMaterialDetailExcelResultPopup,
    },
})
export default class ImportMaterialDetailPage extends Vue {
    isToggleFilterForm = true;

    get totalImportMaterialDetails(): number {
        return storeModule.totalImportMaterialDetails;
    }

    // check permission
    get isCanCreate(): boolean {
        return (
            checkUserHasPermission(storeModule.userPermissionsImportMaterial, [
                `${PermissionResources.STORE_IMPORT_MATERIAL}_${PermissionActions.CREATE}`,
            ]) && storeModule.selectedImportMaterial?.status !== AcceptStatus.APPROVE
        );
    }

    get selectedPage(): number {
        return storeModule.queryStringImportMaterialDetail?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        storeModule.queryStringImportMaterialDetail.page = value;
    }

    get uploadUserImage(): void {
        return require('@/assets/icons/btn.export.svg');
    }

    created(): void {
        if (!storeModule.selectedImportMaterial) {
            this.onBack();
        }
        storeModule.clearQueryStringImportMaterialDetail();
        this.fetchData();
    }

    async fetchData(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await storeModule.getImportMaterialOrders();
        await storeModule.getMaterials();

        loading.close();
    }

    async handlePaginate(): Promise<void> {
        storeModule.setQueryStringImportMaterialDetail({ page: this.selectedPage });
        this.fetchData();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    onBack(): void {
        this.$router.push({ name: PageName.STORE_IMPORT_MATERIAL_PAGE });
    }

    onClickButtonCreate(): void {
        storeModule.setIsShowImportMaterialDetailFormPopUp(true);
    }

    onClickButtonUploadUserFile(): void {
        storeModule.setIsOpenImportMaterialDetailExcelFilePopup(
            !storeModule.isOpenImportMaterialDetailExcelFilePopup,
        );
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
