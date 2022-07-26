import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';

class TableService extends BaseService {}
export const tableService = new TableService({ baseUrl: '/table' }, service);
