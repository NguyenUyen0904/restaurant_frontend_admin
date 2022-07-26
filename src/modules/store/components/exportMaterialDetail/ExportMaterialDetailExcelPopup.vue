<template>
    <BaseImportFile
        :isShowUploadForm="isOpenImportMaterialDetailExcelFilePopup"
        @handleSave="onClickButtonImport"
        @download="handleDownloadImportUserFile"
        @changeFile="handleChangeFile"
        @resetUpload="closePopup"
        :title="$t('user.form.import.importUser')"
        :error="$t(`${importErrorMessage}`)"
    />
</template>

<script lang="ts">
import { UtilMixins } from '@/mixins/utilMixins';
import { mixins } from 'vue-property-decorator';
import { Options } from 'vue-class-component';
import { downloadFile } from '@/utils/commonFunction';
import * as XLSX from 'xlsx';
import { EXCEL_ACCEPTED_FILE_TYPES, MAX_FILE_SIZE_IN_BYTE } from '@/common/constants';
import { IImportMaterialDetailExcel } from '../../types';
import { storeModule } from '../../store';

@Options({})
export default class ExportMaterialDetailExcelPopup extends mixins(UtilMixins) {
    importErrorMessage = '';

    get isOpenImportMaterialDetailExcelFilePopup(): boolean {
        return storeModule.isOpenImportMaterialDetailExcelFilePopup;
    }

    async validateFileData(file: File): Promise<boolean> {
        const isValidFileSize = file?.size < MAX_FILE_SIZE_IN_BYTE;
        if (!file) {
            this.importErrorMessage = this.$t('common.common.uploadFile.rules.empty');
            return false;
        }
        if (file.name) {
            const finalFileName = file.name.split('.');
            if (
                !EXCEL_ACCEPTED_FILE_TYPES.includes(
                    finalFileName[finalFileName.length - 1],
                )
            ) {
                this.importErrorMessage = this.$t(
                    'common.common.uploadFile.rules.invalidType.excel',
                );
                return false;
            }
        }
        if (!isValidFileSize) {
            this.importErrorMessage = this.$t('common.common.uploadFile.rules.tooBig');
            return false;
        }
        return true;
    }

    async onClickButtonImport(file: File): Promise<void> {
        if (await this.validateFileData(file)) {
            const fileText = await file.arrayBuffer();
            const workbook = XLSX.read(fileText);
            const dataList = XLSX.utils.sheet_to_json(
                workbook.Sheets[workbook.SheetNames[0]],
                { raw: true },
            ) as IImportMaterialDetailExcel[];
            storeModule.setImportMaterialDetailExcels(dataList);
            storeModule.setIsOpenImportMaterialDetailExcelResultPopUp(true);
            storeModule.setIsOpenImportMaterialDetailExcelFilePopup(false);
        }
    }

    handleChangeFile(): void {
        this.importErrorMessage = '';
    }

    handleDownloadImportUserFile(): void {
        downloadFile(
            'import_import_material_detail_template.xlsx',
            `${window.location.origin}/templates/import_import_material_detail_template.xlsx`,
        );
    }

    closePopup(): void {
        this.importErrorMessage = '';
        storeModule.setIsOpenImportMaterialDetailExcelFilePopup(false);
    }
}
</script>

<style lang="scss" scoped></style>
