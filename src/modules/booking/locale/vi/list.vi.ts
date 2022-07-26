export default {
    bookingTable: {
        header: {
            id: 'ID',
            nameCustomer: 'Tên khách hàng',
            phone: 'Số điện thoại',
            arrivalTime: 'Thời gian tới',
            numberPeople: 'Số người',
            table: 'Bàn',
            status: 'Trạng thái',
            actions: 'Thao tác',
        },
    },

    filterForm: {
        keyword: 'Từ khóa',
        status: 'Trạng thái',
        sort: {
            createdAt: 'Ngày tạo',
            startDate: 'Ngày bắt đầu',
            status: 'Trạng thái',
        },
        startDate: 'Thời gian bắt đầu',
        endDate: 'Thời gian kết thúc',
        to: 'Đến',
        arrivalTimeRange: 'Khoảng thời gian tới',
    },

    status: {
        all: 'Tất cả',
        done: 'Đã hoàn thành',
        canceled: 'Đã hủy',
        waiting: 'Đang đợi',
    },

    placeholder: {
        keyword: 'Nhập từ khóa',
        status: 'Chọn trạng thái',
        startDate: 'Thời gian bắt đầu',
        endDate: 'Thời gian kết thúc',
        nameCustomer: 'Nhập tên Khách hàng',
        phone: 'Nhập số điện thoại',
        arrivalTime: 'Thời gian tới',
        numberPeople: 'Số người',
    },

    tooltip: {
        editStatus: 'Thay đổi trạng thái',
        edit: 'Chỉnh sửa',
        delete: 'Xóa',
    },

    message: {
        title: 'Thông báo',
        create: {
            success: 'Tạo đơn đặt bàn thành công!',
        },

        update: {
            success: 'Cập nhật đơn đặt bàn thành công!',
        },

        delete: {
            title: 'Xóa đơn đặt bàn',
            confirmAsk: 'Bạn có chắc chắn muốn xóa đơn đặt bàn này không?',
            success: 'Xóa đơn đặt bàn thành công!',
        },
    },

    pageName: ' Quản lý đặt bàn',
};
