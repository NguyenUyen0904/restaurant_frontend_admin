<template>
    <el-dialog
        width="50%"
        v-model="isShowSupplierFormPopUp"
        destroy-on-close
        @closed="closePopup"
        @open="form.openPopup"
        custom-class="supplier-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{
                    form.isCreate
                        ? $t('store.supplier.supplierDialog.titleCreate')
                        : $t('store.supplier.supplierDialog.titleUpdate')
                }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-12">
                <BaseInputText
                    v-model:value="form.name"
                    :is-required="true"
                    :placeholder="$t('store.supplier.placeholder.name')"
                    :label="$t('store.supplier.name')"
                    :error="translateYupError(form.errors.name)"
                />
            </div>
            <div class="col-md-6">
                <BaseInputText
                    v-model:value="form.phone"
                    :error="translateYupError(form.errors.phone)"
                    :is-required="true"
                    :label="$t('store.supplier.phone')"
                    :placeholder="$t('store.supplier.placeholder.phone')"
                />
            </div>
            <div class="col-md-6">
                <BaseInputText
                    v-model:value="form.address"
                    :error="translateYupError(form.errors.address)"
                    :is-required="true"
                    :label="$t('store.supplier.address')"
                    :placeholder="$t('store.supplier.placeholder.address')"
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
                            {{ $t('store.supplier.button.cancel') }}
                        </el-button>
                    </div>
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-start justify-content-center"
                    >
                        <el-button type="primary" @click="onClickSaveButton">
                            {{ $t('store.supplier.button.submit') }}
                        </el-button>
                    </div>
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { setup } from 'vue-class-component';
import { initData } from '../../composition/supplierForm';
import { storeModule } from '../../store';
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins, Options } from 'vue-property-decorator';
@Options({
    name: 'supplier-form-popup',
})
export default class SupplierFormPopUp extends mixins(UtilMixins) {
    form = setup(() => initData());

    get isShowSupplierFormPopUp(): boolean {
        return storeModule.isShowSupplierFormPopUp || false;
    }

    set isShowSupplierFormPopUp(val: boolean) {
        storeModule.setIsShowSupplierFormPopUp(val);
    }

    async closePopup(): Promise<void> {
        storeModule.setIsShowSupplierFormPopUp(false);
        storeModule.setSelectedSupplier(null);
        (this.form.resetForm as () => void)();
    }

    async onClickSaveButton(): Promise<void> {
        (this.form.onSubmit as () => void)();
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
