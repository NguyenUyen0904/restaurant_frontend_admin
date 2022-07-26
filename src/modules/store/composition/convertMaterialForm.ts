import { IConvertMaterialCreate, IMaterial } from '../types';
import { convertMaterialService, materialService } from '../services/api.service';
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
import { useI18n } from 'vue-i18n';
import { storeModule } from '../store';
import yup from '@/plugins/yup';

const validateConvertMaterialSchema = yup.object({
    idMaterialFrom: yup
        .number()
        .integer()
        .min(0)
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(INPUT_NUMBER_MAX_VALUE),
    quantityFrom: yup
        .number()
        .integer()
        .min(0)
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(yup.ref('quantityBeforeConvertFrom')),
    quantityBeforeConvertFrom: yup
        .number()
        .integer()
        .min(0)
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(INPUT_NUMBER_MAX_VALUE),
    idMaterialTo: yup
        .number()
        .integer()
        .min(0)
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(INPUT_NUMBER_MAX_VALUE),
    quantityTo: yup
        .number()
        .integer()
        .min(0)
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(yup.ref('quantityBeforeConvertTo')),
    quantityBeforeConvertTo: yup
        .number()
        .integer()
        .min(0)
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(INPUT_NUMBER_MAX_VALUE),
    note: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH).required(),
});

export function initData() {
    const { t } = useI18n();
    const initValues = {
        idMaterialFrom: undefined,
        quantityFrom: 0,
        quantityBeforeConvertFrom: 0,
        idMaterialTo: undefined,
        quantityTo: 0,
        quantityBeforeConvertTo: 0,
        note: '',
    };
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateConvertMaterialSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const createBody = {
            ...values,
            idMaterialFrom: values.idMaterialFrom,
            quantityFrom: values.quantityFrom,
            quantityBeforeConvertFrom: values.quantityBeforeConvertFrom,
            idMaterialTo: values.idMaterialTo,
            quantityTo: values.quantityTo,
            quantityBeforeConvertTo: values.quantityBeforeConvertTo,
            note: values.note,
        } as IConvertMaterialCreate;
        const loading = ElLoading.service({
            target: '.material-form-popup',
        });

        const response = await convertMaterialService.create(createBody);

        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                t('store.material.message.create.success') as string,
            );
            storeModule.setQueryStringMaterial({
                page: DEFAULT_FIRST_PAGE,
            });
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getMaterials();
            loading.close();
            await storeModule.setIsShowConvertMaterialFormPopUp(false);
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                storeModule.setIsShowMaterialFormPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getMaterials();
                loading.close();
            }
        }
    });
    const { value: idMaterialFrom } = useField('idMaterialFrom');
    const { value: quantityFrom } = useField('quantityFrom');
    const { value: quantityBeforeConvertFrom } = useField('quantityBeforeConvertFrom');
    const { value: idMaterialTo } = useField('idMaterialTo');
    const { value: quantityTo } = useField('quantityTo');
    const { value: quantityBeforeConvertTo } = useField('quantityBeforeConvertTo');
    const { value: note } = useField('note');
    const openPopup = async () => {
        const loading = ElLoading.service({
            target: '.material-form-popup',
        });
        const materialDetail = (await materialService.getDetail(
            storeModule.selectedMaterial?.id || 0,
        )) as IBodyResponse<IMaterial>;
        loading.close();
        resetForm({
            values: {
                ...initValues,
                idMaterialFrom: materialDetail.data.id,
                quantityBeforeConvertFrom: materialDetail.data.quantity,
            },
        });
    };

    return {
        idMaterialFrom,
        quantityFrom,
        quantityBeforeConvertFrom,
        idMaterialTo,
        quantityTo,
        quantityBeforeConvertTo,
        note,

        errors,
        validate,
        openPopup,
        onSubmit,
        resetForm,
    };
}
