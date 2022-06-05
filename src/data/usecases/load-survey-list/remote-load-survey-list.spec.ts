import faker from "faker";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { HttpGetClientSpy } from "../../../data/test/mock-http";
import { RemoteLoadSurveyList } from "./remote-load-survey-list";
import { HttpStatusCode } from "../../../data/protocols/http/http-response";
import { mockSurveyListModel } from "../../../domain/test/mock-survey-list";

type SutTypes = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<RemoteLoadSurveyList.Model[]>;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpGetClientSpy = new HttpGetClientSpy<RemoteLoadSurveyList.Model[]>();
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

  it("Should throw UnexpectedError if HttpGetClient returns 404", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = { statusCode: HttpStatusCode.notFound };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it("Should throw UnexpectedError if HttpGetClient returns 500", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = { statusCode: HttpStatusCode.serverError };
    const promise = sut.loadAll();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it("Should return a list of SurveyModels if HttpGetClient returns 200", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    const httpResult = mockSurveyListModel();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    };
    const surveyList = await sut.loadAll();
    await expect(surveyList).toEqual(httpResult);
  });

  it("Should return an empty list if HttpGetClient returns 204", async () => {
    const { sut, httpGetClientSpy } = makeSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const surveyList = await sut.loadAll();
    await expect(surveyList).toEqual([]);
  });
});
