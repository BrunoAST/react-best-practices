import React, { useContext } from "react";
import SurveyListContext from "../../context/survey-list-context";

const SurveyError: React.FC = () => {
  const { state } = useContext(SurveyListContext);

  return (
    <div>
      <span data-testid="error">{state.error}</span>
      <button>Recarregar</button>
    </div>
  );
};

export default SurveyError;
