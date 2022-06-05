import faker from "faker";
import { LoadSurveyList } from "../usecases/load-survey-list";

export const mockSurveyModel = (): LoadSurveyList.Model => ({
  id: faker.datatype.uuid(),
  question: faker.random.words(),
  date: faker.date.recent(),
  didAnswer: faker.datatype.boolean(),
});

export const mockSurveyListModel = (): LoadSurveyList.Model[] => Array.from({ length: 5 }).map(() => mockSurveyModel());

export class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();

  async loadAll(): Promise<LoadSurveyList.Model[]> {
    this.callsCount++;
    return this.surveys;
  }
}
