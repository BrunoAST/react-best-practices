import { HttpGetClient } from "../../../data/protocols/http/http-get-client";
import { HttpStatusCode } from "../../../data/protocols/http/http-response";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";
import { SurveyModel } from "../../../domain/models/survey-model";

export class RemoteLoadSurveyList {
    constructor(
        private readonly url: string,
        private readonly httpGetClient: HttpGetClient<SurveyModel[]>
    ) { }

    async loadAll(): Promise<void> {
        const httpResponse = await this.httpGetClient.get({ url: this.url });
        switch (httpResponse.statusCode) {
            case HttpStatusCode.ok: break;
            default: throw new UnexpectedError();
        }
    }
}
