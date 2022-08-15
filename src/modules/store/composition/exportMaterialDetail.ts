import { exportMaterialDetailService } from '../services/api.service';
import {
    DEFAULT_FIRST_PAGE,
    HttpStatus,
    INPUT_NUMBER_MAX_VALUE,
    INPUT_TEXT_MAX_LENGTH,
} from '@/common/constants';
import { IBodyResponse } from '@/common/types';
import {
    showSuccessNotificationFunction,
    showErrorNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { useField, useForm } from 'vee-validate';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { storeModule } from '../store';
import yup from '@/plugins/yup';
import { IExportMaterialDetail, IExportMaterialDetailCreate } from '../types';

const validateExportMaterialDetailSchema = yup.object({
    materialId: yup
        .number()
        .integer()
        .min(0)
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(INPUT_NUMBER_MAX_VALUE)
        .required(),
    currentQuantity: yup
        .number()
        .integer()
        .min(0)
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(INPUT_NUMBER_MAX_VALUE),
    pricePerUnit: yup
        .number()
        .positive()
        .nullable(true)
        .transform((val) => (isNaN(val) ? null : +val))
        .max(INPUT_NUMBER_MAX_VALUE)
        .required(),
    quantity: yup
        .number()
        .positive()
        .nullable(true)
        .transform((val) => (isNaN(val) ? null : +val))
        .max(yup.ref('currentQuantity'))
        .required(),
    note: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH).required(),
});

export function initData() {
    const { t } = useI18n();
    const initValues = {
        materialId: undefined,
        pricePerUnit: undefined,
        quantity: 1,
        note: '',
        currentQuantity: 0,
    };
    const isCreate = computed(() => !storeModule.selectedExportMaterialDetail?.id);
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateExportMaterialDetailSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const createBody = {
            materialId: values.materialId,
            pricePerUnit: values.pricePerUnit,
            quantity: values.quantity,
            note: values.note,
            importMaterialId: storeModule.selectedExportMaterial?.id,
        } as IExportMaterialDetailCreate;
        let response;
        const exportMaterialDetailId = storeModule.selectedExportMaterialDetail?.id;
        const loading = ElLoading.service({
            target: '.export-material-detail-form-popup',
        });
        if (!isCreate.value) {
            response = await exportMaterialDetailService.update(
                exportMaterialDetailId as number,
                createBody,
            );
        } else {
            response = await exportMaterialDetailService.create(createBody);
        }
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                !isCreate.value
                    ? t('store.exportMaterialDetail.message.update.success')
                    : (t('store.exportMaterialDetail.message.create.success') as string),
            );
            storeModule.setQueryStringExportMaterialDetail({
                page: DEFAULT_FIRST_PAGE,
            });
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getExportMaterialOrders();
            loading.close();
            await storeModule.setIsShowExportMaterialDetailFormPopUp(false);
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                storeModule.setIsShowExportMaterialDetailFormPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getExportMaterialOrders();
                loading.close();
            }
        }
    });
    const { value: materialId } = useField('materialId');
    const { value: pricePerUnit } = useField('pricePerUnit');
    const { value: quantity } = useField('quantity');
    const { value: note } = useField('note');
    const { value: currentQuantity } = useField('currentQuantity');

    const openPopup = async () => {
        if (!isCreate.value) {
            const loading = ElLoading.service({
                target: '.import-material-detail-form-popup',
            });
            const exportMaterialDetail = (await exportMaterialDetailService.getDetail(
                storeModule.selectedExportMaterialDetail?.id || 0,
            )) as IBodyResponse<IExportMaterialDetail>;
            loading.close();
            resetForm({
                values: {
                    materialId: exportMaterialDetail.data?.materialId,
                    pricePerUnit: exportMaterialDetail.data?.pricePerUnit,
                    quantity: exportMaterialDetail.data?.quantity,
                    note: exportMaterialDetail.data?.note,
                    currentQuantity: exportMaterialDetail.data?.material?.quantity || 0,
                },
            });
        } else {
            resetForm({
                values: initValues,
            });
        }
    };
    return {
        materialId,
        quantity,
        pricePerUnit,
        currentQuantity,
        note,
        errors,
        validate,
        openPopup,
        onSubmit,
        resetForm,
        isCreate,
    };
}
