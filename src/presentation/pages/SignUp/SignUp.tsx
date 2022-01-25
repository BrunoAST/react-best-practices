import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Styles from "../../../theme/styles/form.scss";
import LoginHeader from "../../components/LoginHeader/LoginHeader";
import FormContext from "../../context/form/form-context";
import ApiContext from "../../context/api/api-context";
import Input from "../../components/Input/Input";
import FormStatus from "../../components/FormStatus/FormStatus";
import Footer from "../../components/Footer/Footer";
import { SignUpProps } from "./types/signup-props";
import { ROUTES } from "../../../main/Router/constants/routes.const";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

const SignUp: React.FC<SignUpProps> = ({ validation, addAccount }: SignUpProps) => {
  const { setCurrentAccount } = useContext(ApiContext);
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: false,
    isFormInvalid: true,
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
    const { name, email, password, passwordConfirmation } = state;
    const formData = { name, email, password, passwordConfirmation };
    const nameError = validation.validate("name", formData);
    const emailError = validation.validate("email", formData);
    const passwordError = validation.validate("password", formData);
    const passwordConfirmationError = validation.validate("passwordConfirmation", formData);
    setState({
      ...state,
      nameError,
      emailError,
      passwordError,
      passwordConfirmationError,
      isFormInvalid: !!nameError || !!emailError || !!passwordError || !!passwordConfirmationError,
    });
  }, [state.name, state.email, state.password, state.passwordConfirmation]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    if (state.isLoading || state.isFormInvalid) return;
    try {
      setState({ ...state, isLoading: true });
      const account = await addAccount.add({
        name: state.name,
        email: state.email,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      });
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
          <h2>Criar conta</h2>

          <Input
            autoFocus
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

          <SubmitButton text="Cadastrar"/>

          <Link className={Styles.link} data-testid="login-link" to={ROUTES.LOGIN}>
            <span>Voltar para Login</span>
          </Link>

          <FormStatus/>
        </form>
      </FormContext.Provider>
      <Footer/>
    </div>
  );
}

export default SignUp;
