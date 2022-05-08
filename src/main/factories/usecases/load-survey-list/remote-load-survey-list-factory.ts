import { makeApiUrl } from "../../http/api-url-factory";
import { RemoteLoadSurveyList } from "../../../../data/usecases/load-survey-list/remote-load-survey-list";
import { LoadSurveyList } from "../../../../domain/usecases/load-survey-list";
import { makeAxiosHttpClient } from "../../http/axios-http-client-factory";

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl("/surveys"), makeAxiosHttpClient());
};