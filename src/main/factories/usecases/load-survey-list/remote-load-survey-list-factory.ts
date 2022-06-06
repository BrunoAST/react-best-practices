import { makeApiUrl } from "../../http/api-url-factory";
import { RemoteLoadSurveyList } from "../../../../data/usecases/load-survey-list/remote-load-survey-list";
import { LoadSurveyList } from "../../../../domain/usecases/load-survey-list";
import { makeAuthorizeHttpGetClientDecorator } from "../../decorators";

export const makeRemoteLoadSurveyList = (): LoadSurveyList => {
  return new RemoteLoadSurveyList(makeApiUrl("/surveys"), makeAuthorizeHttpGetClientDecorator());
};
