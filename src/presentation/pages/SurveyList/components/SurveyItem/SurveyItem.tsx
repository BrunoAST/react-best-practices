import React from "react";
import Styles from "./survey-item.module.scss";
import { SurveyItemProps } from "./types/survey-item-props";
import Icon from "../../../../components/Icon/Icon";
import { IconName } from "../../../../components/Icon/types/icon-props";

const SurveyItem: React.FC<SurveyItemProps> = ({ survey }: SurveyItemProps) => {
  const iconName = survey.didAnswer ? IconName.thumbUp : IconName.thumbDown;

  return (
    <li>
      <div className={Styles.surveyContent}>
        <Icon iconName={iconName} className={Styles.surveyContent__iconWrapper} />
        <time>
          <span data-testid="day" className={Styles.day}>
            {survey.date.getDate().toString().padStart(2, "0")}
          </span>
          <span data-testid="month" className={Styles.month}>
            {survey.date.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "")}
          </span>
          <span data-testid="year" className={Styles.year}>
            {survey.date.getFullYear()}
          </span>
        </time>
        <p data-testid="question">{survey.question}</p>
      </div>
      <footer>
        Ver Resultado
      </footer>
    </li>
  );
}

export default SurveyItem;
