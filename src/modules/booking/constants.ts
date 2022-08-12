import { INPUT_NUMBER_MAX_VALUE, INPUT_TEXT_MAX_LENGTH, REGEX } from '@/common/constants';
import yup from '@/plugins/yup/index';

export enum BookingStatus {
    WAITING = 'waiting',
    CANCELED = 'canceled',
    DONE = 'done',
}

export const userQuantityRange = [[0, 50], [50, 100], [100]];

export const bookingStatusOptions = [
    {
        label: 'booking.list.status.done',
        value: BookingStatus.DONE,
    },
    {
        label: 'booking.list.status.canceled',
        value: BookingStatus.CANCELED,
    },
    {
        label: 'booking.list.status.waiting',
        value: BookingStatus.WAITING,
    },
];

export const ALL_USER_QUANTITY_RANGE = -1;

export const BookingSchema = yup.object({
    nameCustomer: yup.string().trim().max(INPUT_TEXT_MAX_LENGTH).required(),
    phone: yup
        .string()
        .trim()
        .matches(REGEX.PHONE_NUMBER, 'user.form.phoneNumber.invalid')
        .optional()
        .required(),
    numberPeople: yup
        .number()
        .integer()
        .min(0)
        .optional()
        .transform((val) => (isNaN(val) ? null : val))
        .max(INPUT_NUMBER_MAX_VALUE)
        .required(),
    arrivalTime: yup.string().matches(REGEX.YYYY_MM_DD_HYPHEN_HH_MM_COLON).required(),
});

export const LIMIT_ARRIVAL_TIME_BOOKING = 10800;
