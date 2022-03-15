import React from "react";
import { makeRemoteLoadSurveyList } from "../../usecases/load-survey-list/remote-load-survey-list-factory";
import SurveyList from "../../../../presentation/pages/SurveyList/SurveyList";

export const makeSurveyList: React.FC = () => {
  return (
    <SurveyList
      loadSurveyList={makeRemoteLoadSurveyList()}
    />
  );
};
