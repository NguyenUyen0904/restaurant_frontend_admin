<template>
    <BaseFilterFormLayout
        :isToggleFilterForm="isToggleFilterForm"
        @search="handleFilter"
        @reset="resetFilter"
        @keyup.enter="handleFilter"
    >
        <template #filter-title>
            <h5 class="filter-title">{{ $t('common.app.filterForm.search') }}</h5>
        </template>
        <slot>
            <div class="row">
                <div class="col-md-4 col-sm-12">
                    <BaseInputText
                        v-model:value="filterForm.keyword"
                        :placeholder="$t('booking.booking.placeholder.keyword')"
                        :label="$t('booking.booking.filterForm.keyword')"
                    />
                </div>
            </div>
        </slot>
    </BaseFilterFormLayout>
</template>

<script lang="ts">
import { ElLoading } from 'element-plus';
import {
    DEFAULT_FIRST_PAGE,
    DEFAULT_ORDER_BY,
    DEFAULT_ORDER_DIRECTION,
    DEFAULT_SIZE_PER_PAGE,
    LIMIT_PER_PAGE,
} from '@/common/constants';
import { menuModule } from '../../store';
import { IQueryStringCategory } from '../../types';
import { Prop, mixins } from 'vue-property-decorator';
import { MenuMixins } from '../../mixins';

export default class FilterForm extends mixins(MenuMixins) {
    @Prop({ default: false }) readonly isToggleFilterForm!: boolean;

    filterForm = {
        page: DEFAULT_FIRST_PAGE,
        limit: LIMIT_PER_PAGE,
        orderBy: DEFAULT_ORDER_BY,
        orderDirection: DEFAULT_ORDER_DIRECTION,
        keyword: '',
    } as IQueryStringCategory;

    async resetFilter(): Promise<void> {
        this.filterForm = {
            page: DEFAULT_FIRST_PAGE,
            limit: LIMIT_PER_PAGE,
            orderBy: DEFAULT_ORDER_BY,
            orderDirection: DEFAULT_ORDER_DIRECTION,
            keyword: '',
        };
        menuModule.clearCategoryQueryString();
        await this.handleFilter();
    }

    async handleFilter(): Promise<void> {
        menuModule.setCategoryQueryString({
            page: DEFAULT_FIRST_PAGE,
            limit: DEFAULT_SIZE_PER_PAGE,
            keyword: this.filterForm.keyword?.trim(),
        });
        const loading = ElLoading.service({
            target: '.content',
        });
        await menuModule.getCategories();
        loading.close();
    }
}
</script>

<style lang="scss" scoped>
.filter-title {
    font-weight: bold;
    margin-bottom: 8px;
}
:deep(.form-group) {
    margin-bottom: 0 !important;
}
:deep(label) {
    font-size: 13px;
}
</style>
