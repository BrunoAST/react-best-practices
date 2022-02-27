import React from "react";
import { render, screen } from "@testing-library/react";
import SurveyList from "../SurveyList";

const makeSut = (): void => {
  render(<SurveyList />);
}

describe("SurveyList component", () => {
  test("Should present 4 empty items on start", () => {
    makeSut();
    const surveyList = screen.getByTestId("survey-list");
    expect(surveyList.querySelectorAll("li:empty").length).toBe(4);
  });
});