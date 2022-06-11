import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import SurveyList from "../SurveyList";
import { UnexpectedError } from "../../../../domain/errors/unexpected-error";
import { LoadSurveyListSpy } from "../../../../domain/test/mock-survey-list";
import ApiContext from "../../../context/api/api-context";

type SutTypes = {
  loadSurveyListSpy: LoadSurveyListSpy;
};

const makeSut = (loadSurveyListSpy = new LoadSurveyListSpy()): SutTypes => {
  render(
    <ApiContext.Provider value={{ setCurrentAccount: jest.fn() }}>
      <Router history={createMemoryHistory()}>
        <SurveyList loadSurveyList={loadSurveyListSpy} />
      </Router>
    </ApiContext.Provider>
  );
  return { loadSurveyListSpy };
};

describe("SurveyList component", () => {
  test("Should present 4 empty items on start", async () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    expect(surveyList.querySelectorAll("li:empty").length).toBe(4);
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
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
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
  });

  test("Should render error on failure", async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListSpy, "loadAll").mockRejectedValue(error);
    makeSut(loadSurveyListSpy);
    await waitFor(() => screen.getByRole("heading"));
    expect(screen.queryByTestId("survey-list")).not.toBeInTheDocument();
    expect(screen.getByTestId("error")).toHaveTextContent(error.message);
  });

  test("Should call LoadSurveyList on reload", async () => {
    const loadSurveyListSpy = new LoadSurveyListSpy();
    jest.spyOn(loadSurveyListSpy, "loadAll").mockRejectedValueOnce(new UnexpectedError());
    makeSut(loadSurveyListSpy);
    await waitFor(() => screen.getByRole("heading"));
    fireEvent.click(screen.getByTestId("reload"));
    expect(loadSurveyListSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByRole("heading"));
  });
});
