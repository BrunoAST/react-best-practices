import { AccountModel } from "domain/models/account-model";

export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
  }

  export type Model = AccountModel;
}

export interface Authentication {
  auth(params: Authentication.Params): Promise<Authentication.Model>;
}
