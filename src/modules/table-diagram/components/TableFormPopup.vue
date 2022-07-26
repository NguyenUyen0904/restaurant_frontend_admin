<template>
    <el-dialog
        width="50%"
        v-model="isShowTableFormPopUp"
        destroy-on-close
        @closed="closePopup"
        @open="form.openPopup"
        custom-class="food-form-popup"
    >
        <template #title>
            <h3 class="text-left">
                {{
                    form.isCreate
                        ? $t('tableDiagram.table.tableDialog.titleCreate')
                        : $t('tableDiagram.table.tableDialog.titleUpdate')
                }}
            </h3>
        </template>
        <div class="row">
            <div class="col-md-6">
                <BaseInputText
                    v-model:value="form.name"
                    :is-required="true"
                    :placeholder="$t('tableDiagram.table.tableDialog.placeholder.name')"
                    :label="$t('tableDiagram.table.tableDialog.name')"
                    :error="translateYupError(form.errors.name)"
                />
            </div>
            <div class="col-md-6">
                <BaseInputNumber
                    v-model:value="form.numberSeat"
                    :placeholder="
                        $t('tableDiagram.table.tableDialog.placeholder.numberSeat')
                    "
                    :label="$t('tableDiagram.table.tableDialog.numberSeat')"
                    :error="translateYupError(form.errors.numberSeat)"
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
                            {{ $t('tableDiagram.table.button.cancel') }}
                        </el-button>
                    </div>
                    <div
                        class="col-md-4 col-sm-6 d-flex justify-content-md-start justify-content-center"
                    >
                        <el-button type="primary" @click="onClickSaveButton">
                            {{ $t('tableDiagram.table.button.submit') }}
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
import { tableDiagramModule } from '../store';
import { initData } from '../composition/table';
@Options({
    name: 'food-form-popup',
})
export default class TableFormPopUp extends mixins(UtilMixins) {
    get isShowTableFormPopUp(): boolean {
        return tableDiagramModule.isShowTableFormPopUp || false;
    }

    set isShowTableFormPopUp(val: boolean) {
        tableDiagramModule.setIsShowTableFormPopUp(val);
    }

    form = setup(() => initData());

    async closePopup(): Promise<void> {
        tableDiagramModule.setIsShowTableFormPopUp(false);
        tableDiagramModule.setTableSelected(null);
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
