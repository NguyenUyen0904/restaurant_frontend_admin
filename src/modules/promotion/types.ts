import { PromotionStatus } from './constants';
import { IQueryString } from '@/common/types';

export interface IPromotion {
    id: number;
    name: string;
    note: string;
    percent: number;
}

export interface IPromotionCreateBody {
    name: string | undefined;
    note: string | undefined;
    percent: number | undefined;
}

export interface IPromotionUpdateBody extends IPromotionCreateBody {
    id: number | undefined;
}

export interface IQueryStringPromotion extends IQueryString {
    keyword?: string | null;
    status?: PromotionStatus | null;
}

export type TModalType = 'Create' | 'Edit' | 'Close';

export interface ITextItem {
    name: string;
    number: number;
}
