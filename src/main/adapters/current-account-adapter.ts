import { AccountModel } from "../../domain/models/account-model";
import { makeLocalStorageAdapter } from "../factories/cache/local-storage-adapter-factory";

export const setCurrentAccountAdapter = (accountModel: AccountModel): void => {
  makeLocalStorageAdapter().set("account", accountModel);
}

export const getCurrentAccountAdapter = (): AccountModel => {
  return makeLocalStorageAdapter().get("account");
}
