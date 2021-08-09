import {HttpPostClient, HttpPostParams} from 'data/protocols/http/http-post-client';
import {HttpResponse, HttpStatusCode} from "../protocols/http/http-response";

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
