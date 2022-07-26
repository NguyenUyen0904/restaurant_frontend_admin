import { INPUT_TEXT_MAX_LENGTH, INPUT_NUMBER_MAX_VALUE } from '@/common/constants';
import yup from '@/plugins/yup/index';

export enum TableStatus {
    BOOKED = 'booked',
    USED = 'used',
    READY = 'ready',
}

export const ALL_USER_QUANTITY_RANGE = -1;

export const validateTableSchema = yup.object({
    name: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH).required(),
    numberSeat: yup
        .number()
        .integer()
        .min(0)
        .nullable()
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(INPUT_NUMBER_MAX_VALUE),
});

export const LIMIT_ARRIVAL_TIME_BOOKING = 10800000;
