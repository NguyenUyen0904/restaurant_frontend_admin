<template>
    <div class="convert-history-list">
        <BaseListPageHeader
            @toggle-filter-form="toggleFilterForm"
            :pageTitle="$t('store.convertHistory.pageName')"
            :hasSortBox="true"
            v-model:page="selectedPage"
            :totalItems="totalConvertHistories"
            :isShowCreateButton="false"
            @onPaginate="handlePaginate"
        >
            <template #sort-box-content>
                <Sort />
            </template>
        </BaseListPageHeader>
        <FilterForm :isToggleFilterForm="isToggleFilterForm" />
        <ConvertHistoryTable />
        <ConvertHistoryDetailFormPopup />
    </div>
</template>

<script lang="ts">
import { DEFAULT_FIRST_PAGE } from '@/common/constants';
import { ElLoading } from 'element-plus';
import { Options, Vue } from 'vue-class-component';
import { storeModule } from '../store';
import FilterForm from '../components/convertHistory/FilterForm.vue';
import ConvertHistoryTable from '../components/convertHistory/ConvertHistoryTable.vue';
import ConvertHistoryDetailFormPopup from '../components/convertHistory/ConvertHistoryDetailFormPopup.vue';

@Options({
    components: {
        ConvertHistoryDetailFormPopup,
        FilterForm,
        ConvertHistoryTable,
    },
})
export default class ConvertHistoryPage extends Vue {
    isToggleFilterForm = true;

    get totalConvertHistories(): number {
        return storeModule.totalConvertHistories;
    }

    get selectedPage(): number {
        return storeModule.queryStringConvertHistory?.page || DEFAULT_FIRST_PAGE;
    }

    set selectedPage(value: number) {
        storeModule.queryStringConvertHistory.page = value;
    }

    created(): void {
        storeModule.clearQueryStringConvertHistory();
        this.getConvertHistoryList();
    }

    async getConvertHistoryList(): Promise<void> {
        const loading = ElLoading.service({
            target: '.content',
        });
        await storeModule.getConvertHistories();
        loading.close();
    }

    async handlePaginate(): Promise<void> {
        storeModule.setQueryStringConvertHistory({ page: this.selectedPage });
        this.getConvertHistoryList();
    }

    toggleFilterForm(): void {
        this.isToggleFilterForm = !this.isToggleFilterForm;
    }
}
</script>

<style lang="scss" scoped>
.img-item {
    width: 75px;
    height: 75px;
    margin: 20px auto;
}

.list-note-diagram {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    .note-item {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 10px;
        .note-color {
            width: 30px;
            height: 30px;
            margin-right: 20px;
            border-radius: 5px;
        }

        .booked {
            background: #ebff78;
        }

        .used {
            background: #9eb3fa;
        }

        .not-enough {
            opacity: 0.2;
        }

        .selected {
            border: 1px solid #ff0000;
        }
    }
}

.list-table {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    border-top: 1px solid #bebebe;
    border-bottom: 1px solid #bebebe;
}
</style>
