import {HttpPostParams} from "../protocols/http/http-post-client";
import faker from "faker";

export const mockPostRequest = (): HttpPostParams<unknown> => ({
    url: faker.internet.url(),
    body: faker.random.objectElement()
});
