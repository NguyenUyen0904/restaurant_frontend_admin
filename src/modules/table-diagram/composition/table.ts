import { tableService } from './../services/api.service';
import { ITable, ITableCreateTable } from './../types';
import { tableDiagramModule } from '../store';
import { useField, useForm } from 'vee-validate';
import { useI18n } from 'vue-i18n';
import { computed } from 'vue';
import { ElLoading } from 'element-plus';
import { DEFAULT_FIRST_PAGE, HttpStatus } from '@/common/constants';
import { validateTableSchema } from '../constants';
import { IBodyResponse } from '@/common/types';
import {
    showErrorNotificationFunction,
    showSuccessNotificationFunction,
} from '@/utils/helper';

export function initData() {
    const { t } = useI18n();
    const initValues = {
        name: '',
        numberSeat: undefined,
    };
    const isCreate = computed(() => !tableDiagramModule.tableSelected?.id);
    const { handleSubmit, errors, resetForm, validate } = useForm({
        initialValues: initValues,
        validationSchema: validateTableSchema,
    });

    const onSubmit = handleSubmit(async (values) => {
        const createBody = {
            ...values,
            name: values.name?.trim(),
            numberSeat: values.numberSeat,
        } as ITableCreateTable;
        let response;
        const tableId = tableDiagramModule.tableSelected?.id;
        const loading = ElLoading.service({
            target: '.table-form',
        });
        if (!isCreate.value) {
            response = await tableService.update(tableId as number, createBody);
        } else {
            response = await tableService.create(createBody);
        }
        loading.close();
        if (response.success) {
            showSuccessNotificationFunction(
                !isCreate.value
                    ? t('tableDiagram.table.message.update.success')
                    : (t('tableDiagram.table.message.create.success') as string),
            );
            tableDiagramModule.setIsShowTableFormPopUp(false);
            tableDiagramModule.setTableQueryString({ page: DEFAULT_FIRST_PAGE });
            const loading = ElLoading.service({
                target: '.content',
            });
            await tableDiagramModule.getTables();
            loading.close();
        } else {
            showErrorNotificationFunction(response.message as string);
            if (response.code === HttpStatus.ITEM_NOT_FOUND) {
                tableDiagramModule.setIsShowTableFormPopUp(false);
                const loading = ElLoading.service({
                    target: '.content',
                });
                await tableDiagramModule.getTables();
                loading.close();
            }
        }
    });
    const { value: name } = useField('name');
    const { value: numberSeat } = useField('numberSeat');

    const openPopup = async () => {
        if (!isCreate.value) {
            const loading = ElLoading.service({ target: '.table-form-popup' });
            const tableDetail = (await tableService.getDetail(
                tableDiagramModule.tableSelected?.id || 0,
            )) as IBodyResponse<ITable>;
            loading.close();
            resetForm({
                values: {
                    name: tableDetail.data?.name,
                    numberSeat: tableDetail.data?.numberSeat,
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
        numberSeat,
        isCreate,
        validate,
        openPopup,
        onSubmit,
        resetForm,
    };
}
