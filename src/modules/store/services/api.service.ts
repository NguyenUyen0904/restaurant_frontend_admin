import { IBodyResponse, IBulkImportResponse } from '@/common/types';
import service from '@/plugins/axios';
import { BaseService } from '@/utils/api';
import { IImportMaterialDetailExcels } from '../types';

class MaterialService extends BaseService {}
export const materialService = new MaterialService({ baseUrl: 'material' }, service);

class ConvertMaterialService extends BaseService {}
export const convertMaterialService = new ConvertMaterialService(
    { baseUrl: 'convert-material' },
    service,
);

class SupplierService extends BaseService {}
export const supplierService = new SupplierService({ baseUrl: 'supplier' }, service);

class CheckInventoryService extends BaseService {}
export const checkInventoryService = new CheckInventoryService(
    { baseUrl: 'check-inventory' },
    service,
);

class CheckInventoryDetailService extends BaseService {}
export const checkInventoryDetailService = new CheckInventoryDetailService(
    { baseUrl: 'check-inventory-detail' },
    service,
);

class ImportMaterialService extends BaseService {}
export const importMaterialService = new ImportMaterialService(
    { baseUrl: 'import-material' },
    service,
);

class ImportMaterialDetailService extends BaseService {
    importMaterialDetailExcels(
        data: IImportMaterialDetailExcels,
    ): Promise<IBodyResponse<IBulkImportResponse>> {
        return this.client.post(`${this.detailUrl}/bulk-create`, data);
    }
}
export const importMaterialDetailService = new ImportMaterialDetailService(
    { baseUrl: 'import-material-order' },
    service,
);

class ExportMaterialService extends BaseService {}
export const exportMaterialService = new ExportMaterialService(
    { baseUrl: 'export-material' },
    service,
);

class ExportMaterialDetailService extends BaseService {}
export const exportMaterialDetailService = new ExportMaterialDetailService(
    { baseUrl: 'export-material-order' },
    service,
);

class ConvertHistoryService extends BaseService {}
export const convertHistoryService = new ConvertHistoryService(
    { baseUrl: 'convert-material' },
    service,
);
