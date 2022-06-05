import { AddAccount } from "../../../domain/usecases/add-account";
import { HttpPostClient } from "../../protocols/http/http-post-client";
import { EmailInUseError } from "../../../domain/errors/email-in-use-error";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";

export namespace RemoteAddAccount {
  export type Model = AddAccount.Model;
}

export class RemoteAddAccount implements AddAccount {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpPostClient<AddAccount.Params, RemoteAddAccount.Model>,
  ) { }

  async add(params: AddAccount.Params): Promise<AddAccount.Model> {
    const httpResponse = await this.httpClient.post({
      url: this.url,
      body: params,
    });
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok: return httpResponse.body;
      case HttpStatusCode.forbidden: throw new EmailInUseError();
      default: throw new UnexpectedError();
    }
  }
}
