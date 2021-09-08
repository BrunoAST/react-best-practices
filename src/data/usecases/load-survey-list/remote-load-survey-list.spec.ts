import faker from "faker";
import { HttpGetClientSpy } from "../../../data/test/mock-http";
import { RemoteLoadSurveyList } from "./remote-load-survey-list";

type SutTypes = {
    sut: RemoteLoadSurveyList;
    url: string;
    httpGetClientSpy: HttpGetClientSpy;
}

const makeSut = (): SutTypes => {
    const url = faker.internet.url();
    const httpGetClientSpy = new HttpGetClientSpy();
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
    return { sut, url, httpGetClientSpy };
}

describe("RemoteLoadSurveyList", () => {
    it("Should call HttpGetClient with correct URL", async () => {
        const { sut, url, httpGetClientSpy } = makeSut();
        await sut.loadAll();
        expect(httpGetClientSpy.url).toBe(url);
    });
});
