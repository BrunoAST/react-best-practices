import { HttpResponse } from "./http-response";

export type HttpGetParams = {
    url: string;
}

export interface HttpGetClient<ResponseType> {
    get(params: HttpGetParams): Promise<HttpResponse<ResponseType>>;
}
