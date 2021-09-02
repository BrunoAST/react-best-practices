import * as Helper from "./http-mocks";
import faker from "faker";

export const mockEmailInUse = (): void => Helper.mockEmailInUse(/signup/);
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/signup/, "POST");
export const mockInvalidData = (): void => Helper.mockOk(/signup/, "POST", {
    invalid: faker.datatype.uuid()
});

