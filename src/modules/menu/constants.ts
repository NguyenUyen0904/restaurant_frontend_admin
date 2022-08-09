import { INPUT_NUMBER_MAX_VALUE, TEXTAREA_MAX_LENGTH } from '@/common/constants';
import yup from '@/plugins/yup/index';

export const validateFoodSchema = yup.object({
    foodImgId: yup.number().positive().max(INPUT_NUMBER_MAX_VALUE).optional().nullable(),
    foodName: yup.string().trim().nullable().max(TEXTAREA_MAX_LENGTH).optional(),
    price: yup
        .number()
        .integer()
        .min(0)
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(INPUT_NUMBER_MAX_VALUE),
    categoryId: yup.number().positive().nullable().required().label('province'),
});

export const validateCategorySchema = yup.object({
    name: yup.string().trim().nullable().max(TEXTAREA_MAX_LENGTH).optional(),
    note: yup.string().trim().nullable().max(TEXTAREA_MAX_LENGTH).optional(),
});
