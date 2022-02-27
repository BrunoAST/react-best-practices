import { SurveyModel } from "domain/models/survey-model";

export interface LoadSurveyList {
  loadAll(): Promise<SurveyModel[]>;
}
