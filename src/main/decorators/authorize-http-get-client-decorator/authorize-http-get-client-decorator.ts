import { GetStorage } from "data/protocols/cache/get-storage";
import { HttpGetClient, HttpGetParams } from "data/protocols/http/http-get-client";
import { HttpResponse } from "data/protocols/http/http-response";

export class AuthorizeHttpGetClientDecorator implements HttpGetClient<any> {
  constructor(private readonly getStorage: GetStorage) { }

  public get(params: HttpGetParams): Promise<HttpResponse<any>> {
    this.getStorage.get("account");
    return null;
  }
}
