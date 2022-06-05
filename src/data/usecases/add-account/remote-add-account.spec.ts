import faker from "faker";
import { HttpPostClientSpy } from "../../test/mock-http";
import { RemoteAddAccount } from "./remote-add-account";
import { mockAddAccountParams, mockAddAccountModel } from "../../../domain/test/mock-add-account";
import { HttpStatusCode } from "../../protocols/http/http-response";
import { EmailInUseError } from "../../../domain/errors/email-in-use-error";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { AddAccount } from "domain/usecases/add-account";

type SutTypes = {
  sut: RemoteAddAccount;
  httpPostClientSpy: HttpPostClientSpy<AddAccount.Params, RemoteAddAccount.Model>;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AddAccount.Params, RemoteAddAccount.Model>();
  const sut = new RemoteAddAccount(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
}

describe(`RemoteAddAccount`, () => {
  it(`Should call HttpClientPostClient with correct URL`, async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = makeSut(url);
    await sut.add(mockAddAccountParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it(`Should call HttpClientPostClient with correct body`, async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const addAccountParams = mockAddAccountParams();
    await sut.add(addAccountParams);
    expect(httpPostClientSpy.body).toEqual(addAccountParams);
  });

  it(`Should throw EmailInUseError if httpClient returns 403`, async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = { statusCode: HttpStatusCode.forbidden };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  it(`Should throw UnexpectedError if httpClient returns 400`, async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it(`Should throw UnexpectedError if httpClient returns 500`, async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it(`Should throw UnexpectedError if httpClient returns 404`, async () => {
    const { sut, httpPostClientSpy } = makeSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    };
    const promise = sut.add(mockAddAccountParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it(`Should return an AddAccount.Model if HttpClientPostClient returns 200`, async () => {
    const { sut, httpPostClientSpy } = makeSut();
    const httpResult = mockAddAccountModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    };
    const account = await sut.add(mockAddAccountParams());
    await expect(account).toEqual(httpResult);
  });
});
