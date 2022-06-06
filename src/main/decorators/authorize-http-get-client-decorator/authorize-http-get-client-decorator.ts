import { GetStorage } from "data/protocols/cache/get-storage";
import { HttpGetClient, HttpGetParams } from "data/protocols/http/http-get-client";
import { HttpResponse } from "data/protocols/http/http-response";

/**
 * This class is a decorator for HttpGetClient interface.
 * It will add a token to the request before calling the API.
 * That way, the client will be able to access the resource, and the logic to apply the token
 * will be self contained.
 */
export class AuthorizeHttpGetClientDecorator implements HttpGetClient<any> {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient<any>
  ) { }

  public async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    const account = this.getStorage.get("account");
    if (account?.accessToken) {
      Object.assign(params, {
        headers: Object.assign(params.headers || {}, { "x-access-token": account.accessToken })
      });
    }
    return await this.httpGetClient.get(params);
  }
}
