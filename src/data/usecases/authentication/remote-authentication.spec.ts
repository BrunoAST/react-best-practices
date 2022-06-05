import faker from "faker";
import { RemoteAuthentication } from "./remote-authentication";
import { mockAuthenticationParams, mockAuthenticationModel } from "../../../domain/test/mock-authentication";
import { InvalidCredentialsError } from "../../../domain/errors/invalid-credentials-error";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { HttpPostClientSpy } from "../../test/mock-http";
import { Authentication } from "../../../domain/usecases/authentication";

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<Authentication.Params, RemoteAuthentication.Model>;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<Authentication.Params, RemoteAuthentication.Model>();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy
  };
}

describe(`RemoteAuthentication`, () => {
  it(`Should call HttpClientPostClient with correct URL`, async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.auth(mockAuthenticationParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it(`Should call HttpClientPostClient with correct body`, async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const authenticationParams = mockAuthenticationParams();
    await sut.auth(authenticationParams);
    expect(httpPostClientSpy.body).toEqual(authenticationParams);
  });

  it(`Should throw InvalidCredentialsError if httpClient returns 401`, async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  });

  it(`Should throw UnexpectedError if httpClient returns 400`, async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it(`Should throw UnexpectedError if httpClient returns 500`, async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it(`Should throw UnexpectedError if httpClient returns 404`, async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it(`Should return an Authentication.Model if HttpClientPostClient return 200`, async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = mockAuthenticationModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    };
    const account = await sut.auth(mockAuthenticationParams());
    await expect(account).toEqual(httpResult);
  });
});
