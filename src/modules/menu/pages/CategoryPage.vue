<template>
    <div class="category-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('menu.category.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalCategories"
            :isShowCreateButton="isCanCreate"
            @create="onClickButtonCreate"
            @onPaginate="handlePaginate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <category-table />
        <CategoryFormPopup />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import CategoryTable from '../components/category/CategoryTable.vue';
import { menuModule } from '../store';
import CategoryFormPopup from '../components/category/CategoryFormPopup.vue';
import FilterForm from '../components/category/FilterForm.vue';

@Options({
    components: {
        CategoryTable,
        FilterForm,
        CategoryFormPopup,
    },
})
export default class CategoryPage extends Vue {
    isToggleFilterForm = true;

    get totalCategories(): number {
        return menuModule.totalCategories;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(menuModule.userPermissionsCategory, [
            `${PermissionResources.MENU_CATEGORY}_${PermissionActions.CREATE}`,
        ]);
    }

    get selectedPage(): number {
        return menuModule.categoryQueryString?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        menuModule.categoryQueryString.page = value;
    }

    created(): void {
        menuModule.clearCategoryQueryString();
        this.getCategoryList();
    }

    async getCategoryList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await menuModule.getCategories();
        loading.close();
    }

    async handlePaginate(): Promise<void> {
        menuModule.setCategoryQueryString({ page: this.selectedPage });
        this.getCategoryList();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    onClickButtonCreate(): void {
        menuModule.setIsShowCategoryFormPopUp(true);
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
