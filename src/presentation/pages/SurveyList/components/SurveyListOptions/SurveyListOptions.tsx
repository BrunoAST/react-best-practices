import React, { useContext } from "react";
import Styles from "./survey-list-options.module.scss";
import { LoadSurveyList } from "domain/usecases/load-survey-list";
import SurveyItem from "../SurveyItem/SurveyItem";
import SurveyItemEmpty from "../SurveyItemEmpty/SurveyItemEmpty";
import SurveyListContext from "../../context/survey-list-context";

const SurveyListOptions: React.FC = () => {
  const { state } = useContext(SurveyListContext);

  return (
    <ul className={Styles.contentWrapper__resultsList} data-testid="survey-list">
      {
        state.surveys.length
          ? state.surveys.map((survey: LoadSurveyList.Model) => <SurveyItem key={survey.id} survey={survey} />)
          : <SurveyItemEmpty />
      }
    </ul>
  );
};

export default SurveyListOptions;
