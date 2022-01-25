import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Styles from "../../../theme/styles/form.scss";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import Footer from "../../components/Footer/Footer";
import Input from "../../components/Input/Input";
import FormStatus from "../../components/FormStatus/FormStatus";
import FormContext from "../../context/form/form-context";
import ApiContext from "../../context/api/api-context";
import { LoginProps } from "./types/login-props";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

const Login: React.FC<LoginProps> = ({ validation, authentication }: LoginProps) => {
  const { setCurrentAccount } = useContext(ApiContext);
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
    const { email, password } = state;
    const formData = { email, password };
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
    if (state.isLoading || state.isFormInvalid) {
      return;
    }
    setState({ ...state, isLoading: true });
    try {
      const account = await authentication.auth({ email: state.email, password: state.password });
      setCurrentAccount(account);
      history.replace("/");
    } catch (error) {
      setState({ ...state, isLoading: false, mainError: error.message });
    }
  }

  return (
    <div className={Styles.formWrapper}>
      <LoginHeader/>
      <FormContext.Provider value={{ state, setState }}>
        <form data-testid="form" className={Styles.formWrapper__form} onSubmit={handleSubmit}>
          <h2>Login</h2>

          <Input
            type="email"
            name="email"
            autoFocus
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
      </FormContext.Provider>
      <Footer/>
    </div>
  );
}

export default Login;
