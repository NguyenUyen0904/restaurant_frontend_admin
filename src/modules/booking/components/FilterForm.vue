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
                <div class="col-xl-4 col-md-4 col-12">
                    <label class="text-start w-100 fw-bold" style="margin-bottom: 8px">{{
                        $t('booking.list.filterForm.arrivalTimeRange')
                    }}</label>
                    <BaseDatePickerRange
                        v-model:value="arrivalTimeRange"
                        type="datetimerange"
                        :date-format="YYYY_MM_DD_HYPHEN_HH_MM_COLON"
                        :value-format="YYYY_MM_DD_HYPHEN_HH_MM_COLON"
                        size="medium"
                        :range-separator="$t('booking.list.filterForm.to')"
                        :start-placeholder="$t('booking.list.filterForm.startDate')"
                        :end-placeholder="$t('booking.list.filterForm.endDate')"
                    />
                </div>
                <div class="col-md-4 col-sm-6">
                    <BaseMultipleSelect
                        v-model:value="filterForm.status"
                        :placeholder="$t('booking.list.placeholder.status')"
                        :label="$t('booking.list.filterForm.status')"
                        :options="bookingStatusOptions"
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
import { bookingStatusOptions } from '../constants';
import { bookingModule } from '../store';
import { IQueryStringBooking } from '../types';
import { Prop, mixins } from 'vue-property-decorator';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { ISelectOptions } from '@/common/types';
import moment from 'moment';
import { BookingMixins } from '../mixins';

export default class FilterForm extends mixins(BookingMixins) {
    @Prop({ default: false }) readonly isToggleFilterForm!: boolean;

    filterForm = {
        page: DEFAULT_FIRST_PAGE,
        limit: LIMIT_PER_PAGE,
        orderBy: DEFAULT_ORDER_BY,
        orderDirection: DEFAULT_ORDER_DIRECTION,
        keyword: '',
        status: [],
    } as IQueryStringBooking;

    arrivalTimeRange = [];

    get bookingStatusOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(bookingStatusOptions);
    }

    async resetFilter(): Promise<void> {
        this.filterForm = {
            page: DEFAULT_FIRST_PAGE,
            limit: LIMIT_PER_PAGE,
            orderBy: DEFAULT_ORDER_BY,
            orderDirection: DEFAULT_ORDER_DIRECTION,
            keyword: '',
            status: [],
        };
        this.arrivalTimeRange = [];
        bookingModule.clearBookingQueryString();
        await this.handleFilter();
    }

    async handleFilter(): Promise<void> {
        bookingModule.setBookingQueryString({
            page: DEFAULT_FIRST_PAGE,
            limit: DEFAULT_SIZE_PER_PAGE,
            keyword: this.filterForm.keyword?.trim(),
            arrivalTimeRange: this.arrivalTimeRange
                ? (this.arrivalTimeRange as Date[]).map((date: Date) =>
                      moment(date).utc().fmFullTimeWithoutSecond(),
                  )
                : null,
            status: this.filterForm.status,
        });
        const loading = ElLoading.service({
            target: '.content',
        });
        await bookingModule.getBookings();
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
