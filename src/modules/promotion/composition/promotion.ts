import { useField, useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { ElLoading } from 'element-plus';
import { DEFAULT_FIRST_PAGE, HttpStatus } from '@/common/constants';
import { validatePromotionSchema } from '../constants';
import { IPromotion, IPromotionCreateBody } from '../types';
import { IBodyResponse } from '@/common/types';
import {
    showConfirmPopUpFunction,
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';
import i18n from '@/plugins/vue-i18n';
import { promotionService } from '../services/api.service';
import { promotionModule } from '../store';

export function initData() {
    const { t } = useI18n();
    const initValues = {
        name: '',
        note: '',
        percent: undefined,
    };
    const isCreate = computed(() => !promotionModule.selectedPromotion?.id);
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validatePromotionSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const createBody = {
            ...values,
            name: values.name,
            note: values.note?.trim(),
            percent: values.percent,
        } as IPromotionCreateBody;
        let response;
        const promotionId = promotionModule.selectedPromotion?.id;
        const loading = ElLoading.service({
            target: '.promotion-form',
        });
        if (!isCreate.value) {
            response = await promotionService.update(promotionId as number, createBody);
        } else {
            response = await promotionService.create(createBody);
        }
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                !isCreate.value
                    ? t('promotion.promotion.message.update.success')
                    : (t('promotion.promotion.message.create.success') as string),
            );
            promotionModule.setIsShowPromotionFormPopUp(false);
            promotionModule.setPromotionQueryString({ page: DEFAULT_FIRST_PAGE });
            const loading = ElLoading.service({
                target: '.content',
            });
            await promotionModule.getPromotions();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                promotionModule.setIsShowPromotionFormPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await promotionModule.getPromotions();
                loading.close();
            }
        }
    });
    const { value: name } = useField('name');
    const { value: note } = useField('note');
    const { value: percent } = useField('percent');

    const openPopup = async () => {
        if (!isCreate.value) {
            const loading = ElLoading.service({ target: '.promotion-form-popup' });
            const promotionDetail = (await promotionService.getDetail(
                promotionModule.selectedPromotion?.id || 0,
            )) as IBodyResponse<IPromotion>;
            loading.close();
            resetForm({
                values: {
                    name: promotionDetail.data?.name,
                    note: promotionDetail.data?.note,
                    percent: promotionDetail.data?.percent,
                },
            });
        } else {
            resetForm({
                values: initValues,
            });
        }
    };
    return {
        errors,
        name,
        percent,
        note,
        isCreate,
        validate,
        openPopup,
        onSubmit,
        resetForm,
    };
}

export const setupDelete = () => {
    const deletePromotion = async (id: number) => {
        const isConfirm = await showConfirmPopUpFunction(
            i18n.global.t('promotion.promotion.message.delete.confirmAsk') as string,
            i18n.global.t('promotion.promotion.message.delete.title') as string,
            {},
        );
        if (isConfirm) {
            const loading = ElLoading.service({
                target: '.content',
            });
            const response = await promotionService.delete(id);
            loading.close();
            if (response.success) {
                showSuccessNotificationFunction(
                    i18n.global.t('promotion.promotion.message.delete.success') as string,
                );
                promotionModule.setPromotionQueryString({
                    page: DEFAULT_FIRST_PAGE,
                });
                const loading = ElLoading.service({
                    target: '.content',
                });
                await promotionModule.getPromotions();
                loading.close();
            } else {
                showErrorNotificationFunction(response.message);
                if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                    const loading = ElLoading.service({
                        target: '.content',
                    });
                    await promotionModule.getPromotions();
                    loading.close();
                }
            }
        }
    };

    return { deletePromotion };
};
