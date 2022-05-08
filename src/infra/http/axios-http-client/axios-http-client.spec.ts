import axios from "axios";
import { AxiosHttpClient } from "./axios-http-client";
import { mockAxios, mockHttpResponse } from "../test/mock-axios";
import { mockGetRequest, mockPostRequest } from "../../../data/test/mock-http";

jest.mock("axios");

type SutTypes = {
  sut: AxiosHttpClient,
  mockedAxios: jest.Mocked<typeof axios>,
}

const makeSut = (): SutTypes => {
  const sut = new AxiosHttpClient();
  const mockedAxios = mockAxios();
  return { sut, mockedAxios };
}

describe("AxiosHttpClient", () => {
  describe("Post", () => {
    it("Should call axios.post with correct URL and verb", async () => {
      const request = mockPostRequest();
      const { sut, mockedAxios } = makeSut();
      await sut.post(request);
      expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body);
    });

    it("Should return correct response on axios.post", async () => {
      const { sut, mockedAxios } = makeSut();
      const httpResponse = await sut.post(mockPostRequest());
      // mock: has the result of mockResolvedValue
      // position 0: mock has 2 values: resolved and reject
      const axiosResponse = await mockedAxios.post.mock.results[0].value;
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      });
    });

    it("Should return the correct error on axios.post", () => {
      const { sut, mockedAxios } = makeSut();
      mockedAxios.post.mockRejectedValueOnce({ response: mockHttpResponse() });
      const promise = sut.post(mockPostRequest());
      expect(promise).toEqual(mockedAxios.post.mock.results[0].value);
    });
  });

  describe("Get", () => {
    it("Should call axios.get with correct URL", async () => {
      const request = mockGetRequest();
      const { sut, mockedAxios } = makeSut();
      await sut.get(request);
      expect(mockedAxios.get).toHaveBeenCalledWith(request.url, { headers: request.headers });
    });

    it("Should return correct response on axios.get", async () => {
      const { sut, mockedAxios } = makeSut();
      const httpResponse = await sut.get(mockGetRequest());
      const axiosResponse = await mockedAxios.get.mock.results[0].value;
      expect(httpResponse).toEqual({
        statusCode: axiosResponse.status,
        body: axiosResponse.data
      });
    });

    it("Should return the correct error on axios.get", () => {
      const { sut, mockedAxios } = makeSut();
      mockedAxios.get.mockRejectedValueOnce({ response: mockHttpResponse() });
      const promise = sut.get(mockGetRequest());
      expect(promise).toEqual(mockedAxios.get.mock.results[0].value);
    });
  });
});
