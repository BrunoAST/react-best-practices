import React from "react";
import { render, screen } from "@testing-library/react";
import SurveyItem from "../SurveyItem";
import { mockSurveyModel } from "../../../../../../domain/test/mock-survey-list";
import { IconName } from "../../../../../components/Icon/types/icon-props";

describe("SurveyItem component", () => {
  test("Should render with correct values", () => {
    const survey = mockSurveyModel();
    survey.didAnswer = true;
    survey.date = new Date("2022-01-10T00:00:00");
    render(<SurveyItem survey={survey} />);
    expect(screen.getByTestId("icon")).toHaveProperty("src", IconName.thumbUp);
    expect(screen.getByTestId("question")).toHaveTextContent(survey.question);
    expect(screen.getByTestId("day")).toHaveTextContent("10");
    expect(screen.getByTestId("month")).toHaveTextContent("jan");
    expect(screen.getByTestId("year")).toHaveTextContent("2022");
  });
});
