import { AxiosHttpClient } from "../../../infra/http/axios-http-client/axios-http-client";

export function makeAxiosHttpClient(): AxiosHttpClient {
  return new AxiosHttpClient();
}
