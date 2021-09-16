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
});

export class HttpPostClientSpy<BodyType, ResponseType> implements HttpPostClient<BodyType, ResponseType> {
    url?: string;
    body?: BodyType;
    response: HttpResponse<ResponseType> = {
        statusCode: HttpStatusCode.ok
    };

    post(params: HttpPostParams<BodyType>): Promise<HttpResponse<ResponseType>> {
        this.url = params.url;
        this.body = params.body;
        return Promise.resolve(this.response);
    }
}

export class HttpGetClientSpy<ResponseType> implements HttpGetClient<ResponseType> {
    url: string;
    response: HttpResponse<ResponseType> = {
        statusCode: HttpStatusCode.ok
    };

    async get(params: HttpGetParams): Promise<HttpResponse<ResponseType>> {
        this.url = params.url;
        return Promise.resolve(this.response);
    }
}
