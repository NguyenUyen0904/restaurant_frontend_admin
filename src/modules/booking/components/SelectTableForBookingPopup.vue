<template>
    <transition name="modal">
        <div class="modal-mask">
            <div class="modal-wrapper">
                <div class="modal-container">
                    <div class="modal-header">
                        <slot name="header-label"> Chọn bàn</slot>
                        <div class="close-icon" @click="closeModal">
                            <comp-icon :iconName="'close-icon'" />
                        </div>
                    </div>

                    <div class="modal-body">
                        <slot name="body">
                            <el-scrollbar height="350px">
                                <TableDiagram />
                            </el-scrollbar>
                        </slot>
                    </div>

                    <div class="modal-footer">
                        <slot name="footer">
                            <el-button
                                plain
                                el-button
                                type="info"
                                class="modal-button"
                                @click="closeModal"
                                ><div class="text-btn">Hủy</div></el-button
                            >
                            <el-button
                                type="primary"
                                plain
                                class="modal-button"
                                @click="sendData()"
                                v-if="tableSelected"
                                ><div class="text-btn">Lưu</div></el-button
                            >
                        </slot>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script lang="ts">
import { HttpStatus } from '@/common/constants';
import { LIMIT_ARRIVAL_TIME_BOOKING } from '@/modules/table-diagram/constants';
import { TableMixins } from '@/modules/table-diagram/mixins';
import { tableDiagramModule } from '@/modules/table-diagram/store';
import { ITable } from '@/modules/table-diagram/types';
import {
    showSuccessNotificationFunction,
    showErrorNotificationFunction,
} from '@/utils/helper';
import { ElLoading, ElMessageBox } from 'element-plus';
import moment from 'moment';
import { mixins, Options } from 'vue-class-component';
import CompIcon from '../../../components/CompIcon.vue';
import TableDiagram from '../../table-diagram/components/TableDiagram.vue';
import { bookingService } from '../services/api.service';
import { bookingModule } from '../store';
import { IBooking, IBookingUpdate } from '../types';

@Options({
    name: 'select-table-for-booking-popup',

    components: {
        CompIcon,
        TableDiagram,
    },
})
export default class SelectTableForBookingPopup extends mixins(TableMixins) {
    get getTableList(): Array<ITable> {
        return tableDiagramModule.tableList;
    }

    get getBookingTableDetailList(): IBooking[] {
        return bookingModule.bookingTableDetailList;
    }

    get selectedBooking(): IBookingUpdate | null {
        return bookingModule.selectedBooking;
    }

    get tableSelected(): ITable | null {
        return tableDiagramModule.tableSelected;
    }

    get canChosenTable(): boolean {
        return tableDiagramModule.canChosenTable;
    }

    async closeModal(): Promise<void> {
        bookingModule.setIsShowSelectTableForBookingPopup(false);
        await tableDiagramModule.getTables();
    }

    async sendData(): Promise<void> {
        if (!this.tableSelected) return;
        const canContinue = await this.checkCanSelectTable(
            this.tableSelected,
            this.selectedBooking?.numberPeople,
            new Date(this.selectedBooking?.arrivalTime ?? new Date()),
        );
        if (!canContinue) return;

        const loading = ElLoading.service({
            target: '.content',
        });
        const response = await bookingService.update(
            bookingModule.selectedBooking?.id as number,
            {
                tableId: tableDiagramModule.tableSelected?.id,
            },
        );
        loading.close();

        if (response.success) {
            const loading = ElLoading.service({
                target: '.content',
            });
            showSuccessNotificationFunction('Cập nhật bàn thành công');
            await bookingModule.getBookings();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                const loading = ElLoading.service({
                    target: '.content',
                });
                await bookingModule.getBookings();
                loading.close();
            }
        }
        this.closeModal();
    }

    checkTimeBooking(oldTime: Date, newTime: Date): boolean {
        if (
            Math.abs(new Date(oldTime).getTime() - new Date(newTime).getTime()) <
            LIMIT_ARRIVAL_TIME_BOOKING
        ) {
            const textWarning = `Bàn bạn vừa chọn đã bị đặt chỗ từ trước. Khách hàng sẽ đến vào lúc ${moment(
                oldTime,
            ).fmFullTimeWithoutSecond()}, Vui lòng chọn bàn khác!`;
            ElMessageBox.alert(textWarning, 'Warning', {
                confirmButtonText: 'OK',
            });
            return true;
        }
        return false;
    }

    checkNumberSeat(numberPeople: number, numberSeat: number): boolean {
        if (numberPeople > numberSeat) {
            const textWarning = `Yêu cầu đặt bàn có ${numberPeople} chỗ. Bàn bạn vừa chọn chỉ có ${numberSeat} chỗ. Vui lòng chọn bàn khác!`;
            ElMessageBox.alert(textWarning, 'Warning', {
                confirmButtonText: 'OK',
            });
            return false;
        }
        return true;
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
    width: 1000px;
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
</style>
