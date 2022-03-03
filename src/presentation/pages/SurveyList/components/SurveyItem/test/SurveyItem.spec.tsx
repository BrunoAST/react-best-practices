import React from "react";
import { render, screen } from "@testing-library/react";
import SurveyItem from "../SurveyItem";
import { mockSurveyModel } from "../../../../../../domain/test/mock-survey-list";
import { IconName } from "../../../../../components/Icon/types/icon-props";

const makeSut = (survey = mockSurveyModel()): void => {
  render(<SurveyItem survey={survey} />);
};

describe("SurveyItem component", () => {
  test("Should render with correct values", () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: true,
      date: new Date("2022-01-10T00:00:00")
    });
    makeSut(survey);
    expect(screen.getByTestId("icon")).toHaveProperty("src", IconName.thumbUp);
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
    expect(screen.getByTestId("day")).toHaveTextContent("10");
    expect(screen.getByTestId("month")).toHaveTextContent("jan");
    expect(screen.getByTestId("year")).toHaveTextContent("2022");
  });

  test("Should render with correct values", () => {
    const survey = Object.assign(mockSurveyModel(), {
      didAnswer: false,
      date: new Date("2020-05-04T00:00:00")
    });
    makeSut(survey);
    expect(screen.getByTestId("icon")).toHaveProperty("src", IconName.thumbDown);
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
    expect(screen.getByTestId("day")).toHaveTextContent("04");
    expect(screen.getByTestId("month")).toHaveTextContent("mai");
    expect(screen.getByTestId("year")).toHaveTextContent("2020");
  });
});
