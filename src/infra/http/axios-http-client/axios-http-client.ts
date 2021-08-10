import {HttpPostClient, HttpPostParams} from "../../../data/protocols/http/http-post-client";
import {HttpResponse} from "../../../data/protocols/http/http-response";
import axios from "axios";

export class AxiosHttpClient implements HttpPostClient<any, any> {
    async post(params: HttpPostParams<unknown>): Promise<HttpResponse<any>> {
        const httpResponse = await axios.post(params.url, params.body);
        return {
            statusCode: httpResponse.status,
            body: httpResponse.data
        };
    }
}
