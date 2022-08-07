export default {
    pageName: 'Thống kê',

    statisticalData: {
        importMaterialCount: 'Đơn nhập kho trong tháng',
        importMaterialTotalPayment: 'Chi phí nhập kho trong tháng',
        exportMaterialCount: 'Đơn xuất kho trong tháng',
        exportMaterialTotalRevenue: 'Doanh thu xuất kho trong tháng',
        materialRunningOut: 'Số lượng nguyên liệu sắp hết',
    },

    StatisticalChart: {
        dateRangeType: {
            day: 'Ngày',
            month: 'Tháng',
        },

        filterForm: {
            importExport: {
                dateRangeType: {
                    label: 'Thống kê theo',
                    placeholder: 'Chọn kiểu thống kê',
                },
                dateRange: {
                    label: 'Thời gian',
                    placeholder: 'Chọn thời gian',
                },
            },
        },
        chart: {
            importExport: {
                label: 'Thống kê xuất nhập kho',
                import: 'Nhập kho',
                export: 'Xuất kho',
            },
        },
    },
};
