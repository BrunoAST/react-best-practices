import {FieldValidation} from "../../protocols/field-validation";
import {InvalidFieldError} from "../../errors/invalid-field-error";

export class CompareFieldsValidation implements FieldValidation {
    constructor(readonly fieldName: string, private readonly valueToCompare: string) {
    }

    validate(value: string): Error {
        return new InvalidFieldError();
    }
}
