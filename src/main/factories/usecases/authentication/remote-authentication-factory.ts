import { Authentication } from "../../../../domain/usecases/authentication";
import { RemoteAuthentication } from "../../../../data/usecases/authentication/remote-authentication";
import { makeAxiosHttpClient } from "../../http/axios-http-client-factory";
import { makeApiUrl } from "../../http/api-url-factory";

export function makeRemoteAuthentication(): Authentication {
  return new RemoteAuthentication(makeApiUrl("/login"), makeAxiosHttpClient());
}
