<template>
    <div class="promotion-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('promotion.promotion.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalPromotions"
            :isShowCreateButton="isCanCreate"
            @create="onClickButtonCreate"
            @onPaginate="handlePaginate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <promotion-table />
        <PromotionFormPopup />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import PromotionTable from '../components/PromotionTable.vue';
import { promotionModule } from '../store';
import PromotionFormPopup from '../components/PromotionFormPopup.vue';
import FilterForm from '../components/FilterForm.vue';

@Options({
    components: {
        PromotionTable,
        FilterForm,
        PromotionFormPopup,
    },
})
export default class PromotionPage extends Vue {
    isToggleFilterForm = true;

    get totalPromotions(): number {
        return promotionModule.totalPromotions;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(promotionModule.userPermissionsPromotion, [
            `${PermissionResources.MENU_CATEGORY}_${PermissionActions.CREATE}`,
        ]);
    }

    get selectedPage(): number {
        return promotionModule.promotionQueryString?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        promotionModule.promotionQueryString.page = value;
    }

    created(): void {
        promotionModule.clearPromotionQueryString();
        this.getPromotionList();
    }

    async getPromotionList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await promotionModule.getPromotions();
        loading.close();
    }

    async handlePaginate(): Promise<void> {
        promotionModule.setPromotionQueryString({ page: this.selectedPage });
        this.getPromotionList();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    onClickButtonCreate(): void {
        promotionModule.setIsShowPromotionFormPopUp(true);
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
