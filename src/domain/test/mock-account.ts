import faker from "faker";
import { AccountModel } from "../models/account-model";

export const mockAccountModel = (): AccountModel => ({
   accessToken: faker.datatype.uuid(),
   name: faker.name.firstName(),
});
