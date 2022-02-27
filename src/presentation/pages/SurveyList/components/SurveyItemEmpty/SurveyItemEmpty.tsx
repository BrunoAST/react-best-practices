import React from "react";
import Styles from "./survey-item-empty.module.scss";

const SurveyItemEmpty: React.FC = () => {
  return (
    <>
      <li className={Styles.surveyItemEmpty} />
      <li className={Styles.surveyItemEmpty} />
      <li className={Styles.surveyItemEmpty} />
      <li className={Styles.surveyItemEmpty} />
    </>
  );
}

export default SurveyItemEmpty;
