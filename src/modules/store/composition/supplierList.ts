import { DEFAULT_FIRST_PAGE, HttpStatus } from '@/common/constants';
import i18n from '@/plugins/vue-i18n';
import { storeModule } from '../store';
import {
    showConfirmPopUpFunction,
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import { ElLoading } from 'element-plus';
import { supplierService } from '../services/api.service';

export const setupDelete = () => {
    const deleteSupplier = async (id: number) => {
        const isConfirm = await showConfirmPopUpFunction(
            i18n.global.t('store.supplier.message.delete.confirmAsk') as string,
            i18n.global.t('store.supplier.message.delete.title') as string,
            {},
        );
        if (isConfirm) {
            const loading = ElLoading.service({
                target: '.content',
            });
            const response = await supplierService.delete(id);
            loading.close();
            if (response.success) {
                showSuccessNotificationFunction(
                    i18n.global.t('store.supplier.message.delete.success') as string,
                );
                storeModule.setQueryStringSupplier({
                    page: DEFAULT_FIRST_PAGE,
                });
                const loading = ElLoading.service({
                    target: '.content',
                });
                await storeModule.getSuppliers();
                loading.close();
            } else {
                showErrorNotificationFunction(response.message);
                if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                    const loading = ElLoading.service({
                        target: '.content',
                    });
                    await storeModule.getSuppliers();
                    loading.close();
                }
            }
        }
    };

    return { deleteSupplier };
};
