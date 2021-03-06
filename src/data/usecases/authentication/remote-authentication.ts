import {HttpPostClient} from 'data/protocols/http/http-post-client';
import {Authentication, AuthenticationParams} from "../../../domain/usecases/authentication";
import {InvalidCredentialsError} from "../../../domain/errors/invalid-credentials-error";
import {HttpStatusCode} from '../../protocols/http/http-response';
import {UnexpectedError} from "../../../domain/errors/unexpected-error";
import {AccountModel} from "../../../domain/models/account-model";

export class RemoteAuthentication implements Authentication {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpPostClient<AuthenticationParams, AccountModel>,
    ) {
    }

    async auth(params: AuthenticationParams): Promise<AccountModel> {
        const httpResponse = await this.httpClient.post({
            url: this.url,
            body: params,
        });
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                return httpResponse.body;
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError();
            default:
                throw new UnexpectedError();
        }
    }
}
