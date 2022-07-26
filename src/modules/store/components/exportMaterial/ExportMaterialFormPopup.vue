<template>
    <el-dialog
        width="50%"
        v-model="isShowExportMaterialFormPopUp"
        destroy-on-close
        @closed="closePopup"
        @open="form.openPopup"
        custom-class="export-material-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{
                    form.isCreate
                        ? $t('store.exportMaterial.exportMaterialDialog.titleCreate')
                        : $t('store.exportMaterial.exportMaterialDialog.titleUpdate')
                }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-6">
                <BaseInputText
                    v-model:value="form.transporters"
                    :error="translateYupError(form.errors.transporters)"
                    :label="$t('store.exportMaterial.exportMaterialDialog.transporters')"
                    :placeholder="
                        $t(
                            'store.exportMaterial.exportMaterialDialog.placeholder.transporters',
                        )
                    "
                />
            </div>
            <div class="col-md-6">
                <BaseInputText
                    v-model:value="form.note"
                    :error="translateYupError(form.errors.note)"
                    :label="$t('store.exportMaterial.exportMaterialDialog.note')"
                    :placeholder="
                        $t('store.exportMaterial.exportMaterialDialog.placeholder.note')
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
                                    'store.exportMaterial.exportMaterialDialog.button.cancel',
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
                                    'store.exportMaterial.exportMaterialDialog.button.submit',
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
import { initData } from '../../composition/exportMaterial';
import { storeModule } from '../../store';
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins, Options } from 'vue-property-decorator';
@Options({
    name: 'export-material-form-popup',
})
export default class ExportMaterialFormPopup extends mixins(UtilMixins) {
    get isShowExportMaterialFormPopUp(): boolean {
        return storeModule.isShowExportMaterialFormPopUp || false;
    }

    set isShowExportMaterialFormPopUp(val: boolean) {
        storeModule.setIsShowExportMaterialFormPopUp(val);
    }

    form = setup(() => initData());

    async closePopup(): Promise<void> {
        storeModule.setIsShowExportMaterialFormPopUp(false);
        storeModule.setSelectedExportMaterial(null);
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
