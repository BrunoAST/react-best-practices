import React from "react";
import Styles from "./form-status-styles.scss";
import Spinner from "../Spinner/Spinner";

const FormStatus: React.FC = () => {
    return (
        <div className={Styles.errorWrap}>
            <Spinner className={Styles.spinner}/>
            <span className={Styles.error}>Erro</span>
        </div>
    );
}

export default FormStatus;
