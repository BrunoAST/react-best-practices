import { HttpPostClient } from 'data/protocols/http/http-post-client';
import { Authentication } from "../../../domain/usecases/authentication";
import { InvalidCredentialsError } from "../../../domain/errors/invalid-credentials-error";
import { HttpStatusCode } from '../../protocols/http/http-response';
import { UnexpectedError } from "../../../domain/errors/unexpected-error";

export namespace RemoteAuthentication {
  export type Model = Authentication.Model;
}

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<Authentication.Params, RemoteAuthentication.Model>,
  ) {
  }

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
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
