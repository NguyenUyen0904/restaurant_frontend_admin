<template>
    <div class="food-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('menu.food.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalFoods"
            :isShowCreateButton="isCanCreate"
            @create="onClickButtonCreate"
            @onPaginate="handlePaginate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <food-table />
        <food-form-popup />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import FoodTable from '../components/food/FoodTable.vue';
import { menuModule } from '../store';
import FoodFormPopup from '../components/food/FoodFormPopup.vue';
import FilterForm from '../components/food/FilterForm.vue';

@Options({
    components: {
        FoodTable,
        FilterForm,
        FoodFormPopup,
    },
})
export default class FoodPage extends Vue {
    isToggleFilterForm = true;

    get totalFoods(): number {
        return menuModule.totalFoods;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(menuModule.userPermissionsFood, [
            `${PermissionResources.MENU_FOOD}_${PermissionActions.CREATE}`,
        ]);
    }

    get selectedPage(): number {
        return menuModule.foodQueryString?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        menuModule.foodQueryString.page = value;
    }

    created(): void {
        menuModule.clearFoodQueryString();
        this.getFoodList();
        menuModule.getDropdownCategories();
    }

    async getFoodList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await menuModule.getFoods();
        loading.close();
    }

    async handlePaginate(): Promise<void> {
        menuModule.setFoodQueryString({ page: this.selectedPage });
        this.getFoodList();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    onClickButtonCreate(): void {
        menuModule.setIsShowFoodFormPopUp(true);
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
