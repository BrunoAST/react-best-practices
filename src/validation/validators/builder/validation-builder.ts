import {FieldValidation} from "../../protocols/field-validation";
import {RequiredFieldValidation} from "../required-field/required-field-validation";

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

    build(): FieldValidation[] {
        return this.validations;
    }
}
