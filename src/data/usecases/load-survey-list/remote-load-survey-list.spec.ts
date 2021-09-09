import faker from "faker";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { HttpGetClientSpy } from "../../../data/test/mock-http";
import { RemoteLoadSurveyList } from "./remote-load-survey-list";
import { HttpStatusCode } from "../../../data/protocols/http/http-response";
import { SurveyModel } from "../../../domain/models/survey-model";

type SutTypes = {
    sut: RemoteLoadSurveyList;
    httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
    const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>();
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
    return { sut, httpGetClientSpy };
}

describe("RemoteLoadSurveyList", () => {
    it("Should call HttpGetClient with correct URL", async () => {
        const url = faker.internet.url();
        const { sut, httpGetClientSpy } = makeSut(url);
        await sut.loadAll();
        expect(httpGetClientSpy.url).toBe(url);
    });

    it("Should throw UnexpectedError if HttpGetClient returns 403", async () => {
        const { sut, httpGetClientSpy } = makeSut();
        httpGetClientSpy.response = { statusCode: HttpStatusCode.forbidden };
        const promise = sut.loadAll();
        await expect(promise).rejects.toThrow(new UnexpectedError());
    });
});
