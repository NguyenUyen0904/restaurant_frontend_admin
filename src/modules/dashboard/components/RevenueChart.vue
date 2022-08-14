<template>
    <div class="row support-request-category-chart">
        <div class="col-4">
            <BaseSingleSelect
                v-model:value="filterForm.dateRangeType"
                :options="dateRangeTypeOptions"
                :clearable="false"
                :label="
                    $t(
                        'dashboard.dashboard.StatisticalChart.filterForm.importExport.dateRangeType.label',
                    )
                "
                :placeholder="
                    $t(
                        'dashboard.dashboard.StatisticalChart.filterForm.importExport.dateRangeType.placeholder',
                    )
                "
            />
            <BaseDatePicker
                v-model:value="filterForm.dateRange"
                :type="
                    filterForm.dateRangeType === dateRangeTypes.MONTH ? 'year' : 'month'
                "
                :dateFormat="
                    filterForm.dateRangeType === dateRangeTypes.MONTH
                        ? DATE_TIME_FORMAT.YYYY
                        : DATE_TIME_FORMAT.YYYY_MM_HYPHEN
                "
                :clearable="false"
                :label="
                    $t(
                        'dashboard.dashboard.StatisticalChart.filterForm.importExport.dateRange.label',
                    )
                "
                :placeholder="
                    $t(
                        'dashboard.dashboard.StatisticalChart.filterForm.importExport.dateRange.placeholder',
                    )
                "
            />
            <div class="d-flex justify-content-center">
                <el-button type="danger" size="mini" @click="resetFilter">
                    {{ $t('common.app.filterForm.reset') }}
                </el-button>
                <el-button size="mini" type="primary" @click="handleFilter">
                    {{ $t('common.app.filterForm.search') }}
                </el-button>
            </div>
        </div>
        <div class="col-8">
            <canvas ref="statChart"></canvas>
        </div>
    </div>
</template>
<script lang="ts">
import { Chart, ChartItem, registerables } from 'chart.js';
import { mixins } from 'vue-class-component';
import { IImportExportChart } from '../types';
import { dashboardService } from '../services/api.services';

import { DateRangeTypeOptions, DateRangeTypes, DAY_PER_MONTH, Months } from '../constant';
import { DATE_TIME_FORMAT } from '@/common/constants';
import { DashboardMixins } from '../mixin';
import moment from 'moment';
import { ISelectOptions } from '@/common/types';
import { ElLoading } from 'element-plus';
import { parseLanguageSelectOptions } from '@/utils/helper';
import { throttle } from 'lodash';

Chart.register(...registerables);

export default class RevenueChart extends mixins(DashboardMixins) {
    filterForm: Record<string, string> = {
        dateRangeType: DateRangeTypes.MONTH,
        dateRange: moment().format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_SS_COLON),
    };

    chart: Chart | null = null;
    supportRequestCategoryCount: IImportExportChart[] = [];
    throttled = throttle(this.createChart, 2000, { trailing: false });

    get dateRangeTypeOptions(): ISelectOptions[] {
        return parseLanguageSelectOptions(DateRangeTypeOptions);
    }

    get datasets() {
        const importTotalPayment: number[] = [];
        const exportTotalPayment: number[] = [];
        if (this.filterForm.dateRangeType === DateRangeTypes.MONTH) {
            Months.forEach((month) => {
                const userTime = this.supportRequestCategoryCount.find(
                    (userTimeByModule) => {
                        return userTimeByModule.month === month.value;
                    },
                );
                if (userTime) {
                    importTotalPayment.push(userTime.importTotalPayment);
                    exportTotalPayment.push(userTime.exportTotalPayment);
                } else {
                    importTotalPayment.push(0);
                }
            });
        } else {
            [...Array(DAY_PER_MONTH).keys()].forEach((day) => {
                const userTime = this.supportRequestCategoryCount.find(
                    (userTimeByModule) => userTimeByModule.day === day,
                );
                if (userTime) {
                    importTotalPayment.push(userTime.importTotalPayment);
                    exportTotalPayment.push(userTime.exportTotalPayment);
                } else {
                    exportTotalPayment.push(0);
                }
            });
        }
        return [
            {
                label: this.$t(
                    'dashboard.dashboard.StatisticalChart.chart.importExport.import',
                ),
                data: importTotalPayment,
                borderColor: '#67C23A',
                backgroundColor: '#95d475',
            },
            {
                label: this.$t(
                    'dashboard.dashboard.StatisticalChart.chart.importExport.export',
                ),
                data: exportTotalPayment,
                borderColor: ' #337ecc',
                backgroundColor: ` #79bbff`,
            },
        ];
    }

    async createChart() {
        const loading = ElLoading.service({
            target: '.support-request-category-chart',
        });
        await this.getSupportRequestCategoryCount();
        if (this.chart) {
            (this.chart as Chart).destroy();
        }
        this.chart = new Chart(this.$refs.statChart as ChartItem, {
            type: 'line',
            data: {
                labels:
                    this.filterForm.dateRangeType === DateRangeTypes.MONTH
                        ? Months.map((month) => this.$t(month.label))
                        : [...Array(DAY_PER_MONTH).keys()].map((day) => day.toString()),
                datasets: this.datasets,
            },
            options: {
                scales: {
                    y: {
                        stacked: true,
                    },
                },
                plugins: {
                    filler: {
                        propagate: false,
                    },
                    title: {
                        display: true,
                        text: this.$t(
                            'dashboard.dashboard.StatisticalChart.chart.importExport.label',
                        ),
                    },
                },
                interaction: {
                    intersect: false,
                },
            },
        });
        loading.close();
    }

    async getSupportRequestCategoryCount() {
        const dateRanges = [];
        if (this.filterForm.dateRange?.length) {
            if (this.filterForm.dateRangeType === DateRangeTypes.MONTH) {
                dateRanges.push(
                    moment(this.filterForm.dateRange)
                        .startOf('year')
                        .format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_SS_COLON),
                );
                dateRanges.push(
                    moment(this.filterForm.dateRange)
                        .endOf('year')
                        .format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_SS_COLON),
                );
            } else {
                dateRanges.push(
                    moment(this.filterForm.dateRange)
                        .startOf('month')
                        .format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_SS_COLON),
                );
                dateRanges.push(
                    moment(this.filterForm.dateRange)
                        .endOf('month')
                        .format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_SS_COLON),
                );
            }
        }
        const response = await dashboardService.getRevenueChartData({
            dateRangeType: this.filterForm.dateRangeType || DateRangeTypes.MONTH,
            dateRanges,
        });
        if (response.success) {
            this.supportRequestCategoryCount = response.data.items;
        } else {
            this.supportRequestCategoryCount = [];
        }
    }

    async created() {
        await this.createChart();
    }

    async handleFilter(): Promise<void> {
        await this.throttled();
    }

    async resetFilter(): Promise<void> {
        this.filterForm = {
            dateRangeType: DateRangeTypes.MONTH,
            dateRange: moment().format(DATE_TIME_FORMAT.YYYY_MM_DD_HYPHEN_HH_MM_SS_COLON),
        };
        await this.throttled();
    }
}
</script>
