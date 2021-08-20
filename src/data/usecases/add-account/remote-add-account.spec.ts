import faker from "faker";
import {HttpPostClientSpy} from "../../test/mock-http";
import {AccountModel} from "../../../domain/models/account-model";
import {RemoteAddAccount} from "./remote-add-account";
import {AddAccountParams} from "../../../domain/usecases/add-account";
import {mockAddAccount} from "../../../domain/test/mock-add-account";
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
        await sut.add(mockAddAccount());
        expect(httpPostClientSpy.url).toBe(url);
    });

    it(`Should call HttpClientPostClient with correct body`, async () => {
        const {sut, httpPostClientSpy} = makeSut();
        const addAccountParams = mockAddAccount();
        await sut.add(addAccountParams);
        expect(httpPostClientSpy.body).toEqual(addAccountParams);
    });
});
