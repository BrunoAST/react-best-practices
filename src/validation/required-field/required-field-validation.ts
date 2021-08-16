import {FieldValidation} from "../protocols/field-validation";
import {RequiredFieldError} from "../errors/required-field-error";

export class RequiredFieldValidation implements FieldValidation {
    constructor(readonly fieldName: string) {}

    validate(value: string): Error {
        return new RequiredFieldError();
    }
}
