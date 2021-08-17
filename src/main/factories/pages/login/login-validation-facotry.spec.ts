import {makeLoginValidation} from "./login-validation-factory";
import {ValidationComposite} from "../../../../validation/validators/validation-composite/validation-composite";
import {ValidationBuilder} from "../../../../validation/validators/builder/validation-builder";

describe("LoginValidationFactory", () => {
   it("Should make ValidationComposite with correct validations", () => {
      const composite = makeLoginValidation();
      expect(composite).toEqual(new ValidationComposite([
          ...ValidationBuilder.field("email").required().email().build(),
         ...ValidationBuilder.field("password").required().minLength(5).build(),
      ]));
   });
});
