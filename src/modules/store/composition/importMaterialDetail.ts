import { importMaterialDetailService } from '../services/api.service';
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
import { IImportMaterialDetail, IImportMaterialDetailCreate } from '../types';

const validateImportMaterialDetailSchema = yup.object({
    materialId: yup
        .number()
        .integer()
        .min(0)
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(INPUT_NUMBER_MAX_VALUE)
        .required(),
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
        .max(INPUT_NUMBER_MAX_VALUE)
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
    };
    const isCreate = computed(() => !storeModule.selectedImportMaterialDetail?.id);
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateImportMaterialDetailSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const createBody = {
            materialId: values.materialId,
            pricePerUnit: values.pricePerUnit,
            quantity: values.quantity,
            note: values.note,
            importMaterialId: storeModule.selectedImportMaterial?.id,
        } as IImportMaterialDetailCreate;
        let response;
        const importMaterialDetailId = storeModule.selectedImportMaterialDetail?.id;
        const loading = ElLoading.service({
            target: '.import-material-detail-form-popup',
        });
        if (!isCreate.value) {
            response = await importMaterialDetailService.update(
                importMaterialDetailId as number,
                createBody,
            );
        } else {
            response = await importMaterialDetailService.create(createBody);
        }
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                !isCreate.value
                    ? t('store.importMaterialDetail.message.update.success')
                    : (t('store.importMaterialDetail.message.create.success') as string),
            );
            storeModule.setQueryStringImportMaterialDetail({
                page: DEFAULT_FIRST_PAGE,
            });
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getImportMaterialOrders();
            loading.close();
            await storeModule.setIsShowImportMaterialDetailFormPopUp(false);
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                storeModule.setIsShowImportMaterialDetailFormPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getImportMaterialOrders();
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
            const importMaterialDetail = (await importMaterialDetailService.getDetail(
                storeModule.selectedImportMaterialDetail?.id || 0,
            )) as IBodyResponse<IImportMaterialDetail>;
            loading.close();
            resetForm({
                values: {
                    materialId: importMaterialDetail.data?.materialId,
                    pricePerUnit: importMaterialDetail.data?.pricePerUnit,
                    quantity: importMaterialDetail.data?.quantity,
                    note: importMaterialDetail.data?.note,
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
