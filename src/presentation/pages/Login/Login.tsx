import React from "react";
import Styles from "./login-styles.scss";
import Spinner from "../../components/Spinner/Spinner";
import Logo from "../../components/Logo/Logo";

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <header className={Styles.login__header}>
                <Logo/>
                <h1>4Dev - Enquetes para programadores</h1>
            </header>

            <form className={Styles.login__form}>
                <h2>Login</h2>
                {/*Email*/}
                <div className={Styles.inputWrap}>
                    <input type="email" name="email" placeholder="Digite seu e-mail"/>
                    <span className={Styles.status}>🔴</span>
                </div>

                {/*Password*/}
                <div className={Styles.inputWrap}>
                    <input type="password" name="password" placeholder="Digite sua senha"/>
                    <span className={Styles.status}>🔴</span>
                </div>

                {/*Actions*/}
                <button className={Styles.submit} type="submit">Entrar</button>
                <span className={Styles.link}>Criar conta</span>

                {/*Error messages*/}
                <div className={Styles.errorWrap}>
                    <Spinner className={Styles.spinner}/>
                    <span className={Styles.error}>Erro</span>
                </div>
            </form>

            <footer className={Styles.login__footer}/>
        </div>
    );
}

export default Login;
