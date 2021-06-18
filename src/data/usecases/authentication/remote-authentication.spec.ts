import { HttpPostClient } from 'data/protocols/http/http-post-client';
import { RemoteAuthentication } from './remote-authentication';

describe(`RemoteAuthentication`, () => {
    it(`Should call httpClient with correct URL`, async () => {
        class HttpClientSpy implements HttpPostClient {
            url?: string;

            post(url: string): Promise<void> {
                this.url = url;
                return Promise.resolve();
            }
        }

        const url = 'any_url';
        const httpPostClientSpy = new HttpClientSpy();
        const sut = new RemoteAuthentication(url, httpPostClientSpy);
        await sut.auth();
        expect(httpPostClientSpy.url).toBe(url);
    });
});
