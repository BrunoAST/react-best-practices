import React, {useState} from "react";
import Styles from "./login.module.scss";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input/Input";
import FormStatus from "../../components/FormStatus/FormStatus";
import Context from "../../context/form/form-context";

type StateProps = {
    isLoading: boolean;
    errorMessage: string;
}

const Login: React.FC = () => {
    const [state] = useState<StateProps>({isLoading: false, errorMessage: ""});

    return (
        <div data-testid="" className={Styles.login}>
            <LoginHeader/>
            <Context.Provider value={state}>
                <form className={Styles.login__form}>
                    <h2>Login</h2>

                    <Input type="email" name="email" placeholder="Digite seu e-mail"/>
                    <Input type="password" name="password" placeholder="Digite sua senha"/>

                    <button className={Styles.submit} type="submit">Entrar</button>
                    <span className={Styles.link}>Criar conta</span>

                    <FormStatus/>
                </form>
            </Context.Provider>
            <Footer/>
        </div>
    );
}

export default Login;
