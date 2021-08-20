import faker from "faker";
import {HttpPostClientSpy} from "../../test/mock-http";
import {AccountModel} from "../../../domain/models/account-model";
import {RemoteAddAccount} from "./remote-add-account";
import {AddAccountParams} from "../../../domain/usecases/add-account";
import {mockAddAccountParams} from "../../../domain/test/mock-add-account";
import {HttpStatusCode} from "../../protocols/http/http-response";
import {EmailInUseError} from "../../../domain/errors/email-in-use-error";
import {UnexpectedError} from "../../../domain/errors/unexpected-error";
import {mockAuthentication} from "../../../domain/test/mock-account";

type SutTypes = {
    sut: RemoteAddAccount;
    httpPostClientSpy: HttpPostClientSpy<AddAccountParams, AccountModel>;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpPostClientSpy = new HttpPostClientSpy<AddAccountParams, AccountModel>();
    const sut = new RemoteAddAccount(url, httpPostClientSpy);
    return {
        sut,
        httpPostClientSpy,
    };
}

describe(`RemoteAddAccount`, () => {
    it(`Should call HttpClientPostClient with correct URL`, async () => {
        const url = faker.internet.url();
        const {sut, httpPostClientSpy} = makeSut(url);
        await sut.add(mockAddAccountParams());
        expect(httpPostClientSpy.url).toBe(url);
    });

    it(`Should call HttpClientPostClient with correct body`, async () => {
        const {sut, httpPostClientSpy} = makeSut();
        const addAccountParams = mockAddAccountParams();
        await sut.add(addAccountParams);
        expect(httpPostClientSpy.body).toEqual(addAccountParams);
    });

    it(`Should throw EmailInUseError if httpClient returns 403`, async () => {
        const {sut, httpPostClientSpy} = makeSut();
        httpPostClientSpy.response = {statusCode: HttpStatusCode.forbidden};
        const promise = sut.add(mockAddAccountParams());
        await expect(promise).rejects.toThrow(new EmailInUseError());
    });

    it(`Should throw UnexpectedError if httpClient returns 400`, async () => {
        const {sut, httpPostClientSpy} = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.badRequest
        };
        const promise = sut.add(mockAddAccountParams());
        await expect(promise).rejects.toThrow(new UnexpectedError());
    });

    it(`Should throw UnexpectedError if httpClient returns 500`, async () => {
        const {sut, httpPostClientSpy} = makeSut();
        httpPostClientSpy.response = {
            statusCode: HttpStatusCode.serverError
        };
        const promise = sut.add(mockAddAccountParams());
        await expect(promise).rejects.toThrow(new UnexpectedError());
    });
});
