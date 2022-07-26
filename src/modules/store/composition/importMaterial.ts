import { importMaterialService } from '../services/api.service';
import { IImportMaterial, IImportMaterialCreate } from '../types';
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

const validateImportMaterialSchema = yup.object({
    note: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH),
    supplierId: yup
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
        note: '',
        supplierId: undefined,
    };
    const isCreate = computed(() => !storeModule.selectedImportMaterial?.id);
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateImportMaterialSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const createBody = {
            ...values,
            note: values.note,
            supplierId: values.supplierId,
        } as IImportMaterialCreate;
        let response;
        const importMaterialId = storeModule.selectedImportMaterial?.id;
        const loading = ElLoading.service({
            target: '.import-material-form-popup',
        });
        if (!isCreate.value) {
            response = await importMaterialService.update(
                importMaterialId as number,
                createBody,
            );
        } else {
            response = await importMaterialService.create(createBody);
        }
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                !isCreate.value
                    ? t('store.importMaterial.message.update.success')
                    : (t('store.importMaterial.message.create.success') as string),
            );
            storeModule.setQueryStringImportMaterial({
                page: DEFAULT_FIRST_PAGE,
            });
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getImportMaterials();
            loading.close();
            await storeModule.setIsShowImportMaterialFormPopUp(false);
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                storeModule.setIsShowImportMaterialFormPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getImportMaterials();
                loading.close();
            }
        }
    });
    const { value: supplierId } = useField('supplierId');
    const { value: note } = useField('note');

    const openPopup = async () => {
        if (!isCreate.value) {
            const loading = ElLoading.service({
                target: '.import-material-form-popup',
            });
            const importMaterialDetail = (await importMaterialService.getDetail(
                storeModule.selectedImportMaterial?.id || 0,
            )) as IBodyResponse<IImportMaterial>;
            loading.close();
            resetForm({
                values: {
                    supplierId: importMaterialDetail.data?.supplierId,
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
        supplierId,
        note,
        errors,
        validate,
        openPopup,
        onSubmit,
        resetForm,
        isCreate,
    };
}
