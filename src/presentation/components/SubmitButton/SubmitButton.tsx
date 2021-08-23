import React, {useContext} from "react";
import Context from "../../context/form/form-context";
import {SubmitButtonProps} from "./types/submit-button-props";

const SubmitButton: React.FC<SubmitButtonProps> = ({text}: SubmitButtonProps) => {
    const {state} = useContext(Context);

    return (
        <button
            type="submit"
            data-testid="submit-button"
            disabled={state.isFormInvalid}
        >
            {text}
        </button>
    );
}

export default SubmitButton;
