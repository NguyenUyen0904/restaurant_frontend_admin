import { ModuleName } from '@/common/constants';

export default {
    pageName: {
        listPage: ' Quản lý vai trò',
        roleList: 'Danh sách các vai trò',
        roleInfo: 'Thông tin vai trò',
    },
    table: {
        name: 'Tên',
        actions: 'Hành động',
        tooltip: {
            edit: 'Chỉnh sửa',
            delete: 'Xóa',
        },
    },
    filterForm: {
        title: 'Tìm kiếm theo:',
        keyword: {
            label: 'Từ khóa',
            placeholder: 'Nhập từ khóa',
        },
        search: 'Tìm kiếm',
    },
    sort: {
        label: 'SẮP XẾP THEO',
        placeholder: 'Chọn trường',
        name: 'Tên',
        createdAt: 'Ngày tạo',
    },
    confirmDelete: {
        deleteConfirmText: 'Bạn có chắc chắn muốn xóa vai trò này không?',
        deleteConfirmTitle: 'Xóa Vai Trò',
        success: {
            title: 'Thành công',
            message: 'Xóa vai trò thành công!',
        },
        error: {
            title: 'Lỗi',
            message: 'Xóa không thành công!',
        },
    },
    form: {
        name: {
            label: 'Tên quyền',
            placeholder: 'Nhập tên vai trò',
        },
        permission: {
            label: 'Danh sách quyền',
        },
        saveButton: 'Xác nhận',
        backButton: 'Quay lại',
    },
    button: {
        create: 'Tạo',
    },
    editPage: {
        notification: {
            updateSuccess: {
                title: 'Thành công',
                message: 'Cập nhật vai trò thành công',
            },
        },
    },
    createPage: {
        title: 'Tạo mới vai trò',
        btnCancel: 'Hủy',
        btnSave: 'Xác nhận',
        inputLabelName: 'Tên vai trò',
        checkBoxLabelName: 'Người dùng có quyền đăng nhập',
        errorMessage: {
            inputEmpty: 'Trường này không được để trống',
        },
        placeholder: {
            name: 'Nhập tên vai trò',
            description: 'Nhập mô tả',
        },
        notification: {
            createSuccess: {
                title: 'Thành công',
                message: 'Tạo mới vai trò thành công!',
            },
            createFail: {
                title: 'Thất bại',
                message: 'Tạo mới vai trò không thành công!',
            },
        },
    },
    common: {
        headerTable: {
            name: 'Tên module',
            all: 'Tất cả',
            create: 'Thêm',
            createPersonal: 'Thêm dữ liệu cá nhân',
            read: 'Đọc',
            readPersonal: 'Đọc dữ liệu cá nhân',
            update: 'Cập nhật',
            updatePersonal: 'Cập nhật dữ liệu cá nhân',
            delete: 'Xóa',
            deletePersonal: 'Xóa dữ liệu cá nhân',
            updateStatus: 'Cập nhật trạng thái',
            updateRole: 'Cập nhật quyền',
            convertMaterial: 'Chuyển đổi nguyên liệu',
            approve: 'Phê duyệt',
            login: 'Người dùng có thể đăng nhập',
            action: 'Hành động',
            allow: 'Được phép',
            upload: 'Tải lên',
            reject: 'Từ chối',
            editEmail: 'Sửa email',
            sendEmail: 'Gửi email',
            createPast: 'Tạo yêu cầu trong quá khứ',
            module: {
                [ModuleName.DASHBOARD]: 'Trang chủ',
                [ModuleName.USER]: 'Người dùng',
                [ModuleName.TABLE_DIAGRAM]: 'Sơ đồ bàn',
                [ModuleName.BOOKING]: 'Đặt bàn',
                [ModuleName.MENU_FOOD]: 'Món ăn',
                [ModuleName.MENU_CATEGORY]: 'Danh mục món ăn',
                [ModuleName.STORE_MATERIAL]: 'Nguyên liệu',
                [ModuleName.STORE_CONVERT]: 'Chuyển đổi nguyên liệu',
                [ModuleName.STORE_SUPPLIER]: 'Nhà cung cấp',
                [ModuleName.STORE_IMPORT_MATERIAL]: 'Nhập kho',
                [ModuleName.STORE_IMPORT_MATERIAL_DETAIL]: 'Chi tiết nhập kho',
                [ModuleName.STORE_EXPORT]: 'Xuất kho',
                [ModuleName.STORE_EXPORT_MATERIAL_DETAIL]: 'Chi tiết xuất kho',
                [ModuleName.STORE_CHECK_INVENTORY]: 'Kiểm tra hàng tồn',
                [ModuleName.STORE_INVENTORY_DETAIL]: 'Chi tiết hàng tốn kho',
                [ModuleName.BILLING]: 'Hóa đơn',
                [ModuleName.CLOSING_REVENUE]: 'Chốt doanh thu',
                [ModuleName.ROLE]: 'Vai trò',
            },
        },
        error: {
            noPermission: 'Vai trò cần ít nhất một quyền',
        },
    },
};
