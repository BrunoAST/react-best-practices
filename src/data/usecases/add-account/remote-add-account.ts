import {AddAccount, AddAccountParams} from "../../../domain/usecases/add-account";
import {AccountModel} from "../../../domain/models/account-model";
import {HttpPostClient} from "../../protocols/http/http-post-client";

export class RemoteAddAccount implements AddAccount {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpPostClient<AddAccountParams, AccountModel>,
    ) {
    }

    async add(params: AddAccountParams): Promise<AccountModel> {
        await this.httpClient.post({
            url: this.url,
            body: params,
        });
        return null;
    }
}
