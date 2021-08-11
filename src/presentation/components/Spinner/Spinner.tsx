import React from "react";
import Styles from "./spinner.module.scss";

type Props = React.HTMLAttributes<HTMLElement>

const Spinner: React.FC<Props> = (props: Props) => {
    return (
        <div className={[Styles.spinner, props.className].join(" ")}>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    );
}

export default Spinner;
