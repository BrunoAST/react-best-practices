import { AccountModel } from "../models/account-model";

export interface UpdateCurrentAccount {
    save(accountModel: AccountModel): Promise<void>;
}
