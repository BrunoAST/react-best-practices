import axios, { AxiosResponse } from "axios";
import { HttpGetClient, HttpGetParams } from "data/protocols/http/http-get-client";
import { HttpPostClient, HttpPostParams } from "../../../data/protocols/http/http-post-client";
import { HttpResponse } from "../../../data/protocols/http/http-response";

export class AxiosHttpClient implements HttpPostClient<any, any>, HttpGetClient<any> {
  async post(params: HttpPostParams<unknown>): Promise<HttpResponse<any>> {
    let httpResponse: HttpResponse<any>;
    await axios.post(params.url, params.body)
      .then((response: AxiosResponse) => httpResponse = this.adapt(response))
      .catch((error) => httpResponse = { statusCode: error.response.status, body: error.response.data });
    return httpResponse;
  }

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    let httpResponse: HttpResponse<any>;
    await axios.get(params.url)
      .then((response: AxiosResponse) => httpResponse = this.adapt(response))
      .catch((error) => httpResponse = { statusCode: error.response.status, body: error.response.data });
    return httpResponse;
  }

  private adapt(axiosResponse: AxiosResponse): HttpResponse<any> {
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data
    };
  }
}
