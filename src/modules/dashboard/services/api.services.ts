import { BaseService } from './../../../utils/api';
import { IImportExportChart, IUserTimeListQuery, IDashboardData } from './../types';
import service from '@/plugins/axios';
import { IBodyResponse, IGetListResponse } from '@/common/types';

class DashboardService extends BaseService {
    getRevenueChartData(query: IUserTimeListQuery) {
        return this.client.get<void, IBodyResponse<IGetListResponse<IImportExportChart>>>(
            this.baseUrl + '/import-export-material',
            { params: query },
        );
    }

    getDashboardData(query: IUserTimeListQuery) {
        return this.client.get<void, IBodyResponse<IDashboardData>>(
            this.baseUrl + '/data',
            { params: query },
        );
    }
}

export const dashboardService = new DashboardService({ baseUrl: '/dashboard' }, service);
