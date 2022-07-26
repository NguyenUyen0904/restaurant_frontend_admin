import { AcceptStatus } from './constants';
import { IQueryString } from '@/common/types';

export type TModalType = 'Create' | 'Edit' | 'Close';
export interface IWarehouseStaff {
    id: number;
    name: string;
}
// Material
export interface IMaterial {
    id: number;
    material: string;
    unit: string;
    quantity: number;
    updateAt: Date | string;
}

export interface IMaterialCreate {
    material: string | undefined;
    unit: string | undefined;
    quantity: number | undefined;
    updateAt: Date | string | undefined;
}

export interface IMaterialUpdate extends IMaterialCreate {
    id: number | undefined;
}

export interface IQueryStringMaterial extends IQueryString {
    keyword?: string;
}

// Supplier
export interface ISupplier {
    id: number;
    name: string;
    phone: string;
    address: string;
    updateAt: Date | string;
}

export interface ISupplierCreate {
    name: string | undefined;
    phone: string | undefined;
    address: string | undefined;
    updateAt: Date | string | undefined;
}

export interface ISupplierUpdate extends ISupplierCreate {
    id: number | undefined;
}

export interface IQueryStringSupplier extends IQueryString {
    keyword?: string;
}

// Inventory

export interface ICheckInventory {
    id: number;
    checkTime: string;
    warehouseStaff: IWarehouseStaff;
    status: string;
    note: string;
}

export interface ICheckInventoryUpdate {
    id: number | undefined;
    status: string | undefined;
}

export interface IQueryStringCheckInventory extends IQueryString {
    keyword?: string;
}

// Inventory Detail
export interface IInventoryDetail {
    id: number;
    nameMaterial: string;
    inventoryQuantity: number;
    inventoryUnit: string;
    damagedQuantity: number;
    damagedUnit: string;
    note: string;
}

export interface IQueryStringInventoryDetail extends IQueryString {
    keyword?: string;
    checkInventoryId?: number;
}
// import material
export interface IImportMaterial {
    id: number;
    supplierId: number;
    supplier: ISupplier;
    warehouseStaffId: number;
    warehouseStaff: IWarehouseStaff;
    totalPaymentImport: number;
    note: string;
    status: AcceptStatus;
}

export interface IImportMaterialCreate {
    supplierId: number | undefined;
    note: string | undefined;
    status?: AcceptStatus;
}

export interface IImportMaterialUpdate extends IImportMaterialCreate {
    id: number | undefined;
}

export interface IQueryStringImportMaterial extends IQueryString {
    keyword?: string;
}
export interface IImportMaterialDetail {
    id: number;
    materialId: number;
    material: IMaterial;
    pricePerUnit: number;
    quantity: number;
    note: string;
}

export interface IImportMaterialDetailCreate {
    materialId?: number | undefined;
    pricePerUnit?: number | undefined;
    quantity?: number | undefined;
    note?: string | undefined;
}

export interface IImportMaterialDetailUpdate extends IImportMaterialDetailCreate {
    id?: number | undefined;
}

export interface IQueryStringImportMaterialDetail extends IQueryString {
    keyword?: string;
    importMaterialId?: number;
}

export interface IImportMaterialDetailExcel {
    material: string;
    importMaterialId: string;
    unit: string;
    quantity: string;
    pricePerUnit: string;
    note: string;
    index?: number;
}

export interface IImportMaterialDetailExcels {
    importMaterialDetailExcels: IImportMaterialDetailExcel[];
}
export interface IExportMaterial {
    id: number;
    transporters: string;
    warehouseStaffId: number;
    warehouseStaff: IWarehouseStaff;
    totalPaymentExport: number;
    note: string;
    status: AcceptStatus;
}

export interface IExportMaterialCreate {
    transporters: string | undefined;
    note: string | undefined;
}

export interface IExportMaterialUpdate extends IExportMaterialCreate {
    id: number | undefined;
}

export interface IQueryStringExportMaterial extends IQueryString {
    keyword?: string;
}
export interface IExportMaterialDetail {
    id: number;
    materialId: number;
    material: IMaterial;
    pricePerUnit: number;
    quantity: number;
    note: string;
}

export interface IExportMaterialDetailCreate {
    materialId?: number | undefined;
    pricePerUnit?: number | undefined;
    quantity?: number | undefined;
    note?: string | undefined;
}

export interface IExportMaterialDetailUpdate extends IExportMaterialDetailCreate {
    id: number | undefined;
}

export interface IQueryStringExportMaterialDetail extends IQueryString {
    keyword?: string;
    exportMaterialId?: number;
}

// Convert Material

export interface ISelectMaterialOptions {
    label: string;
    value: string | number;
    quantity: number;
}
export interface IPerformer {
    id: number;
    name: string;
}
export interface IConvertHistory {
    id: number;
    convertTime: string;
    idMaterialFrom: number;
    materialFrom: IMaterial;
    quantityFrom: number;
    quantityBeforeConvertFrom: number;
    quantityBeforeConvertTo: number;
    idMaterialTo: number;
    materialTo: IMaterial;
    quantityTo: number;
    performer: IPerformer;
    note: string;
}

export interface IConvertMaterialCreate {
    convertTime: string | undefined;
    idMaterialFrom: number | undefined;
    quantityFrom: number | undefined;
    quantityBeforeConvertFrom: number | undefined;
    quantityBeforeConvertTo: number | undefined;
    idMaterialTo: number | undefined;
    quantityTo: number | undefined;
    performer: IPerformer | undefined;
    note: string;
}

export interface IQueryStringConvertHistory extends IQueryString {
    keyword?: string;
}
