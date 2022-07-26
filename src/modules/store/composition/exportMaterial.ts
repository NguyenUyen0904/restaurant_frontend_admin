import { exportMaterialService } from '../services/api.service';
import { IExportMaterial, IExportMaterialCreate } from '../types';
import {
    DEFAULT_FIRST_PAGE,
    HttpStatus,
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

const validateExportMaterialSchema = yup.object({
    note: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH),
    transporters: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH),
});

export function initData() {
    const { t } = useI18n();
    const initValues = {
        note: '',
        transporters: '',
    };
    const isCreate = computed(() => !storeModule.selectedExportMaterial?.id);
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateExportMaterialSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const createBody = {
            ...values,
            note: values.note,
            transporters: values.transporters,
        } as IExportMaterialCreate;
        let response;
        const exportMaterialId = storeModule.selectedExportMaterial?.id;
        const loading = ElLoading.service({
            target: '.export-material-form-popup',
        });
        if (!isCreate.value) {
            response = await exportMaterialService.update(
                exportMaterialId as number,
                createBody,
            );
        } else {
            response = await exportMaterialService.create(createBody);
        }
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                !isCreate.value
                    ? t('store.exportMaterial.message.update.success')
                    : (t('store.exportMaterial.message.create.success') as string),
            );
            storeModule.setQueryStringExportMaterial({
                page: DEFAULT_FIRST_PAGE,
            });
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getExportMaterials();
            loading.close();
            storeModule.setIsShowExportMaterialFormPopUp(false);
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                storeModule.setIsShowExportMaterialFormPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getExportMaterials();
                loading.close();
            }
        }
    });
    const { value: transporters } = useField('transporters');
    const { value: note } = useField('note');

    const openPopup = async () => {
        if (!isCreate.value) {
            const loading = ElLoading.service({
                target: '.export-material-form-popup',
            });
            const exportMaterialDetail = (await exportMaterialService.getDetail(
                storeModule.selectedExportMaterial?.id || 0,
            )) as IBodyResponse<IExportMaterial>;
            loading.close();
            resetForm({
                values: {
                    transporters: exportMaterialDetail.data?.transporters,
                    note: exportMaterialDetail.data?.note,
                },
            });
        } else {
            resetForm({
                values: initValues,
            });
        }
    };
    return {
        transporters,
        note,
        errors,
        validate,
        openPopup,
        onSubmit,
        resetForm,
        isCreate,
    };
}
