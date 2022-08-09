import { INPUT_NUMBER_MAX_VALUE, TEXTAREA_MAX_LENGTH } from '@/common/constants';
import yup from '@/plugins/yup/index';

export const validatePromotionSchema = yup.object({
    name: yup.string().trim().nullable().max(TEXTAREA_MAX_LENGTH).optional(),
    note: yup.string().trim().nullable().max(TEXTAREA_MAX_LENGTH).optional(),
    percent: yup
        .number()
        .integer()
        .min(0)
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(INPUT_NUMBER_MAX_VALUE),
});
