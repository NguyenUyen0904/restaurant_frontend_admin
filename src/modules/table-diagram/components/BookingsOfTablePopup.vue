<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header-label"> Danh sách đặt bàn</slot>
                        <div class="close-icon" @click="closeModal">
                            <CloseBoldIcon style="height: 20px; width: 25px" />
                        </div>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <BaseTableLayout
                                :data="getBookingTableDetailList"
                                class="table-detail-booking-table-data"
                            >
                                <template #table-columns>
                                    <el-table-column
                                        align="center"
                                        label="#"
                                        type="index"
                                        width="50"
                                    >
                                    </el-table-column>
                                    <el-table-column
                                        prop="name"
                                        label="Tên khách hàng"
                                        class="test"
                                    >
                                        <template #default="scope">
                                            <div class="booking__table__name">
                                                {{ scope.row.nameCustomer }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="name"
                                        label="Điện thoại"
                                        class="test"
                                    >
                                        <template #default="scope">
                                            <div class="booking__table__phone">
                                                {{ scope.row.phone }}
                                            </div>
                                        </template>
                                    </el-table-column>
                                    <el-table-column
                                        prop="arrivalTime"
                                        label="Thời gian tới"
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
                                </template>
                            </BaseTableLayout>
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component';
import { tableDiagramModule } from '../store';
import { CloseBold as CloseBoldIcon } from '@element-plus/icons-vue';
import { tableService } from '../services/api.service';
import { HttpStatus } from '@/common/constants';
import {
    showSuccessNotificationFunction,
    showErrorNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { IBooking } from '@/modules/booking/types';
import { bookingModule } from '@/modules/booking/store';
import { UtilMixins } from '@/mixins/utilMixins';
@Options({
    name: 'modal-table-detail-booking',
    components: { CloseBoldIcon },
})
export default class BookingsOfTablePopup extends mixins(UtilMixins) {
    get getBookingTableDetailList(): IBooking[] {
        return bookingModule.bookingTableDetailList;
    }

    closeModal(): void {
        tableDiagramModule.setIsShowBookingsOfTablePopup(false);
        tableDiagramModule.setTableSelected(null);
    }

    async sendData(status: string): Promise<void> {
        this.closeModal();

        const loading = ElLoading.service({
            target: '.content',
        });
        const response = await tableService.update(
            tableDiagramModule.tableSelected?.id as number,
            {
                status: status,
            },
        );
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction('Thay đổi trạng thái bàn thành công');
            await tableDiagramModule.getTables();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                const loading = ElLoading.service({
                    target: '.content',
                });
                await tableDiagramModule.getTables();
                loading.close();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-mask {
    position: fixed;
    z-index: 2000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-container {
    width: 1110px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
    margin-top: 0;
    color: #42b983;
}

.modal-body {
    margin: 20px 0;
}

.modal-default-button {
    float: right;
}

.modal-enter {
    opacity: 0;
}

.modal-leave-active {
    opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
}

.modal-header {
    font-size: 24px;
    font-weight: 600;
    .close-icon {
        position: relative;
        right: -54px;
        top: -54px;
        display: flex;
        align-items: center;
        height: 27px;
        padding-bottom: 3px;
        background-color: #fff;
        border: 1px solid rgb(233, 230, 230);
        border-radius: 50%;
        &:hover {
            color: #fff;
            background-color: red;
            border: 2px solid rgb(158, 156, 156);
            box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
            cursor: pointer;
        }
    }
}

.modal-footer {
    display: flex;
    justify-content: space-evenly;
    .text-btn {
        font-weight: 600;
    }
    .modal-button:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    }
}

:deep(.el-table__body) {
    width: 100% !important;
}
</style>
