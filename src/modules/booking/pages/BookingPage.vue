<template>
    <div class="booking-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('booking.list.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalBookings"
            :isShowCreateButton="isCanCreate"
            @create="onClickButtonCreate"
            @onPaginate="handlePaginate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <BookingTable />
        <BookingFormPopup />
        <SelectTableForBookingPopup v-show="isShowSelectTableForBookingPopup" />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import BookingTable from '../components/BookingTable.vue';
import { bookingModule } from '../store';
import FilterForm from '../components/FilterForm.vue';
import BookingFormPopup from '../components/BookingFormPopup.vue';
import SelectTableForBookingPopup from '../components/SelectTableForBookingPopup.vue';

@Options({
    components: {
        BookingTable,
        FilterForm,
        BookingFormPopup,
        SelectTableForBookingPopup,
    },
})
export default class BookingPage extends Vue {
    isToggleFilterForm = true;

    get totalBookings(): number {
        return bookingModule.totalBookings;
    }

    // check permission
    get isCanCreate(): boolean {
        return checkUserHasPermission(bookingModule.userPermissions, [
            `${PermissionResources.BOOKING}_${PermissionActions.CREATE}`,
        ]);
    }

    get selectedPage(): number {
        return bookingModule.bookingQueryString?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        bookingModule.bookingQueryString.page = value;
    }

    get isShowSelectTableForBookingPopup(): boolean {
        return bookingModule.isShowSelectTableForBookingPopup;
    }

    created(): void {
        bookingModule.clearBookingQueryString();
        this.getBookingList();
    }

    async getBookingList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await bookingModule.getBookings();
        loading.close();
    }

    async handlePaginate(): Promise<void> {
        bookingModule.setBookingQueryString({ page: this.selectedPage });
        this.getBookingList();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }

    onClickButtonCreate(): void {
        bookingModule.setIsShowBookingFormPopUp(true);
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
