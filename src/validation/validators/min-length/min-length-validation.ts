import {FieldValidation} from "../../protocols/field-validation";
import {MinLengthError} from "../../errors/min-length-error";

export class MinLengthValidation implements FieldValidation {
    constructor(readonly fieldName: string, private readonly minLength: number) {
    }

    validate(value: string = ""): Error {
        return value.length < this.minLength ? new MinLengthError(this.minLength) : null;
    }
}