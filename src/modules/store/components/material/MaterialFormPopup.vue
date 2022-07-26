<template>
    <el-dialog
        width="50%"
        v-model="isShowMaterialFormPopUp"
        destroy-on-close
        @closed="closePopup"
        @open="form.openPopup"
        custom-class="material-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{
                    form.isCreate
                        ? $t('store.material.materialDialog.titleCreate')
                        : $t('store.material.materialDialog.titleUpdate')
                }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-12">
                <BaseInputText
                    v-model:value="form.material"
                    :is-required="true"
                    :placeholder="$t('store.material.placeholder.material')"
                    :label="$t('store.material.material')"
                    :error="translateYupError(form.errors.material)"
                />
            </div>
            <div class="col-md-6">
                <BaseInputNumber
                    v-model:value="form.quantity"
                    :placeholder="$t('store.material.placeholder.quantity')"
                    :label="$t('store.material.quantity')"
                    :error="translateYupError(form.errors.quantity)"
                />
            </div>
            <div class="col-md-6">
                <BaseInputText
                    v-model:value="form.unit"
                    :error="translateYupError(form.errors.unit)"
                    :is-required="true"
                    :label="$t('store.material.unit')"
                    :placeholder="$t('store.material.placeholder.unit')"
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
import { setup } from 'vue-class-component';
import { initData } from '../../composition/materialForm';
import { storeModule } from '../../store';
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins, Options } from 'vue-property-decorator';
@Options({
    name: 'material-form-popup',
})
export default class MaterialFormPopUp extends mixins(UtilMixins) {
    get isShowMaterialFormPopUp(): boolean {
        return storeModule.isShowMaterialFormPopUp || false;
    }

    set isShowMaterialFormPopUp(val: boolean) {
        storeModule.setIsShowMaterialFormPopUp(val);
    }

    form = setup(() => initData());

    async closePopup(): Promise<void> {
        storeModule.setIsShowMaterialFormPopUp(false);
        storeModule.setSelectedMaterial(null);
        (this.form.resetForm as () => void)();
    }

    async onClickSaveButton(): Promise<void> {
        await this.form.onSubmit();
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
