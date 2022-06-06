import { LoadSurveyList } from "../../../domain/usecases/load-survey-list";
import { HttpGetClient } from "../../../data/protocols/http/http-get-client";
import { HttpStatusCode } from "../../../data/protocols/http/http-response";
import { UnexpectedError } from "../../../domain/errors/unexpected-error";

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string;
    question: string;
    date: string;
    didAnswer: boolean;
  };
}

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>
  ) { }

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    const httpResponse = await this.httpGetClient.get({ url: this.url });
    const remoteSurveys = httpResponse.body || [];
    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteSurveys.map((survey) => Object.assign(survey, { date: new Date(survey.date) }));
      case HttpStatusCode.noContent:
        return [];
      default:
        throw new UnexpectedError();
    }
  }
}
