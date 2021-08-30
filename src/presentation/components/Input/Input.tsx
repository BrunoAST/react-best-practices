import React, {useContext} from "react";
import Styles from "./input.module.scss";
import Context from "../../context/form/form-context";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
    const {state, setState} = useContext(Context);
    const error = state[`${props.name}Error`];

    const handleChange = (event: React.FocusEvent<HTMLInputElement>): void => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    return (
        <div
            className={Styles.inputWrap}
            data-testid={`${props.name}-wrap`}
            data-status={error ? "invalid" : "valid"}
        >
            <input
                {...props}
                title={error}
                data-testid={props.name}
                autoComplete="off"
                placeholder=" "
                onChange={handleChange}
            />
            <label data-testid={`${props.name}-label`} title={error}>
                {props.placeholder}
            </label>
        </div>
    );
}

export default Input;
