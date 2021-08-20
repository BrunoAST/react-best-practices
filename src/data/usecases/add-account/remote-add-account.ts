import {AddAccount, AddAccountParams} from "../../../domain/usecases/add-account";
import {AccountModel} from "../../../domain/models/account-model";
import {HttpPostClient} from "../../protocols/http/http-post-client";
import {EmailInUseError} from "../../../domain/errors/email-in-use-error";
import {HttpStatusCode} from "../../protocols/http/http-response";

export class RemoteAddAccount implements AddAccount {
    constructor(
        private readonly  url: string,
        private readonly httpClient: HttpPostClient<AddAccountParams, AccountModel>,
    ) {
    }

    async add(params: AddAccountParams): Promise<AccountModel> {
        const httpResponse = await this.httpClient.post({
            url: this.url,
            body: params,
        });
        switch (httpResponse.statusCode) {
            case HttpStatusCode.forbidden: throw new EmailInUseError();
            default: return null;
        }
    }
}
