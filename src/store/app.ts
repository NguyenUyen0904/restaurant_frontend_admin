import { Action, Module, Mutation, VuexModule, getModule } from 'vuex-module-decorators';
import store from './index';
import { appService } from '@/utils/app';
import { SupportLanguage } from '@/common/constants';

@Module({ dynamic: true, namespaced: true, store, name: 'app' })
class AppModule extends VuexModule {
    isShowMobileSidebar = false;
    isShowNetworkError = false;
    selectedLanguage = appService.getLang();
    isGuestPage = false;

    @Action
    toggleMobileSidebar(): void {
        this.SET_IS_SHOW_MOBILE_SIDEBAR(!this.isShowMobileSidebar);
    }

    @Action
    setLanguage(lang: SupportLanguage): void {
        this.SET_LANGUAGE(lang);
    }

    @Action
    mutateIsGuestPage(value: boolean) {
        this.MUTATE_IS_GUEST_PAGE(value);
    }
    // GETTERS

    @Mutation
    MUTATE_IS_GUEST_PAGE(value: boolean) {
        this.isGuestPage = value;
    }

    @Mutation
    SET_IS_SHOW_MOBILE_SIDEBAR(value: boolean): void {
        this.isShowMobileSidebar = value;
    }

    @Mutation
    SET_SHOW_NETWORK_ERROR(value: boolean): void {
        this.isShowNetworkError = value;
    }

    @Mutation
    SET_LANGUAGE(lang: SupportLanguage): void {
        this.selectedLanguage = lang;
    }
}

export const appModule = getModule(AppModule);
