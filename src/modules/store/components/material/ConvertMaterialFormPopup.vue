<template>
    <el-dialog
        width="50%"
        v-model="isShowConvertMaterialFormPopUp"
        @closed="closePopup"
        @open="form.openPopup"
        custom-class="convert-material-form-popup"
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
                    :value="parseDateTime(new Date(), YYYY_MM_DD_HYPHEN_HH_MM_COLON)"
                    :label="$t('store.convertHistory.convertHistoryPopup.convertTime')"
                />
            </div>
            <div class="col-md-4">
                <BaseInputText
                    :isDisabled="true"
                    :value="namePerformer"
                    :label="$t('store.convertHistory.convertHistoryPopup.performer')"
                />
            </div>
            <div class="col-md-4">
                <BaseInputText
                    v-model:value="form.note"
                    :label="$t('store.convertHistory.convertHistoryPopup.note')"
                    :error="translateYupError(form.errors.note)"
                />
            </div>
            <div class="col-md-5">
                <BaseSingleSelect
                    v-model:value="form.idMaterialFrom"
                    :label="$t('store.convertHistory.convertHistoryPopup.convertFrom')"
                    :placeholder="
                        $t('store.convertHistory.convertHistoryPopup.convertFrom')
                    "
                    :error="translateYupError(form.errors.idMaterialFrom)"
                    :isRequired="true"
                    :options="materialOptions"
                    @change="onChangeMaterialFrom"
                    :filterable="true"
                />
                <BaseInputText
                    :isDisabled="true"
                    v-model:value="form.quantityBeforeConvertFrom"
                    :label="
                        $t(
                            'store.convertHistory.convertHistoryPopup.quantityBeforeConvert',
                        )
                    "
                />
                <BaseInputNumber
                    v-model:value="form.quantityFrom"
                    :min="0"
                    :isRequired="true"
                    :max="90"
                    :label="$t('store.convertHistory.convertHistoryPopup.quantityFrom')"
                    :error="translateYupError(form.errors.quantityFrom)"
                />
                <BaseInputText
                    :isDisabled="true"
                    :value="quantityAfterConvertFrom"
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
                <BaseSingleSelect
                    v-model:value="form.idMaterialTo"
                    :label="$t('store.convertHistory.convertHistoryPopup.convertTo')"
                    :placeholder="
                        $t('store.convertHistory.convertHistoryPopup.convertTo')
                    "
                    :error="translateYupError(form.errors.idMaterialTo)"
                    :isRequired="true"
                    :options="materialOptions"
                    @change="onChangeMaterialTo"
                    :filterable="true"
                />
                <BaseInputText
                    :isDisabled="true"
                    v-model:value="form.quantityBeforeConvertTo"
                    :label="
                        $t(
                            'store.convertHistory.convertHistoryPopup.quantityBeforeConvert',
                        )
                    "
                />
                <BaseInputNumber
                    v-model:value="form.quantityTo"
                    :min="0"
                    :isRequired="true"
                    :label="$t('store.convertHistory.convertHistoryPopup.quantityFrom')"
                    :error="translateYupError(form.errors.quantityTo)"
                />
                <BaseInputText
                    :isDisabled="true"
                    :value="quantityAfterConvertTo"
                    :label="
                        $t(
                            'store.convertHistory.convertHistoryPopup.quantityAfterConvert',
                        )
                    "
                />
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <div class="row justify-content-center">
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-end justify-content-center"
                    >
                        <el-button @click="onClickCancel">
                            {{ $t('store.material.button.cancel') }}
                        </el-button>
                    </div>
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-start justify-content-center"
                    >
                        <el-button type="primary" @click="onClickSaveButton">
                            {{ $t('store.material.button.submit') }}
                        </el-button>
                    </div>
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { storeModule } from '../../store';
import { mixins, setup } from 'vue-class-component';
import { StoreMixins } from '../../mixins';
import { initData } from '../../composition/convertMaterialForm';
import { appService } from '@/utils/app';
import { ISelectMaterialOptions } from '../../types';

export default class ConvertMaterialFormPopup extends mixins(StoreMixins) {
    form = setup(() => initData());

    get materialOptions(): ISelectMaterialOptions[] {
        return storeModule.materialOptions;
    }

    get namePerformer(): string {
        return appService.getUser().fullName;
    }

    get isShowConvertMaterialFormPopUp(): boolean {
        return storeModule.isShowConvertMaterialFormPopUp;
    }

    get quantityAfterConvertTo(): number {
        return this.form.quantityTo
            ? parseFloat(this.form.quantityBeforeConvertTo as string) +
                  parseFloat(this.form.quantityTo as string)
            : parseFloat(this.form.quantityBeforeConvertTo as string);
    }

    get quantityAfterConvertFrom(): number {
        return this.form.quantityFrom
            ? parseFloat(this.form.quantityBeforeConvertFrom as string) -
                  parseFloat(this.form.quantityFrom as string)
            : parseFloat(this.form.quantityBeforeConvertFrom as string);
    }

    onChangeMaterialTo(): void {
        const materialSelected = this.materialOptions.find(
            (material) => material.value === this.form.idMaterialTo,
        );
        this.form.quantityBeforeConvertTo = materialSelected?.quantity;
    }

    onChangeMaterialFrom(): void {
        const materialSelected = this.materialOptions.find(
            (material) => material.value === this.form.idMaterialFrom,
        );
        this.form.quantityBeforeConvertFrom = materialSelected?.quantity;
    }

    onClickCancel(): void {
        storeModule.setIsShowConvertMaterialFormPopUp(false);
    }

    async onClickSaveButton(): Promise<void> {
        await this.form.onSubmit();
    }

    async closePopup(): Promise<void> {
        storeModule.setIsShowConvertMaterialFormPopUp(false);
        storeModule.setSelectedMaterial(null);
        (this.form.resetForm as () => void)();
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
