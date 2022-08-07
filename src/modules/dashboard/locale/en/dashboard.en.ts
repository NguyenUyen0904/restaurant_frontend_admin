export default {
    pageName: 'Dashboard',

    statisticalData: {
        importMaterialCount: 'Import Count in the month',
        importMaterialTotalPayment: 'Total payment Import material in the month',
        exportMaterialCount: 'Export Count in the month',
        exportMaterialTotalRevenue: 'Revenue Export material in the month',
        materialRunningOut: 'Materials are running out',
    },

    StatisticalChart: {
        dateRangeType: {
            day: 'Day',
            month: 'Month',
        },

        filterForm: {
            importExport: {
                dateRangeType: {
                    label: 'View by',
                    placeholder: 'Select View by',
                },
                dateRange: {
                    label: 'Time',
                    placeholder: 'Select Time',
                },
            },
        },
        chart: {
            importExport: {
                label: 'Import Export statistics',
                import: 'Import material',
                export: 'Export material',
            },
        },
    },
};
