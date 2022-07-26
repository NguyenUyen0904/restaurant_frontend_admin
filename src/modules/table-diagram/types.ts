import { IQueryString } from '@/common/types';
export interface ITable {
    id: number;
    name: string;
    status: string;
    numberSeat: number;
    idRestaurant: number;
}

export interface ITableCreateTable {
    name: string;
    numberSeat: number;
}

export interface IGetTables {
    tables: Array<ITable>;
    totalProduct: number;
}

export interface IPatchQueryTable {
    status: string;
    nameCustomer?: string;
    phone?: string;
    arrivalTime?: string;
}
export interface IQueryStringTable extends IQueryString {
    keyword?: string | null;
}
