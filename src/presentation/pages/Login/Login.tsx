import React from "react";
import Styles from "./login.module.scss";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input/Input";
import FormStatus from "../../components/FormStatus/FormStatus";

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <LoginHeader/>
            <form className={Styles.login__form}>
                <h2>Login</h2>

                <Input type="email" name="email" placeholder="Digite seu e-mail"/>
                <Input type="password" name="password" placeholder="Digite sua senha"/>

                <button className={Styles.submit} type="submit">Entrar</button>
                <span className={Styles.link}>Criar conta</span>

                <FormStatus/>
            </form>
            <Footer/>
        </div>
    );
}

export default Login;
