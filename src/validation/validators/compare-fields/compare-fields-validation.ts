import {FieldValidation} from "../../protocols/field-validation";
import {InvalidFieldError} from "../../errors/invalid-field-error";

export class CompareFieldsValidation implements FieldValidation {
    constructor(readonly fieldName: string, private readonly fieldToCompare: string) {
    }

    validate(input: object): Error {
        return input[this.fieldName] !== input[this.fieldToCompare] ? new InvalidFieldError() : null;
    }
}
