<template>
    <el-dialog
        width="50%"
        v-model="isShowPromotionFormPopUp"
        destroy-on-close
        @closed="closePopup"
        @open="form.openPopup"
        custom-class="promotion-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{
                    form.isCreate
                        ? $t('promotion.promotion.promotionDialog.titleCreate')
                        : $t('promotion.promotion.promotionDialog.titleUpdate')
                }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-12">
                <BaseInputText
                    v-model:value="form.name"
                    :is-required="true"
                    :placeholder="$t('promotion.promotion.placeholder.name')"
                    :label="$t('promotion.promotion.promotionPopup.name')"
                    :error="translateYupError(form.errors.name)"
                />
            </div>
            <div class="col-md-6">
                <BaseInputNumber
                    v-model:value="form.percent"
                    :is-required="true"
                    :placeholder="$t('promotion.promotion.placeholder.percent')"
                    :label="$t('promotion.promotion.promotionPopup.percent')"
                    :error="translateYupError(form.errors.percent)"
                />
            </div>
            <div class="col-md-6">
                <BaseInputText
                    v-model:value="form.note"
                    :error="translateYupError(form.errors.note)"
                    :label="$t('promotion.promotion.promotionPopup.note')"
                    :placeholder="$t('promotion.promotion.placeholder.note')"
                />
            </div>
        </div>
        <table-diagram />
        <template #footer>
            <span class="dialog-footer">
                <div class="row justify-content-center footer">
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-end justify-content-center"
                    >
                        <el-button @click="closePopup">
                            {{ $t('promotion.promotion.button.cancel') }}
                        </el-button>
                    </div>
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-start justify-content-center"
                    >
                        <el-button
                            type="primary"
                            @click="onClickSaveButton"
                            :disabled="isDisabledSaveButton"
                        >
                            {{ $t('promotion.promotion.button.submit') }}
                        </el-button>
                    </div>
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { setup } from 'vue-class-component';
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins, Options } from 'vue-property-decorator';
import { promotionModule } from '../store';
import { initData } from '../composition/promotion';
@Options({
    name: 'promotion-form-popup',
})
export default class MaterialFormPopUp extends mixins(UtilMixins) {
    get isDisabledSaveButton(): boolean {
        return promotionModule.isDisabledSaveButton;
    }

    get isShowPromotionFormPopUp(): boolean {
        return promotionModule.isShowPromotionFormPopUp || false;
    }

    set isShowPromotionFormPopUp(val: boolean) {
        promotionModule.setIsShowPromotionFormPopUp(val);
    }

    form = setup(() => initData());

    async closePopup(): Promise<void> {
        promotionModule.setIsShowPromotionFormPopUp(false);
        promotionModule.setPromotionSelected(null);
        (this.form.resetForm as () => void)();
    }

    async onClickSaveButton(): Promise<void> {
        promotionModule.setIsDisabledSaveButton(true);
        await this.form.onSubmit();
        promotionModule.setIsDisabledSaveButton(false);
    }
}
</script>
<style lang="scss" scoped>
@media (max-width: 1199.98px) {
    :deep(.el-dialog) {
        width: 80%;
    }
}
.text-left {
    text-align: left;
}

:deep(.el-input-number .el-input__inner) {
    width: 100%;
    margin-bottom: 15px;
    height: 36px !important;
}
</style>
