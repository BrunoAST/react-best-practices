import {FieldValidation} from "../../protocols/field-validation";
import {RequiredFieldValidation} from "../required-field/required-field-validation";
import {EmailValidation} from "../email/email-validation";
import {MinLengthValidation} from "../min-length/min-length-validation";

export class ValidationBuilder {
    private constructor(
        private readonly fieldName: string,
        private readonly validations: FieldValidation[],
    ) {
    }

    //This is the only way to initialize the builder in our scenario, hence making its required
    static field(fieldName: string): ValidationBuilder {
        return new ValidationBuilder(fieldName, []);
    }

    required(): ValidationBuilder {
        this.validations.push(new RequiredFieldValidation(this.fieldName));
        return this;
    }

    email(): ValidationBuilder {
        this.validations.push(new EmailValidation(this.fieldName));
        return this;
    }

    minLength(minLength: number = 0): ValidationBuilder {
        this.validations.push(new MinLengthValidation(this.fieldName, minLength));
        return this;
    }

    build(): FieldValidation[] {
        return this.validations;
    }
}
