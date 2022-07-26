import { ISupplier, ISupplierCreate } from '../types';
import { supplierService } from '../services/api.service';
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

const validateSupplierSchema = yup.object({
    name: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH).required(),
    phone: yup.string().trim().optional().required(),
    address: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH).required(),
});

export function initData() {
    const { t } = useI18n();
    const initValues = {
        name: '',
        phone: '',
        address: '',
    };
    const isCreate = computed(() => !storeModule.selectedSupplier?.id);
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateSupplierSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const createBody = {
            ...values,
            name: values.name?.trim(),
            phone: values.phone?.trim(),
            address: values.address?.trim(),
        } as ISupplierCreate;
        let response;
        const supplierId = storeModule.selectedSupplier?.id;
        const loading = ElLoading.service({
            target: '.supplier-form-popup',
        });
        if (!isCreate.value) {
            response = await supplierService.update(supplierId as number, createBody);
        } else {
            response = await supplierService.create(createBody);
        }
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                !isCreate.value
                    ? t('store.supplier.message.update.success')
                    : (t('store.supplier.message.create.success') as string),
            );
            storeModule.setQueryStringSupplier({
                page: DEFAULT_FIRST_PAGE,
            });
            const loading = ElLoading.service({
                target: '.content',
            });
            await storeModule.getSuppliers();
            loading.close();
            await storeModule.setIsShowSupplierFormPopUp(false);
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                storeModule.setIsShowSupplierFormPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getSuppliers();
                loading.close();
            }
        }
    });
    const { value: name } = useField('name');
    const { value: phone } = useField('phone');
    const { value: address } = useField('address');

    const openPopup = async () => {
        if (!isCreate.value) {
            const loading = ElLoading.service({
                target: '.supplier-form-popup',
            });
            const supplierDetail = (await supplierService.getDetail(
                storeModule.selectedSupplier?.id || 0,
            )) as IBodyResponse<ISupplier>;
            loading.close();
            resetForm({
                values: {
                    name: supplierDetail.data?.name,
                    phone: supplierDetail.data?.phone,
                    address: supplierDetail.data?.address,
                },
            });
        } else {
            resetForm({
                values: initValues,
            });
        }
    };
    return {
        name,
        phone,
        address,
        errors,
        validate,
        openPopup,
        onSubmit,
        resetForm,
        isCreate,
    };
}
