import { getModule, VuexModule, Mutation, Action, Module } from 'vuex-module-decorators';
import store from '@/store';
import { IPromotion, IPromotionUpdateBody, IQueryStringPromotion } from './types';
import {
    DEFAULT_FIRST_PAGE,
    LIMIT_PER_PAGE,
    DEFAULT_ORDER_DIRECTION,
} from '@/common/constants';
import { IBodyResponse, IGetListResponse, ISelectOptions } from '@/common/types';
import { DEFAULT_ORDER_BY } from '../user/constants';
import { appService } from '@/utils/app';
import { PermissionResources } from '../role/constants';
import { promotionService } from './services/api.service';

const initPromotionQueryString = {
    page: DEFAULT_FIRST_PAGE,
    limit: LIMIT_PER_PAGE,
    orderBy: DEFAULT_ORDER_BY,
    orderDirection: DEFAULT_ORDER_DIRECTION,
    keyword: null,
    status: null,
};

@Module({ dynamic: true, namespaced: true, store, name: 'promotion' })
class PromotionModule extends VuexModule {
    promotionList: Array<IPromotion> = [];

    totalPromotions = 0;

    selectedPromotion: IPromotionUpdateBody | null = null;

    isShowModalChosenTable = false;
    isShowModalTableDetail = false;
    idBookingSelected = -1;
    arrivalTimeSelected = -1;
    numberSeatSelected = 0;
    canChosenTable = false;

    promotionQueryString: IQueryStringPromotion = initPromotionQueryString;

    isShowPromotionFormPopUp = false;

    isDisabledSaveButton = false;
    promotionOptions: ISelectOptions[] = [];

    // GETTERS

    get userPermissionsPromotion(): string[] {
        return appService.getUserPermissionsByResource(PermissionResources.MENU_CATEGORY);
    }

    @Mutation
    MUTATE_CATEGORY_LIST(data: Array<IPromotion>) {
        this.promotionList = data;
    }

    @Mutation
    MUTATE_TOTAL_CATEGORY(totalPromotions: number) {
        this.totalPromotions = totalPromotions;
    }

    @Mutation
    MUTATE_SELECTED_CATEGORY(data: IPromotionUpdateBody | null) {
        this.selectedPromotion = data;
    }

    @Mutation
    MUTATE_CATEGORY_QUERY_STRING(query: IQueryStringPromotion) {
        this.promotionQueryString = {
            ...this.promotionQueryString,
            ...query,
        };
    }

    @Mutation
    MUTATE_IS_SHOW_CATEGORY_FORM_POP_UP(value: boolean) {
        this.isShowPromotionFormPopUp = value;
    }

    @Mutation
    MUTATE_IS_DISABLED_SAVE_BUTTON(value: boolean) {
        this.isDisabledSaveButton = value;
    }

    @Mutation
    MUTATE_CATEGORY_OPTIONS(promotionOptions: ISelectOptions[]) {
        this.promotionOptions = promotionOptions;
    }

    // ACTION

    @Action
    setPromotionSelected(data: IPromotionUpdateBody | null) {
        this.MUTATE_SELECTED_CATEGORY(data);
    }

    @Action
    clearPromotionQueryString() {
        this.MUTATE_CATEGORY_QUERY_STRING(initPromotionQueryString);
    }

    @Action
    setPromotionQueryString(query: IQueryStringPromotion) {
        this.MUTATE_CATEGORY_QUERY_STRING(query);
    }

    @Action
    setIsShowPromotionFormPopUp(value: boolean) {
        this.MUTATE_IS_SHOW_CATEGORY_FORM_POP_UP(value);
    }

    @Action
    setIsDisabledSaveButton(value: boolean) {
        this.MUTATE_IS_DISABLED_SAVE_BUTTON(value);
    }

    // API Table

    @Action
    async getPromotions() {
        const response = (await promotionService.getList({
            ...this.promotionQueryString,
        })) as IBodyResponse<IGetListResponse<IPromotion>>;
        if (response.success) {
            this.MUTATE_CATEGORY_LIST(response?.data?.items || []);
            this.MUTATE_TOTAL_CATEGORY(response?.data?.totalItems || 0);
        } else {
            this.MUTATE_CATEGORY_LIST([]);
            this.MUTATE_TOTAL_CATEGORY(0);
        }
        return response;
    }
}

export const promotionModule = getModule(PromotionModule);
