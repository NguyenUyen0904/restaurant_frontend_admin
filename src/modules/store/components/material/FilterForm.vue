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
                        :placeholder="$t('booking.list.placeholder.keyword')"
                        :label="$t('booking.list.filterForm.keyword')"
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
import { storeModule } from '../../store';
import { Prop, mixins } from 'vue-property-decorator';
import { StoreMixins } from '../../mixins';
import { IQueryStringMaterial } from '../../types';

export default class FilterForm extends mixins(StoreMixins) {
    @Prop({ default: false }) readonly isToggleFilterForm!: boolean;

    filterForm = {
        page: DEFAULT_FIRST_PAGE,
        limit: LIMIT_PER_PAGE,
        orderBy: DEFAULT_ORDER_BY,
        orderDirection: DEFAULT_ORDER_DIRECTION,
        keyword: '',
    } as IQueryStringMaterial;

    async resetFilter(): Promise<void> {
        this.filterForm = {
            page: DEFAULT_FIRST_PAGE,
            limit: LIMIT_PER_PAGE,
            orderBy: DEFAULT_ORDER_BY,
            orderDirection: DEFAULT_ORDER_DIRECTION,
            keyword: '',
        };
        storeModule.clearQueryStringMaterial();
        await this.handleFilter();
    }

    async handleFilter(): Promise<void> {
        storeModule.setQueryStringMaterial({
            page: DEFAULT_FIRST_PAGE,
            limit: DEFAULT_SIZE_PER_PAGE,
            keyword: this.filterForm.keyword?.trim(),
        });
        const loading = ElLoading.service({
            target: '.content',
        });
        await storeModule.getMaterials();
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
