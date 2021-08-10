import {AxiosHttpClient} from "./axios-http-client";
import {mockAxios} from "../test/mock-axios";
import {mockPostRequest} from "../../../data/test/mock-http-post";
import axios from "axios";

jest.mock("axios");

type SutTypes = {
    sut: AxiosHttpClient,
    mockedAxios: jest.Mocked<typeof axios>,
}

const makeSut = (): SutTypes => {
    const sut = new AxiosHttpClient();
    const mockedAxios = mockAxios();
    return {sut, mockedAxios};
}

describe("AxiosHttpClient", () => {
    it("Should call axios with correct URL and verb", async () => {
        const request = mockPostRequest();
        const {sut, mockedAxios} = makeSut();
        await sut.post(request);
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });

    it("Should return the correct statusCode and body", () => {
        const {sut, mockedAxios} = makeSut();
        const promise = sut.post(mockPostRequest());
        // mock: has the result of mockResolvedValue
        // position 0: mock has 2 values: resolved and reject
        expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
});
