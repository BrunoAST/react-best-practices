import React from "react";
import Styles from "./input.module.scss";

type Props = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

const Input: React.FC<Props> = (props: Props) => {
    return (
        <div className={Styles.inputWrap}>
            <input autoComplete="off" {...props}/>
            <span className={Styles.status}>🔴</span>
        </div>
    );
}

export default Input;
