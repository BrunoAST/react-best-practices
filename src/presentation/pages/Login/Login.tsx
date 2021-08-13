import React, {useEffect, useState} from "react";
import Styles from "./login.module.scss";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input/Input";
import FormStatus from "../../components/FormStatus/FormStatus";
import Context from "../../context/form/form-context";
import {Validation} from "../../protocols/validation";

type Props = {
    validation: Validation;
}

const Login: React.FC<Props> = ({validation}: Props) => {
    const [state, setState] = useState({
        isLoading: false,
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        mainError: "",
    });

    useEffect(() => {
        setState({
            ...state,
            emailError: validation.validate("email", state.email),
            passwordError: validation.validate("password", state.password)
        });
    }, [state.email, state.password]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        setState({
            ...state,
            isLoading: true
        });
    }

    return (
        <div className={Styles.login}>
            <LoginHeader/>
            <Context.Provider value={{state, setState}}>
                <form className={Styles.login__form} onSubmit={handleSubmit}>
                    <h2>Login</h2>

                    <Input
                        type="email"
                        name="email"
                        placeholder="Digite seu e-mail"
                    />
                    <Input
                        type="password"
                        name="password"
                        placeholder="Digite sua senha"
                    />

                    <button
                        className={Styles.submit}
                        type="submit"
                        data-testid="submit-button"
                        disabled={!!state.emailError || !!state.passwordError}
                    >
                        Entrar
                    </button>
                    <span className={Styles.link}>Criar conta</span>

                    <FormStatus/>
                </form>
            </Context.Provider>
            <Footer/>
        </div>
    );
}

export default Login;
