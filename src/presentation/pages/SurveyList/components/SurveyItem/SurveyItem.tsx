import React from "react";
import Styles from "./survey-item.module.scss";
import Icon from "presentation/components/Icon/Icon";
import { IconName } from "presentation/components/Icon/types/icon-props";

const SurveyItem: React.FC = () => {
  return (
    <li>
      <div className={Styles.surveyContent}>
        <Icon iconName={IconName.thumbUp} className={Styles.surveyContent__iconWrapper} />
        <time>
          <span className={Styles.day}>20</span>
          <span className={Styles.month}>03</span>
          <span className={Styles.year}>2021</span>
        </time>
        <p>Qual é seu framework web favorito?</p>
      </div>
      <footer>
        Ver Resultado
      </footer>
    </li>
  );
}

export default SurveyItem;
