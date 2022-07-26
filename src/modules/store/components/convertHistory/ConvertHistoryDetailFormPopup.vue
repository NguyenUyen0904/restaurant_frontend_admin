<template>
    <el-dialog
        width="50%"
        v-model="isShowConvertHistoryFormPopUp"
        @closed="closePopup"
        custom-class="convert-history-detail-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{ $t('store.convertHistory.convertHistoryDialog.title') }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-4">
                <BaseInputText
                    :isDisabled="true"
                    :value="selectedConvertHistory.createdAt"
                    :label="$t('store.convertHistory.convertHistoryPopup.convertTime')"
                />
            </div>
            <div class="col-md-4">
                <BaseInputText
                    :isDisabled="true"
                    :value="selectedConvertHistory.performer.fullName"
                    :label="$t('store.convertHistory.convertHistoryPopup.performer')"
                />
            </div>
            <div class="col-md-4">
                <BaseInputText
                    :isDisabled="true"
                    :value="selectedConvertHistory.note"
                    :label="$t('store.convertHistory.convertHistoryPopup.note')"
                />
            </div>
            <div class="col-md-5">
                <BaseInputText
                    :isDisabled="true"
                    :value="
                        parseMaterial(
                            selectedConvertHistory.materialFrom.material,
                            selectedConvertHistory.materialFrom.unit,
                        )
                    "
                    :label="$t('store.convertHistory.convertHistoryPopup.convertFrom')"
                />
                <BaseInputText
                    :isDisabled="true"
                    :value="selectedConvertHistory.quantityBeforeConvertFrom"
                    :label="
                        $t(
                            'store.convertHistory.convertHistoryPopup.quantityBeforeConvert',
                        )
                    "
                />
                <BaseInputText
                    :isDisabled="true"
                    :value="selectedConvertHistory.quantityFrom"
                    :label="$t('store.convertHistory.convertHistoryPopup.quantityFrom')"
                />
                <BaseInputText
                    :isDisabled="true"
                    :value="
                        selectedConvertHistory.quantityBeforeConvertFrom -
                        selectedConvertHistory.quantityFrom
                    "
                    :label="
                        $t(
                            'store.convertHistory.convertHistoryPopup.quantityAfterConvert',
                        )
                    "
                />
            </div>
            <div class="col-md-2">
                <img
                    style="height: 50px; margin-top: 140px"
                    src="@/assets/icons/arrow-right.svg"
                />
            </div>
            <div class="col-md-5">
                <BaseInputText
                    :isDisabled="true"
                    :value="
                        parseMaterial(
                            selectedConvertHistory.materialTo.material,
                            selectedConvertHistory.materialTo.unit,
                        )
                    "
                    :label="$t('store.convertHistory.convertHistoryPopup.convertTo')"
                />
                <BaseInputText
                    :isDisabled="true"
                    :value="selectedConvertHistory.quantityBeforeConvertTo"
                    :label="
                        $t(
                            'store.convertHistory.convertHistoryPopup.quantityBeforeConvert',
                        )
                    "
                />
                <BaseInputText
                    :isDisabled="true"
                    :value="selectedConvertHistory.quantityTo"
                    :label="$t('store.convertHistory.convertHistoryPopup.quantityFrom')"
                />
                <BaseInputText
                    :isDisabled="true"
                    :value="
                        selectedConvertHistory.quantityBeforeConvertTo +
                        selectedConvertHistory.quantityTo
                    "
                    :label="
                        $t(
                            'store.convertHistory.convertHistoryPopup.quantityAfterConvert',
                        )
                    "
                />
            </div>
        </div>
    </el-dialog>
</template>

<script lang="ts">
import { IConvertHistory } from '../../types';
import { storeModule } from '../../store';
import { mixins } from 'vue-class-component';
import { StoreMixins } from '../../mixins';

export default class ConvertHistoryDetailFormPopup extends mixins(StoreMixins) {
    get isShowConvertHistoryFormPopUp(): boolean {
        return storeModule.isShowConvertHistoryFormPopUp;
    }

    get selectedConvertHistory(): IConvertHistory | null {
        return storeModule.selectedConvertMaterial;
    }

    onClickCancel(): void {
        storeModule.setIsShowConvertHistoryFormPopUp(false);
    }

    async closePopup(): Promise<void> {
        storeModule.setIsShowConvertHistoryFormPopUp(false);
    }
}
</script>
<style lang="scss" scoped>
.el-dialog {
    width: 80%;
}
.text-left {
    text-align: left;
}
.font-weight-bold {
    font-weight: 700;
}
.price-text {
    width: fit-content;
    border-top: 1px solid rgb(126, 126, 126);
}
.readonly-input-text {
    :deep(.el-input__inner) {
        box-shadow: none;
    }
}
</style>
