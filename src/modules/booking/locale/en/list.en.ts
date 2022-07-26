export default {
    bookingTable: {
        header: {
            id: 'ID',
            nameCustomer: 'Name Customer',
            phone: 'Phone',
            arrivalTime: 'Arrival Time',
            numberPeople: 'Number People',
            table: 'Table',
            status: 'Status',
            actions: 'Actions',
        },
    },

    filterForm: {
        keyword: 'Keyword',
        status: 'Status',
        sort: {
            createdAt: 'Created at',
            startDate: 'Start date',
            status: 'Status',
        },
        startDate: 'Start date',
        endDate: 'End date',
        to: 'To',
        arrivalTimeRange: 'Start date',
    },

    status: {
        all: 'All',
        done: 'Done',
        canceled: 'Canceled',
        waiting: 'Waiting',
    },

    placeholder: {
        keyword: 'Enter keyword',
        status: 'Select status',
        startDate: 'Select the start date',
        endDate: 'Select the end date',
        nameCustomer: 'Name Customer',
        phone: 'Phone',
        arrivalTime: 'Arrival Time',
        numberPeople: 'Number People',
    },

    tooltip: {
        editStatus: 'Edit status',
        edit: 'Edit',
        delete: 'Delete',
    },

    message: {
        title: 'Notification',
        create: {
            success: 'Create booking successfully!',
        },

        update: {
            success: 'Update booking successfully!',
        },

        delete: {
            title: 'Notification',
            confirmAsk: 'Are you sure you want to delete this booking?',
            success: 'Delete booking successfully!',
        },
    },

    pageName: 'Booking management',
};
