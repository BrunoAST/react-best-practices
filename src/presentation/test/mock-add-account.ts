import {AddAccount, AddAccountParams} from "../../domain/usecases/add-account";
import {mockAccountModel} from "../../domain/test/mock-account";
import {AccountModel} from "../../domain/models/account-model";

export class AddAccountSpy implements AddAccount {
    account = mockAccountModel();
    params: AddAccountParams;
    callsCount = 0;

    async add(params: AddAccountParams): Promise<AccountModel> {
        this.params = params;
        this.callsCount++;
        return Promise.resolve(this.account);
    }
}
