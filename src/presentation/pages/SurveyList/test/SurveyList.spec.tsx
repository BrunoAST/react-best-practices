import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import SurveyList from "../SurveyList";
import { LoadSurveyList } from "domain/usecases/load-survey-list";
import { SurveyModel } from "domain/models/survey-model";
import { mockSurveyListModel } from "../../../../domain/test/mock-survey-list";

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  surveys = mockSurveyListModel();

  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return this.surveys;
  }
}

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (): SutTypes => {
  const loadSurveyListSpy = new LoadSurveyListSpy();
  render(<SurveyList loadSurveyList={loadSurveyListSpy} />);
  return { loadSurveyListSpy };
};

describe("SurveyList component", () => {
  test("Should present 4 empty items on start", async () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    expect(surveyList.querySelectorAll("li:empty").length).toBe(4);
    await waitFor(() => surveyList);
  });

  test("Should call LoadSurveyList", async () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole("heading"));
  });

  test("Should render SurveyItems on success", async () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    await waitFor(() => surveyList);
    expect(surveyList.querySelectorAll("li.surveyItemWrap").length).toBe(5);
  });
});
