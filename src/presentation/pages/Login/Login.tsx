import React from "react";
import Styles from "./login-styles.scss";
import Spinner from "../../components/Spinner/Spinner";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input/Input";

const Login: React.FC = () => {
    return (
        <div className={Styles.login}>
            <LoginHeader/>
            <form className={Styles.login__form}>
                <h2>Login</h2>
                {/*Email*/}
                <Input type="email" name="email" placeholder="Digite seu e-mail"/>

                {/*Password*/}
                <Input type="password" name="password" placeholder="Digite sua senha"/>

                {/*Actions*/}
                <button className={Styles.submit} type="submit">Entrar</button>
                <span className={Styles.link}>Criar conta</span>

                {/*Error messages*/}
                <div className={Styles.errorWrap}>
                    <Spinner className={Styles.spinner}/>
                    <span className={Styles.error}>Erro</span>
                </div>
            </form>

            <Footer/>
        </div>
    );
}

export default Login;
