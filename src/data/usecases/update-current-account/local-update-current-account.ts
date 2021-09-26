import { UpdateCurrentAccount } from "../../../domain/usecases/update-current-account";
import { SetStorage } from "../../protocols/cache/set-storage";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { AccountModel } from "../../../domain/models/account-model";

export class LocalUpdateCurrentAccount implements UpdateCurrentAccount {
  constructor(private readonly setStorage: SetStorage) {
  }

  async save(accountModel: AccountModel): Promise<void> {
    if (!accountModel?.accessToken) {
      throw new UnexpectedError();
    }
    this.setStorage.set("account", JSON.stringify(accountModel));
  }
}
