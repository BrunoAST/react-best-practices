import {ValidationComposite} from "../../../../validation/validators/validation-composite/validation-composite";
import {ValidationBuilder as Builder} from "../../../../validation/validators/builder/validation-builder";

export function makeLoginValidation(): ValidationComposite {
    return new ValidationComposite([
        ...Builder.field("email").required().email().build(),
        ...Builder.field("password").required().minLength(5).build(),
    ]);
}
