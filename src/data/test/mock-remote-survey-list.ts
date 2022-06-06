import faker from "faker";
import { RemoteLoadSurveyList } from "../usecases/load-survey-list/remote-load-survey-list";

export const mockRemoteSurveyModel = (): RemoteLoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(),
  date: faker.date.recent().toISOString(),
  didAnswer: faker.datatype.boolean(),
});

export const mockRemoteSurveyListModel = (): RemoteLoadSurveyList.Model[] =>
  Array.from({ length: 3 }).map(() => mockRemoteSurveyModel());
