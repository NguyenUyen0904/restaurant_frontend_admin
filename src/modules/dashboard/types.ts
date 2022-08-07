export interface IImportExportChart {
    day: number;
    month: number;
    importTotalPayment: number;
    exportTotalPayment: number;
}

export interface IDashboardData {
    importMaterialCount: number;
    importMaterialTotalPayment: number;
    exportMaterialCount: number;
    exportMaterialTotalRevenue: number;
}

export interface IUserTimeListQuery {
    dateRanges?: string[];
    dateRangeType: string;
}
