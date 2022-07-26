<template>
    <div>
        <el-dialog
            v-model="isOpenImportMaterialDetailExcelResultPopUp"
            width="80%"
            custom-class="confirm-dialog"
            destroy-on-close="true"
            @closed="closePopup"
            @open="openPopup"
        >
            <template #title>
                <h3 class="text-left">
                    {{ $t('store.importMaterialDetail.importMaterialDetailExcel.title') }}
                </h3>
            </template>
            <BaseTableLayout :data="importMaterialDetailExcels">
                <template #table-columns>
                    <el-table-column
                        :label="
                            $t(
                                'store.importMaterialDetail.importMaterialDetailExcel.material.label',
                            )
                        "
                        min-width="170"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="errors[scope.row?.index]?.material"
                                placement="bottom"
                                v-if="errors[scope.row?.index]?.material"
                            >
                                <div class="error w-100">
                                    {{ scope.row.material }}&nbsp;
                                </div>
                            </el-tooltip>
                            <div class="w-100" v-else>
                                {{ scope.row.material }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="
                            $t(
                                'store.importMaterialDetail.importMaterialDetailExcel.unit.label',
                            )
                        "
                        min-width="170"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="errors[scope.row?.index]?.unit"
                                placement="bottom"
                                v-if="errors[scope.row?.index]?.unit"
                            >
                                <div class="error w-100">{{ scope.row.unit }}&nbsp;</div>
                            </el-tooltip>
                            <div class="w-100" v-else>
                                {{ scope.row.unit }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="
                            $t(
                                'store.importMaterialDetail.importMaterialDetailExcel.quantity.label',
                            )
                        "
                        min-width="170"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="errors[scope.row?.index]?.quantity"
                                placement="bottom"
                                v-if="errors[scope.row?.index]?.quantity"
                            >
                                <div class="error w-100">
                                    {{ scope.row.quantity }}&nbsp;
                                </div>
                            </el-tooltip>
                            <div class="w-100" v-else>
                                {{ scope.row.quantity }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="
                            $t(
                                'store.importMaterialDetail.importMaterialDetailExcel.pricePerUnit.label',
                            )
                        "
                        min-width="170"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="errors[scope.row?.index]?.pricePerUnit"
                                placement="bottom"
                                v-if="errors[scope.row?.index]?.pricePerUnit"
                            >
                                <div class="error w-100">
                                    {{ scope.row.pricePerUnit }}&nbsp;
                                </div>
                            </el-tooltip>
                            <div class="w-100" v-else>
                                {{ scope.row.pricePerUnit }}
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                        :label="
                            $t(
                                'store.importMaterialDetail.importMaterialDetailExcel.note.label',
                            )
                        "
                        min-width="250"
                    >
                        <template #default="scope">
                            <el-tooltip
                                class="box-item"
                                effect="dark"
                                :content="errors[scope.row?.index]?.note"
                                placement="bottom"
                                v-if="errors[scope.row?.index]?.note"
                            >
                                <div class="w-100 error">{{ scope.row.note }}&nbsp;</div>
                            </el-tooltip>
                            <div class="w-100" v-else>
                                {{ scope.row.note }}
                            </div>
                        </template>
                    </el-table-column>
                </template>
            </BaseTableLayout>
            <template #footer>
                <span class="dialog-footer">
                    <div class="row justify-content-center footer">
                        <div
                            class="col-md-4 col-sm-6 d-flex justify-content-md-end justify-content-center"
                        >
                            <el-button @click="closePopup">
                                {{ $t('user.form.button.cancel') }}
                            </el-button>
                        </div>
                        <div
                            class="col-md-4 col-sm-6 d-flex justify-content-md-start justify-content-center"
                        >
                            <el-button
                                :disabled="isDisabledSaveButton || hasError"
                                type="primary"
                                @click="onClickSaveButton"
                            >
                                {{ $t('user.form.button.submit') }}
                            </el-button>
                        </div>
                    </div>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { mixins, Options } from 'vue-property-decorator';
import { UtilMixins } from '@/mixins/utilMixins';
import { INPUT_TEXT_MAX_LENGTH, REGEX, TEXTAREA_MAX_LENGTH } from '@/common/constants';
import { ElLoading } from 'element-plus';
import { showErrorNotificationFunction } from '@/utils/helper';

import { IImportMaterialDetailExcel } from '../../types';
import { storeModule } from '../../store';
import { importMaterialDetailService } from '../../services/api.service';
import { parseImportErrors } from '@/common/helpers';

@Options({})
export default class ImportMaterialDetailExcelResultPopup extends mixins(UtilMixins) {
    isDisabledSaveButton = false;

    errors = {};
    hasError = false;

    get importMaterialDetailExcels(): IImportMaterialDetailExcel[] {
        return storeModule.importMaterialDetailExcels;
    }

    get isOpenImportMaterialDetailExcelResultPopUp(): boolean {
        return storeModule.isOpenImportMaterialDetailExcelResultPopUp;
    }

    validateData(): void {
        this.hasError = false;
        this.importMaterialDetailExcels.forEach((importMaterialDetailExcel) => {
            if (importMaterialDetailExcel.index !== undefined) {
                const materialError = this.validateMaterial(
                    importMaterialDetailExcel.material,
                );
                const pricePerUnitError = this.validatePricePerUnit(
                    importMaterialDetailExcel.pricePerUnit,
                );
                const unitError = this.validateUnit(importMaterialDetailExcel.unit);

                const noteError = this.validateNote(importMaterialDetailExcel.note);

                const quantityError = this.validateQuantity(
                    importMaterialDetailExcel.quantity,
                );
                this.errors = {
                    ...this.errors,
                    [importMaterialDetailExcel.index]: {
                        material: materialError,
                        unit: unitError,
                        pricePerUnit: pricePerUnitError,
                        note: noteError,
                        quantity: quantityError,
                    },
                };

                if (noteError || quantityError) {
                    this.hasError = true;
                }
            }
        });
    }

    validateMaterial(material: string): string {
        if (!material) {
            return this.$t(
                'store.importMaterialDetail.importMaterialDetailExcel.material.required',
            );
        }
        if (material?.length > INPUT_TEXT_MAX_LENGTH) {
            return this.$t(
                'store.importMaterialDetail.importMaterialDetailExcel.material.maxLength',
            );
        }
        return '';
    }

    validateUnit(unit: string): string {
        if (!unit) {
            return this.$t(
                'store.importMaterialDetail.importMaterialDetailExcel.unit.required',
            );
        }
        if (unit?.length > INPUT_TEXT_MAX_LENGTH) {
            return this.$t(
                'store.importMaterialDetail.importMaterialDetailExcel.unit.maxLength',
            );
        }
        return '';
    }

    validateQuantity(quantity?: string): string {
        if (!quantity) {
            return this.$t(
                'store.importMaterialDetail.importMaterialDetailExcel.quantity.required',
            );
        }

        if (!REGEX.NUMBER.test(quantity)) {
            return this.$t(
                'store.importMaterialDetail.importMaterialDetailExcel.quantity.invalid',
            );
        }

        return '';
    }

    validatePricePerUnit(pricePerUnit: string): string {
        if (!pricePerUnit) {
            return this.$t(
                'store.importMaterialDetail.importMaterialDetailExcel.pricePerUnit.required',
            );
        }

        if (!REGEX.NUMBER.test(pricePerUnit)) {
            return this.$t(
                'store.importMaterialDetail.importMaterialDetailExcel.pricePerUnit.invalid',
            );
        }

        return '';
    }

    validateNote(note?: string): string {
        if (note && note.length > TEXTAREA_MAX_LENGTH) {
            return this.$t(
                'store.importMaterialDetail.importMaterialDetailExcel.note.maxLength',
            );
        }
        return '';
    }

    async onClickSaveButton(): Promise<void> {
        this.isDisabledSaveButton = true;
        const importMaterialDetailExcels = this.importMaterialDetailExcels.map(
            (importMaterialDetailExcel) => {
                return {
                    ...importMaterialDetailExcel,
                    importMaterialId:
                        storeModule.selectedImportMaterial?.id?.toString() ?? '',
                    quantity: importMaterialDetailExcel.quantity?.toString(),
                    note: importMaterialDetailExcel.note?.toString(),
                };
            },
        );
        const response = await importMaterialDetailService.importMaterialDetailExcels({
            importMaterialDetailExcels: importMaterialDetailExcels,
        });

        if (response.success) {
            const importMaterialDetailExcelResponses = response.data.results;

            if (
                !Object.keys(importMaterialDetailExcelResponses).find(
                    (key) => !importMaterialDetailExcelResponses[key].isValid,
                )
            ) {
                this.showSuccessNotification(
                    this.$t(
                        'user.form.message.importMaterialDetailExcelSuccess',
                    ) as string,
                );
                storeModule.setIsOpenImportMaterialDetailExcelResultPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getImportMaterialOrders();
                loading.close();
                this.isDisabledSaveButton = false;
            } else {
                this.errors = parseImportErrors(importMaterialDetailExcelResponses);
                this.scrollToError('error');
            }
        } else {
            showErrorNotificationFunction(response.message as string);
        }
    }

    openPopup(): void {
        this.isDisabledSaveButton = false;
        this.validateData();
        this.scrollToError('error');
    }

    closePopup(): void {
        storeModule.setIsOpenImportMaterialDetailExcelResultPopUp(false);
        storeModule.setImportMaterialDetailExcels([]);
    }
}
</script>

<style lang="scss" scoped>
.error {
    color: rgb(219, 58, 104) !important;
    background-color: rgb(255, 203, 193);
}
.w-100 {
    height: 100%;
    width: 100%;
    padding: 8px 12px;
}
:deep(td.el-table__cell) {
    padding: 0px !important;
    .cell {
        height: 100%;
        width: 100%;
    }
}
</style>
