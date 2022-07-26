import { INPUT_TEXT_MAX_LENGTH } from '@/common/constants';

export default {
    importMaterialDetailDialog: {
        titleCreate: 'Create Import material detail',
        titleUpdate: 'Update Import material detail',
        material: 'Material',
        pricePerUnit: 'Price / Unit',
        currentQuantity: 'Current quantity',
        quantity: 'Quantity',
        totalPrice: 'Total Price : ',
        note: 'Note',
        placeholder: {
            material: 'Select material',
            pricePerUnit: 'Enter Price / Unit',
            quantity: 'Enter quantity',
            note: 'Enter note',
        },
        button: {
            cancel: 'Cancel',
            submit: 'Submit',
        },
    },
    importMaterialDetailTable: {
        header: {
            id: 'ID',
            nameMaterial: 'Name material',
            pricePerUnit: 'Price/Unit',
            status: 'Status',
            quantity: 'Quantity',
            unit: 'Unit',
            note: 'Note',
            actions: 'Actions',
        },
        placeholder: {
            material: 'Select material',
            pricePerUnit: 'Enter Price / Unit',
            quantity: 'Enter quantity',
            note: 'Enter note',
        },
    },

    filterForm: {
        keyword: 'Keyword',
    },

    placeholder: {
        keyword: 'Enter keyword',
    },

    importMaterialDetailExcel: {
        title: 'Import File Excel',
        material: {
            label: 'Material',
            required: 'The material field is required',
            maxLength: `Material length must be less than or equal to ${INPUT_TEXT_MAX_LENGTH} characters`,
        },
        unit: {
            label: 'Unit',
            required: 'The unit field is required',
            maxLength: `Unit length must be less than or equal to ${INPUT_TEXT_MAX_LENGTH} characters`,
        },
        quantity: {
            label: 'Quantity',
            required: 'The quantity field is required',
            invalid: 'Quantity is invalid',
        },
        pricePerUnit: {
            label: 'Price/Unit',
            required: 'The Price/Unit field is required',
            invalid: 'Price/Unit is invalid',
        },
        note: {
            label: 'Note',
            maxLength: `Note length must be less than or equal to ${INPUT_TEXT_MAX_LENGTH} characters`,
        },
    },

    message: {
        title: 'Notification',
        create: {
            success: 'Create detail import material successfully!',
        },
        update: {
            success: 'Update detail import material successfully!',
        },
    },

    pageName: 'Import Material Detail',
};
