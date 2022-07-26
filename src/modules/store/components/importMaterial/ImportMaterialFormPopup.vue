<template>
    <el-dialog
        width="50%"
        v-model="isShowImportMaterialFormPopUp"
        destroy-on-close
        @closed="closePopup"
        @open="form.openPopup"
        custom-class="material-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{
                    form.isCreate
                        ? $t('store.importMaterial.importMaterialDialog.titleCreate')
                        : $t('store.importMaterial.importMaterialDialog.titleUpdate')
                }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-6">
                <BaseSingleSelect
                    v-model:value="form.supplierId"
                    :label="$t('store.importMaterial.importMaterialDialog.supplier')"
                    :placeholder="
                        $t(
                            'store.importMaterial.importMaterialDialog.placeholder.supplier',
                        )
                    "
                    :error="translateYupError(form.errors.supplierId)"
                    :isRequired="true"
                    :options="supplierOptions"
                    :filterable="true"
                />
            </div>
            <div class="col-md-6">
                <BaseInputText
                    v-model:value="form.note"
                    :error="translateYupError(form.errors.note)"
                    :label="$t('store.importMaterial.importMaterialDialog.note')"
                    :placeholder="
                        $t('store.importMaterial.importMaterialDialog.placeholder.note')
                    "
                />
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <div class="row justify-content-center footer">
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-end justify-content-center"
                    >
                        <el-button @click="closePopup">
                            {{
                                $t(
                                    'store.importMaterial.importMaterialDialog.button.cancel',
                                )
                            }}
                        </el-button>
                    </div>
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-start justify-content-center"
                    >
                        <el-button type="primary" @click="onClickSaveButton">
                            {{
                                $t(
                                    'store.importMaterial.importMaterialDialog.button.submit',
                                )
                            }}
                        </el-button>
                    </div>
                </div>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts">
import { setup } from 'vue-class-component';
import { initData } from '../../composition/importMaterial';
import { storeModule } from '../../store';
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins, Options } from 'vue-property-decorator';
import { ISelectOptions } from '@/common/types';
@Options({
    name: 'import-material-form-popup',
})
export default class ImportMaterialFormPopup extends mixins(UtilMixins) {
    get isShowImportMaterialFormPopUp(): boolean {
        return storeModule.isShowImportMaterialFormPopUp || false;
    }

    set isShowImportMaterialFormPopUp(val: boolean) {
        storeModule.setIsShowImportMaterialFormPopUp(val);
    }

    get supplierOptions(): ISelectOptions[] {
        return storeModule.supplierOptions;
    }

    form = setup(() => initData());

    async closePopup(): Promise<void> {
        storeModule.setIsShowImportMaterialFormPopUp(false);
        storeModule.setSelectedImportMaterial(null);
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
