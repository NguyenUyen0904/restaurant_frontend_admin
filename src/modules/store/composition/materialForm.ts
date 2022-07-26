import { IMaterial, IMaterialCreate } from './../types';
import { materialService } from './../services/api.service';
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

const validateMaterialSchema = yup.object({
    material: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH).required(),
    unit: yup.string().trim().optional().required(),
    quantity: yup
        .number()
        .integer()
        .min(0)
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(INPUT_NUMBER_MAX_VALUE),
});

export function initData() {
    const { t } = useI18n();
    const initValues = {
        material: '',
        unit: '',
        quantity: undefined,
    };
    const isCreate = computed(() => !storeModule.selectedMaterial?.id);
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateMaterialSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const createBody = {
            ...values,
            material: values.material?.trim(),
            unit: values.unit,
            quantity: values.quantity,
        } as IMaterialCreate;
        let response;
        const materialId = storeModule.selectedMaterial?.id;
        const loading = ElLoading.service({
            target: '.material-form-popup',
        });
        if (!isCreate.value) {
            response = await materialService.update(materialId as number, createBody);
        } else {
            response = await materialService.create(createBody);
        }
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                !isCreate.value
                    ? t('store.material.message.update.success')
                    : (t('store.material.message.create.success') as string),
            );
            storeModule.setQueryStringMaterial({
                page: DEFAULT_FIRST_PAGE,
            });
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getMaterials();
            loading.close();
            await storeModule.setIsShowMaterialFormPopUp(false);
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
    const { value: material } = useField('material');
    const { value: unit } = useField('unit');
    const { value: quantity } = useField('quantity');

    const openPopup = async () => {
        if (!isCreate.value) {
            const loading = ElLoading.service({
                target: '.material-form-popup',
            });
            const materialDetail = (await materialService.getDetail(
                storeModule.selectedMaterial?.id || 0,
            )) as IBodyResponse<IMaterial>;
            loading.close();
            resetForm({
                values: {
                    material: materialDetail.data?.material,
                    unit: materialDetail.data?.unit,
                    quantity: materialDetail.data?.quantity,
                },
            });
        } else {
            resetForm({
                values: initValues,
            });
        }
    };
    return {
        material,
        unit,
        quantity,

        errors,
        validate,
        openPopup,
        onSubmit,
        resetForm,
        isCreate,
    };
}
