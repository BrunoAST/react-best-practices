import { AccountModel } from "../../domain/models/account-model";
import { UpdateCurrentAccount } from "../../domain/usecases/update-current-account";

export class UpdateCurrentAccountMock implements UpdateCurrentAccount {
    accountModel: AccountModel;

    async save(accountModel: AccountModel): Promise<void> {
        this.accountModel = accountModel;
    }
}
