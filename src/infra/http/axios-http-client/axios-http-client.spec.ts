import {AxiosHttpClient} from "./axios-http-client";
import {HttpPostParams} from "../../../data/protocols/http/http-post-client";
import axios from "axios";
import faker from "faker";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockedAxiosResult = {
    data: faker.random.objectElement(),
    status: faker.datatype.number(),
}
mockedAxios.post.mockResolvedValue(mockedAxiosResult);

const makeSut = (): AxiosHttpClient => {
    return new AxiosHttpClient();
}

const mockPostRequest = (): HttpPostParams<unknown> => ({
    url: faker.internet.url(),
    body: faker.random.objectElement()
});

describe("AxiosHttpClient", () => {
    it("Should call axios with correct URL and verb", async () => {
        const request = mockPostRequest();
        const sut = makeSut();
        await sut.post(request);
        expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });

    it("Should return the correct statusCode and body", async () => {
        const request = mockPostRequest();
        const sut = makeSut();
        const response = await sut.post(request);
        expect(response).toEqual({
            statusCode: mockedAxiosResult.status,
            body: mockedAxiosResult.data
        });
    });
});
