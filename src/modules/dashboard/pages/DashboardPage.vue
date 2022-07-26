<template>
    <div>
        <BaseListPageHeader
            :pageTitle="$t('common.app.menu.dashboard')"
            :isShowCreateButton="false"
            :isShowSearchButton="false"
            :hasSortBox="false"
        >
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="true" />
    </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import FilterForm from '../components/FilterForm.vue';

@Options({
    components: { FilterForm },
})
export default class DashboardPage extends Vue {
    totalItems = 0;
    pageNumber = 0;
    isToggleFilterForm = false;

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }
}
</script>

<style scoped lang="scss">
.filter-title {
    font-size: 12px;
    font-weight: bold;
    margin-bottom: 8px;
}
:deep(.cp-search) {
    display: none !important;
}
.cp-header {
    height: 73px !important;
}
:deep(.form-group) {
    margin-bottom: 0 !important;
}
:deep(label) {
    font-size: 13px;
    font-weight: normal !important;
}
</style>
