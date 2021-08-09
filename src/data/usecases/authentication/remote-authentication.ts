import {HttpPostClient} from 'data/protocols/http/http-post-client';
import {AuthenticationParams} from "../../../domain/usecases/authentication";
import {InvalidCredentialsError} from "../../../domain/errors/invalid-credentials-error";
import {HttpStatusCode} from '../../protocols/http/http-response';
import {UnexpectedError} from "../../../domain/errors/unexpected-error";

export class RemoteAuthentication {
    constructor(
        private readonly url: string,
        private readonly httpClient: HttpPostClient
    ) {
    }

    async auth(params: AuthenticationParams): Promise<void> {
        const httpResponse = await this.httpClient.post({
            url: this.url,
            body: params
        });
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok:
                break;
            case HttpStatusCode.unauthorized:
                throw new InvalidCredentialsError();
            default:
                throw new UnexpectedError();
        }
    }
}
