import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';

class BookingService extends BaseService {}
export const bookingService = new BookingService({ baseUrl: 'booking' }, service);
