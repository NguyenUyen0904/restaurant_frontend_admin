import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';

class PromotionService extends BaseService {}
export const promotionService = new PromotionService({ baseUrl: 'promotion' }, service);
