import {makeLoginValidation} from "./login-validation-factory";
import {ValidationComposite} from "../../../../validation/validators/validation-composite/validation-composite";
import {ValidationBuilder as Builder} from "../../../../validation/validators/builder/validation-builder";

describe("LoginValidationFactory", () => {
    it("Should make ValidationComposite with correct validations", () => {
        const composite = makeLoginValidation();
        expect(composite).toEqual(new ValidationComposite([
            ...Builder.field("email").required().email().build(),
            ...Builder.field("password").required().minLength(5).build(),
        ]));
    });
});
