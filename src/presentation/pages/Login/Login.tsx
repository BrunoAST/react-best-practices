import React, {useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import Styles from "../../../theme/styles/form.scss";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input/Input";
import FormStatus from "../../components/FormStatus/FormStatus";
import Context from "../../context/form/form-context";
import {LoginProps} from "./types/login-props";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

const Login: React.FC<LoginProps> = ({validation, authentication, saveAccessToken}: LoginProps) => {
    const history = useHistory();
    const [state, setState] = useState({
        isLoading: false,
        isFormInvalid: true,
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        mainError: "",
    });

    useEffect(() => {
        const {email, password} = state;
        const formData = {email, password};
        const emailError = validation.validate("email", formData);
        const passwordError = validation.validate("password", formData);
        setState({
            ...state,
            emailError,
            passwordError,
            isFormInvalid: !!emailError || !!passwordError,
        });
    }, [state.email, state.password]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (state.isLoading || state.isFormInvalid) return;
        setState({...state, isLoading: true});
        try {
            const {accessToken} = await authentication.auth({email: state.email, password: state.password});
            await saveAccessToken.save(accessToken);
            history.replace("/");
        } catch (error) {
            setState({...state, isLoading: false, mainError: error.message});
        }
    }

    return (
        <div className={Styles.formWrapper}>
            <LoginHeader/>
            <Context.Provider value={{state, setState}}>
                <form data-testid="form" className={Styles.formWrapper__form} onSubmit={handleSubmit}>
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

                    <SubmitButton text="Entrar"/>

                    <Link className={Styles.link} data-testid="sign-up-link" to="/signup">
                        <span>Criar conta</span>
                    </Link>

                    <FormStatus/>
                </form>
            </Context.Provider>
            <Footer/>
        </div>
    );
}

export default Login;
