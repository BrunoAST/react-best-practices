import React, { useContext } from "react";
import SurveyListContext from "../../context/survey-list-context";

const SurveyError: React.FC = () => {
  const { state, setState } = useContext(SurveyListContext);

  const reload = (): void => {
    setState({ surveys: [], error: "", reload: !state.reload });
  };

  return (
    <div>
      <span data-testid="error">{state.error}</span>
      <button data-testid="reload" onClick={reload}>Recarregar</button>
    </div>
  );
};

export default SurveyError;
