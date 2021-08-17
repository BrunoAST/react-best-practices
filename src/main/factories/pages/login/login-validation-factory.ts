import {ValidationComposite} from "../../../../validation/validators/validation-composite/validation-composite";
import {ValidationBuilder} from "../../../../validation/validators/builder/validation-builder";

export function makeLoginValidation(): ValidationComposite {
    return new ValidationComposite([
        ...ValidationBuilder.field("email").required().email().build(),
        ...ValidationBuilder.field("password").required().minLength(5).build()
    ]);
}
