import faker from "faker";
import { HttpPostClient, HttpPostParams } from 'data/protocols/http/http-post-client';
import { HttpResponse, HttpStatusCode } from "../protocols/http/http-response";
import { HttpGetClient, HttpGetParams } from "data/protocols/http/http-get-client";

export const mockPostRequest = (): HttpPostParams<unknown> => ({
  url: faker.internet.url(),
  body: faker.random.objectElement()
});

export const mockGetRequest = (): HttpGetParams => ({
  url: faker.internet.url(),
  headers: faker.random.objectElement()
});

export class HttpPostClientSpy<BodyType, ResponseType> implements HttpPostClient<BodyType, ResponseType> {
  public url?: string;
  public body?: BodyType;
  public response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  };

  public post(params: HttpPostParams<BodyType>): Promise<HttpResponse<ResponseType>> {
    this.url = params.url;
    this.body = params.body;
    return Promise.resolve(this.response);
  }
}

export class HttpGetClientSpy<ResponseType> implements HttpGetClient<ResponseType> {
  public url: string;
  public response: HttpResponse<ResponseType> = {
    statusCode: HttpStatusCode.ok
  };
  public headers?: any;

  public async get(params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
    this.url = params.url;
    this.headers = params.headers;
    return Promise.resolve(this.response);
  }
}
