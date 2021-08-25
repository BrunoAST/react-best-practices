import {ValidationComposite} from "../../../../validation/validators/validation-composite/validation-composite";
import {ValidationBuilder as Builder} from "../../../../validation/validators/builder/validation-builder";
import {makeSignUpValidation} from "./signup-validation-factory";

describe("SignupValidationFactory", () => {
    it("Should make ValidationComposite with correct validations", () => {
        const composite = makeSignUpValidation();
        expect(composite).toEqual(new ValidationComposite([
            ...Builder.field("name").required().minLength(5).build(),
            ...Builder.field("email").required().email().build(),
            ...Builder.field("password").required().minLength(5).build(),
            ...Builder.field("passwordConfirmation").required().minLength(5)
                .sameAs("password").build(),
        ]));
    });
});
