import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import Styles from "../../../theme/styles/form.scss";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import Context from "../../context/form/form-context";
import Input from "../../components/Input/Input";
import FormStatus from "../../components/FormStatus/FormStatus";
import Footer from "../../components/Footer/Footer";
import {SignUpProps} from "./types/signup-props";

const SignUp: React.FC<SignUpProps> = ({validation, addAccount, saveAccessToken}: SignUpProps) => {
    const history = useHistory();
    const [state, setState] = useState({
        isLoading: false,
        name: "",
        email: "",
        password: "",
        passwordConfirmation: "",
        nameError: "",
        emailError: "",
        passwordError: "",
        passwordConfirmationError: "",
        mainError: "",
    });

    useEffect(() => {
        setState({
            ...state,
            nameError: validation.validate("name", state.name),
            emailError: validation.validate("email", state.email),
            passwordError: validation.validate("password", state.password),
            passwordConfirmationError: validation.validate("passwordConfirmation", state.passwordConfirmation)
        });
    }, [state.name, state.email, state.password, state.passwordConfirmation]);

    const isFormInvalid = (): boolean => {
        return (
            !!state.nameError || !!state.emailError ||
            !!state.passwordError || !!state.passwordConfirmationError
        );
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
        event.preventDefault();
        if (state.isLoading || isFormInvalid()) return;
        try {
            setState({...state, isLoading: true});
            const {accessToken} = await addAccount.add({
                name: state.name,
                email: state.email,
                password: state.password,
                passwordConfirmation: state.passwordConfirmation,
            });
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
                    <h2>Criar conta</h2>

                    <Input
                        type="text"
                        name="name"
                        placeholder="Digite seu nome"
                    />
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
                    <Input
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Repita sua senha"
                    />

                    <button
                        className={Styles.submit}
                        type="submit"
                        data-testid="submit-button"
                        disabled={isFormInvalid()}
                    >
                        Entrar
                    </button>

                    {/*<Link className={Styles.link} data-testid="sign-up" to={ROUTES.LOGIN}>*/}
                    <span>Voltar para Login</span>
                    {/*</Link>*/}

                    <FormStatus/>
                </form>
            </Context.Provider>
            <Footer/>
        </div>
    );
}

export default SignUp;
