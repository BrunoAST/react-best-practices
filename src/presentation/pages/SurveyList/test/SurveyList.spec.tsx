import React from "react";
import { render, screen } from "@testing-library/react";
import SurveyList from "../SurveyList";
import { LoadSurveyList } from "domain/usecases/load-survey-list";
import { SurveyModel } from "domain/models/survey-model";

class LoadSurveyListSpy implements LoadSurveyList {
  callsCount = 0;
  async loadAll(): Promise<SurveyModel[]> {
    this.callsCount++;
    return [];
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
  test("Should present 4 empty items on start", () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    expect(surveyList.querySelectorAll("li:empty").length).toBe(4);
  });

  test("Should call LoadSurveyList", () => {
    const { loadSurveyListSpy } = makeSut();
    expect(loadSurveyListSpy.callsCount).toBe(1);
  });
});
