import React from "react";
import { createMemoryHistory } from "history";
import faker from "faker";
import { fireEvent, render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { ROUTES } from "../../../../main/Router/constants/routes.const";
import SignUp from "../SignUp";
import { populateField, testStatusForField } from "../../../test/form-helper";
import { ValidationStub } from "../../../test/mock-validation";
import { simulateValidSignUpSubmit } from "./signup-test-helper";
import { AddAccountSpy } from "../../../test/mock-add-account";
import { InvalidCredentialsError } from "../../../../domain/errors/invalid-credentials-error";
import { simulateLoginValidSubmit } from "../../Login/test/login-test-helper";
import ApiContext from "../../../context/api/api-context";
import { AccountModel } from "../../../../domain/models/account-model";

const history = createMemoryHistory({ initialEntries: [ROUTES.SIGNUP] });

type SutTypes = {
  addAccountSpy: AddAccountSpy;
  setCurrentAccountMock: (accountModel: AccountModel) => void;
}

type SutParams = {
  validationError: string;
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const addAccountSpy = new AddAccountSpy();
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <SignUp
          validation={validationStub}
          addAccount={addAccountSpy}
        />
      </Router>
    </ApiContext.Provider>
  );
  return { addAccountSpy, setCurrentAccountMock };
}

describe("SignUp Component", () => {
  it("Should not render spinner and error on start", () => {
    makeSut();
    expect(screen.getByTestId("error-wrap").children).toHaveLength(0);
  });

  it("Should start with submit button disabled", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  it("Should start with the initial status label for inputs", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    testStatusForField("name", validationError);
    testStatusForField("email", validationError);
    testStatusForField("password", validationError);
    testStatusForField("passwordConfirmation", validationError);
  });

  it("Should show name error if validation fails", () => {
    const validationError = "Campo obrigatório";
    makeSut({ validationError });
    populateField("name", validationError);
  });

  it("Should show email error if validation fails", () => {
    const validationError = "Campo obrigatório";
    makeSut({ validationError });
    populateField("email", validationError);
  });

  it("Should show password error if validation fails", () => {
    const validationError = "Campo obrigatório";
    makeSut({ validationError });
    populateField("password", validationError);
  });

  it("Should show passwordConfirmation error if validation fails", () => {
    const validationError = "Campo obrigatório";
    makeSut({ validationError });
    populateField("passwordConfirmation", validationError);
  });

  it("Should show valid name state if validation succeeds", () => {
    makeSut();
    populateField("name", faker.name.firstName());
    testStatusForField("name");
  });

  it("Should show email name state if validation succeeds", () => {
    makeSut();
    populateField("email", faker.internet.email());
    testStatusForField("email");
  });

  it("Should show email password state if validation succeeds", () => {
    makeSut();
    populateField("password", faker.internet.password());
    testStatusForField("password");
  });

  it("Should show email passwordConfirmation state if validation succeeds", () => {
    makeSut();
    populateField("passwordConfirmation", faker.internet.password());
    testStatusForField("passwordConfirmation");
  });

  it("Should enable submit button if form is valid", () => {
    makeSut();
    populateField("name", faker.name.firstName());
    populateField("email", faker.internet.email());
    populateField("password", faker.internet.password());
    populateField("passwordConfirmation", faker.internet.password());
    expect(screen.getByTestId("submit-button")).toBeEnabled();
  });

  it("Should show spinner on submit", async () => {
    makeSut();
    await simulateValidSignUpSubmit();
    expect(screen.queryByTestId("spinner")).toBeInTheDocument();
  });

  it("Should call AddAccount with correct values", async () => {
    const { addAccountSpy } = makeSut();
    const name = faker.name.firstName();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSignUpSubmit(name, email, password);
    expect(addAccountSpy.params).toEqual({
      name,
      email,
      password,
      passwordConfirmation: password
    });
  });

  it("Should call AddAccount only once", async () => {
    const { addAccountSpy } = makeSut();
    await simulateValidSignUpSubmit();
    await simulateValidSignUpSubmit();
    expect(addAccountSpy.callsCount).toBe(1);
  });

  it("Should not call AddAccount if form is invalid", async () => {
    const validationError = faker.random.words();
    const { addAccountSpy } = makeSut({ validationError });
    await simulateValidSignUpSubmit();
    expect(addAccountSpy.callsCount).toBe(0);
  });

  it("Should present error if AddAccount fails", async () => {
    const { addAccountSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(addAccountSpy, "add").mockRejectedValueOnce(error);
    await simulateValidSignUpSubmit();
    expect(screen.getByTestId("main-error")).toHaveTextContent(error.message);
    expect(screen.getByTestId("error-wrap").children).toHaveLength(1);
  });

  it("Should call UpdateCurrentAccount on success", async () => {
    const { addAccountSpy, setCurrentAccountMock } = makeSut();
    await simulateValidSignUpSubmit();
    expect(setCurrentAccountMock).toHaveBeenCalledWith(addAccountSpy.account);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
  });

  it("Should navigate to home page", async () => {
    makeSut();
    await simulateLoginValidSubmit();
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
  });

  it("Should go to Login page", async () => {
    makeSut();
    const login = screen.getByTestId("login-link");
    fireEvent.click(login);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe(ROUTES.LOGIN);
  });
});
