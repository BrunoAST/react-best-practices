import React, {useContext} from "react";
import Styles from "./input.module.scss";
import Context from "../../context/form/form-context";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
    const {errorState} = useContext(Context);
    const error = errorState[props.name];

    const getStatus = (): string => {
        return "🔴";
    }

    const getTitle = (): string => {
        return error;
    }

    return (
        <div className={Styles.inputWrap}>
            <input autoComplete="off" {...props}/>
            <span
                data-testid={`${props.name}-status`}
                title={getTitle()}
                className={Styles.status}
            >
                {getStatus()}
            </span>
        </div>
    );
}

export default Input;
