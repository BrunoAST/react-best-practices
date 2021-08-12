import React, {useContext} from "react";
import Styles from "./input.module.scss";
import Context from "../../context/form/form-context";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
    const {state, setState} = useContext(Context);
    const error = state[`${props.name}Error`];

    const getStatus = (): string => {
        return "🔴";
    }

    const getTitle = (): string => {
        return error;
    }

    const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    return (
        <div className={Styles.inputWrap}>
            <input
                data-testid={props.name}
                autoComplete="off"
                {...props}
                onChange={handleChange}
            />
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
