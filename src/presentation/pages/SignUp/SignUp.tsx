import React from "react";
import {Link} from "react-router-dom";
import Styles from "../../../theme/styles/form.scss";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import Context from "../../context/form/form-context";
import Input from "../../components/Input/Input";
import FormStatus from "../../components/FormStatus/FormStatus";
import Footer from "../../components/Footer/Footer";
import {ROUTES} from "../../components/Router/routes.const";

const SignUp: React.FC = () => {
    return (
        <div className={Styles.formWrapper}>
            <LoginHeader/>
            <Context.Provider value={{state: {}}}>
                <form className={Styles.formWrapper__form}>
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
                    >
                        Entrar
                    </button>

                    <Link className={Styles.link} data-testid="sign-up" to={ROUTES.LOGIN}>
                        <span>Voltar para Login</span>
                    </Link>

                    <FormStatus/>
                </form>
            </Context.Provider>
            <Footer/>
        </div>
    );
}

export default SignUp;
