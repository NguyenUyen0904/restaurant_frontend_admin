<template>
    <div class="table-item" :class="table.id === tableSelected?.id ? 'selected' : ''">
        <div :class="table.status">
            <div
                class="table-layout"
                @click="selectTable"
                :class="
                    table.numberSeat < selectedBooking?.numberPeople ? 'not-enough' : ''
                "
            >
                <img
                    class="table-img"
                    :src="
                        require(`../../../assets/images/table/table-${getImgLink(
                            table?.numberSeat,
                        )}.png`)
                    "
                    alt=""
                />
                <div class="table-action">
                    <el-popover
                        v-if="isCanUpdate"
                        trigger="hover"
                        placement="top"
                        :width="200"
                        popper-class="box-popper-menu"
                    >
                        <template #reference>
                            <div class="menu-action">
                                <el-button @click.stop="" circle size="mini">
                                    <MoreIcon
                                        style="
                                            width: 1em;
                                            height: 1em;
                                            display: flex;
                                            justify-content: center;
                                            align-item: center;
                                        "
                                    />
                                </el-button>
                            </div>
                        </template>
                        <div class="box-menu">
                            <div @click="editTable">
                                {{ $t('tableDiagram.table.tableCard.editTable') }}
                            </div>
                            <div
                                @click="getBookingsOfTable"
                                v-if="table.status !== TableStatus.READY"
                            >
                                {{
                                    $t('tableDiagram.table.tableCard.getBookingsOfTable')
                                }}
                            </div>
                            <div
                                @click="updateTableStatus(table, TableStatus.USED)"
                                v-if="table.status !== TableStatus.USED"
                            >
                                {{ $t('tableDiagram.table.tableCard.startServe') }}
                            </div>
                            <div
                                @click="updateTableStatus(table, TableStatus.READY)"
                                v-else
                            >
                                {{ $t('tableDiagram.table.tableCard.endServe') }}
                            </div>
                        </div>
                    </el-popover>
                </div>
                <div class="table-name">{{ table.name }}</div>
            </div>
            <BookingsOfTablePopup v-if="isShowBookingsOfTablePopup" />
        </div>
    </div>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-class-component';
import { tableDiagramModule } from '../store';
import BookingsOfTablePopup from './BookingsOfTablePopup.vue';
import { ElLoading } from 'element-plus';
import { Prop } from 'vue-property-decorator';
import { bookingModule } from '@/modules/booking/store';
import { ITable } from '../types';
import { IBookingUpdate } from '@/modules/booking/types';
import { PermissionResources, PermissionActions } from '@/modules/role/constants';
import { checkUserHasPermission } from '@/utils/helper';
import { Edit as EditIcon, More as MoreIcon } from '@element-plus/icons-vue';
import { TableMixins } from '../mixins';

@Options({
    name: 'table',
    components: {
        BookingsOfTablePopup,
        EditIcon,
        MoreIcon,
    },
})
export default class TablesRestaurants extends mixins(TableMixins) {
    @Prop({}) table!: ITable;

    get tableSelected(): ITable | null {
        return tableDiagramModule.tableSelected;
    }

    get isShowBookingsOfTablePopup(): boolean {
        return tableDiagramModule.isShowBookingsOfTablePopup;
    }

    get isShowSelectTableForBookingPopup(): boolean {
        return bookingModule.isShowSelectTableForBookingPopup;
    }

    get isShowBookingFormPopUp(): boolean {
        return bookingModule.isShowBookingFormPopUp;
    }

    get selectedBooking(): IBookingUpdate | null {
        return bookingModule.selectedBooking;
    }

    isCanUpdate(): boolean {
        return checkUserHasPermission(tableDiagramModule.userPermissionsTable, [
            `${PermissionResources.TABLE_DIAGRAM}_${PermissionActions.UPDATE}`,
        ]);
    }

    getImgLink(numberSeat: number): string {
        switch (numberSeat) {
            case 1:
                return 'one';
            case 2:
                return 'two';
            case 4:
                return 'four';
            case 6:
                return 'six';
            case 8:
                return 'eight';
            case 10:
                return 'ten';
            default:
                return 'one';
        }
    }

    selectTable(): void {
        tableDiagramModule.setTableSelected(this.table);
    }

    editTable(): void {
        tableDiagramModule.setIsShowTableFormPopUp(true);
        tableDiagramModule.setTableSelected(this.table);
    }

    async getBookingsOfTable(): Promise<void> {
        const loading = ElLoading.service({
            target: '.table-detail-booking-table-data',
        });
        await bookingModule.getBookingsOfTable(this.table.id);
        tableDiagramModule.MUTATE_IS_SHOW_BOOKINGS_OF_TABLE_POPUP(true);
        loading.close();
    }
}
</script>

<style lang="scss" scoped>
.table-item {
    width: 15%;
    margin: 30px;
    padding: 10px;
    cursor: pointer;
    border-radius: 10px;
    position: relative;

    .table-img {
        width: 50px;
        height: 50px;
    }
    .table-name {
        color: #000000;
        font-weight: 200;
    }
    &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        .table-name {
            font-weight: 700;
        }
    }
    .table-layout {
        padding: 10px;
    }
    .table-action {
        position: absolute;
        right: 15px;
        top: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        button {
            &:not(:last-child) {
                margin-bottom: 5px;
            }
        }
        .menu-action {
            -webkit-transform: rotate(90deg);
            transform: rotate(90deg);
            cursor: pointer;

            button {
                width: 24px;
                height: 24px;
                min-height: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}

.not-enough {
    padding: 10px;
    background: #e6e6e6;
    border: 1px solid #ffeded;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
    opacity: 0.2;
    cursor: none;
}

.selected {
    border: 1px solid #ff0000;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.booked {
    background: #ebff78;
    border-radius: 10px;
    border: 1px solid #c2c2c2;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.used {
    background: #9eb3fa;
    border-radius: 10px;
    border: 1px solid #c2c2c2;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
