import { IImportResponse } from './types';

// parse error retrieved from api when import data
export function parseImportErrors(
    importErrors: Record<string, IImportResponse>,
): Record<string, Record<string, string>> {
    let errors = {};
    // parse error for each attribute
    Object.keys(importErrors).forEach((key) => {
        if (!importErrors[key].isValid) {
            let currentError = {};
            importErrors[key].errors.forEach((error) => {
                currentError = {
                    ...currentError,
                    [error.column]: error.errorMessage,
                };
            });
            errors = {
                ...errors,
                [key]: currentError,
            };
        }
    });
    return errors;
}
