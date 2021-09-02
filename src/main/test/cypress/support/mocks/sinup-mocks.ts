import * as Helper from "./http-mocks";

export const mockEmailInUse = (): void => Helper.mockEmailInUse(/signup/);
export const mockUnexpectedError = (): void => Helper.mockUnexpectedError(/signup/, "POST");
