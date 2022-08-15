<template>
    <BaseTableLayout :data="bookingList" class="booking-table-data">
        <template #table-columns>
            <el-table-column
                align="center"
                :label="$t('booking.list.bookingTable.header.id')"
                type="index"
                width="75"
            >
            </el-table-column>
            <el-table-column
                prop="name"
                :label="$t('booking.list.bookingTable.header.nameCustomer')"
                width="200"
                sortable="custom"
            >
                <template #default="scope">
                    <div class="booking__table__name">
                        {{ scope.row.nameCustomer }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                :label="$t('booking.list.bookingTable.header.phone')"
                width="170"
                sortable="custom"
            >
                <template #default="scope">
                    <div class="booking__table__phone">
                        {{ scope.row.phone }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="arrivalTime"
                :label="$t('booking.list.bookingTable.header.arrivalTime')"
                width="250"
                sortable="custom"
            >
                <template #default="scope">
                    <div class="booking__table__arrival_time">
                        {{
                            scope.row.arrivalTime
                                ? parseDateTime(
                                      scope.row.arrivalTime,
                                      YYYY_MM_DD_HYPHEN_HH_MM_COLON,
                                  )
                                : ''
                        }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="idCategory"
                :label="$t('booking.list.bookingTable.header.numberPeople')"
                width="200"
            >
                <template #default="scope">
                    <div class="booking__table__name_table">
                        {{ scope.row.numberPeople }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="idCategory"
                :label="$t('booking.list.bookingTable.header.table')"
                width="150"
            >
                <template #default="scope">
                    <div class="booking__table__name_table">
                        {{ scope.row.tablesRestaurant?.name || '' }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="idCategory"
                :label="$t('booking.list.bookingTable.header.status')"
                width="150"
            >
                <template #default="scope">
                    <div
                        class="booking__table__status"
                        :class="`badge status-field badge-md bg-${statusBadge(
                            scope.row.status,
                        )}`"
                    >
                        {{ scope.row.status }}
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                align="center"
                prop="id"
                :label="$t('booking.list.bookingTable.header.actions')"
                width="150"
                fixed="right"
            >
                <template #default="scope">
                    <div class="booking__table__action">
                        <div
                            class="booking-done"
                            v-if="
                                scope.row.status == BookingStatus.WAITING &&
                                scope.row.tablesRestaurant
                            "
                        >
                            <el-popconfirm
                                confirm-button-text="Yes"
                                cancel-button-text="No"
                                icon-color="green"
                                title="Bạn có chắc chắn hoàn thành yêu cầu đặt bàn này?"
                                @confirm="changeStatus(scope.row.id, BookingStatus.DONE)"
                            >
                                <template #reference>
                                    <div>
                                        <comp-icon :iconName="'check-icon'" />
                                    </div>
                                </template>
                            </el-popconfirm>
                        </div>
                        <div
                            class="booking-canceled"
                            v-if="scope.row.status == BookingStatus.WAITING"
                        >
                            <el-popconfirm
                                confirm-button-text="Yes"
                                cancel-button-text="No"
                                icon-color="red"
                                title="Bạn có muốn hủy yêu cầu đặt bàn này không?"
                                @confirm="
                                    changeStatus(scope.row.id, BookingStatus.CANCELED)
                                "
                            >
                                <template #reference>
                                    <div>
                                        <comp-icon :iconName="'x-icon'" />
                                    </div>
                                </template>
                            </el-popconfirm>
                        </div>
                        <div
                            class="booking-change-table"
                            :class="!scope.row.tablesRestaurant ? 'need-table' : ''"
                            @click="openModal(scope.row)"
                            v-if="scope.row.status == BookingStatus.WAITING"
                        >
                            <comp-icon :iconName="'dinning-table-small-icon'" />
                        </div>
                    </div>
                </template>
            </el-table-column>
        </template>
    </BaseTableLayout>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-property-decorator';

import { IBooking } from '../types';
import CompIcon from '../../../components/CompIcon.vue';
import { bookingModule } from '../store';
import { BookingMixins } from '../mixins';
import { tableDiagramModule } from '@/modules/table-diagram/store';
import { BookingStatus } from '../constants';
import { bookingService } from '../services/api.service';
import {
    showSuccessNotificationFunction,
    showErrorNotificationFunction,
} from '@/utils/helper';
import i18n from '@/plugins/vue-i18n';

@Options({
    name: 'booking-table-component',
    components: {
        CompIcon,
    },
})
export default class BookingTable extends mixins(BookingMixins) {
    get bookingList(): IBooking[] {
        return bookingModule.bookingList;
    }

    created(): void {
        bookingModule.getBookings();
    }

    async changeStatus(id: number, status: BookingStatus): Promise<void> {
        const response = await bookingService.update(id, {
            status: status,
        });
        if (response.success) {
            bookingModule.getBookings();
            tableDiagramModule.setCanChosenTable(false);
            showSuccessNotificationFunction(
                i18n.global.t('booking.list.message.update.success'),
            );
        } else {
            showErrorNotificationFunction(response.message);
        }
    }

    openModal(booking: IBooking): void {
        bookingModule.setSelectedBooking(booking);
        bookingModule.setIsShowSelectTableForBookingPopup(true);
    }

    statusBadge(status: BookingStatus): string {
        switch (status) {
            case BookingStatus.WAITING:
                return 'info';
            case BookingStatus.DONE:
                return 'success';
            case BookingStatus.CANCELED:
                return 'danger';
        }
    }
}
</script>

<style lang="scss" scoped>
.header-options-table {
    padding: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    .input-search-booking {
        width: 200px;
    }
    .pagination-group {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-end;
        .page-size-dropdown {
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            width: fit-content;
            padding: 8px 10px 8px 22px;
            border: 2px solid #d0d0d0;
            .text-dropdown {
                color: #8c8c8c;
                margin-right: 10px;
            }
        }
    }
}
.booking-table-data {
    .booking__table__action {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        margin: 0 18%;
        :hover {
            border-radius: 5px;
            box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
            cursor: pointer;
        }

        .need-table {
            width: 50px;
            border: 2px solid rgb(255, 21, 21);
            border-radius: 8px;
        }

        .booking-change-table:hover {
            width: 50px;
            border: 2px solid rgb(21, 239, 255);
        }

        .booking-done:hover {
            color: green;
            border: 2px solid rgb(3, 180, 3);
        }

        .booking-canceled:hover {
            color: red;
            border: 2px solid rgb(235, 0, 0);
        }
    }
}
</style>
