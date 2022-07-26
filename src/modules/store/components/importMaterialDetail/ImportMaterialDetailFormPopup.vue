<template>
    <el-dialog
        width="50%"
        v-model="isShowImportMaterialDetailFormPopUp"
        destroy-on-close
        @closed="closePopup"
        @open="form.openPopup"
        custom-class="import-material-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{
                    form.isCreate
                        ? $t(
                              'store.importMaterialDetail.importMaterialDetailDialog.titleCreate',
                          )
                        : $t(
                              'store.importMaterialDetail.importMaterialDetailDialog.titleUpdate',
                          )
                }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-6">
                <BaseSingleSelect
                    v-model:value="form.materialId"
                    :label="
                        $t(
                            'store.importMaterialDetail.importMaterialDetailDialog.material',
                        )
                    "
                    :placeholder="
                        $t(
                            'store.importMaterialDetail.importMaterialDetailDialog.placeholder.material',
                        )
                    "
                    :error="translateYupError(form.errors.materialId)"
                    :isRequired="true"
                    :options="materialOptions"
                    :filterable="true"
                    @change="onChangeMaterial"
                />
            </div>
            <div class="col-md-6">
                <BaseInputNumber
                    v-model:value="form.currentQuantity"
                    :label="
                        $t(
                            'store.importMaterialDetail.importMaterialDetailDialog.currentQuantity',
                        )
                    "
                    :isDisabled="true"
                />
            </div>
            <div class="col-md-6">
                <BaseInputNumber
                    v-model:value="form.pricePerUnit"
                    :isRequired="true"
                    :label="
                        $t(
                            'store.importMaterialDetail.importMaterialDetailDialog.pricePerUnit',
                        )
                    "
                    :placeholder="
                        $t(
                            'store.importMaterialDetail.importMaterialDetailDialog.placeholder.pricePerUnit',
                        )
                    "
                    :error="translateYupError(form.errors.pricePerUnit)"
                />
            </div>
            <div class="col-md-6">
                <BaseInputNumber
                    v-model:value="form.quantity"
                    :isRequired="true"
                    :label="
                        $t(
                            'store.importMaterialDetail.importMaterialDetailDialog.quantity',
                        )
                    "
                    :placeholder="
                        $t(
                            'store.importMaterialDetail.importMaterialDetailDialog.placeholder.quantity',
                        )
                    "
                    :error="translateYupError(form.errors.quantity)"
                />
            </div>
            <div class="col-md-6">
                <BaseInputText
                    v-model:value="form.note"
                    :error="translateYupError(form.errors.note)"
                    :label="
                        $t('store.importMaterialDetail.importMaterialDetailDialog.note')
                    "
                    :placeholder="
                        $t(
                            'store.importMaterialDetail.importMaterialDetailDialog.placeholder.note',
                        )
                    "
                />
            </div>
            <div class="col-md-12">
                {{
                    $t('store.importMaterialDetail.importMaterialDetailDialog.totalPrice')
                }}
                <div style="font-weight: 700">
                    {{ parseMoney((form.quantity * form.pricePerUnit) | 0) }}
                </div>
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
import { initData } from '../../composition/importMaterialDetail';
import { storeModule } from '../../store';
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins, Options } from 'vue-property-decorator';
import { ISelectMaterialOptions } from '../../types';
@Options({
    name: 'import-material-form-popup',
})
export default class ImportMaterialDetailFormPopup extends mixins(UtilMixins) {
    get isShowImportMaterialDetailFormPopUp(): boolean {
        return storeModule.isShowImportMaterialDetailFormPopUp || false;
    }

    set isShowImportMaterialDetailFormPopUp(val: boolean) {
        storeModule.setIsShowImportMaterialDetailFormPopUp(val);
    }

    get materialOptions(): ISelectMaterialOptions[] {
        return storeModule.materialOptions;
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

    onChangeMaterial(): void {
        const materialSelected = this.materialOptions.find(
            (material) => material.value === this.form.materialId,
        );
        this.form.currentQuantity = materialSelected?.quantity;
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
