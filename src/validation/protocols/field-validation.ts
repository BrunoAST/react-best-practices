export interface FieldValidation {
    fieldName: string;
    validate(value: string): Error;
}
