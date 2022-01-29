import { AccountModel } from "../../domain/models/account-model";
import { UnexpectedError } from "../../domain/errors/unexpected-error";
import { makeLocalStorageAdapter } from "../factories/cache/local-storage-adapter-factory";

export const setCurrentAccountAdapter = (accountModel: AccountModel): void => {
  if (!accountModel?.accessToken) {
    throw new UnexpectedError();
  }
  makeLocalStorageAdapter().set("account", accountModel);
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get("account");
}
