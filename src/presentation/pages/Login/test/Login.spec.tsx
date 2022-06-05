import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import faker from "faker";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import Login from "../Login";
import { ValidationStub } from "../../../test/mock-validation";
import { InvalidCredentialsError } from "../../../../domain/errors/invalid-credentials-error";
import { ROUTES } from "../../../../main/Router/constants/routes.const";
import { simulateLoginValidSubmit } from "./login-test-helper";
import { populateField, testStatusForField } from "../../../test/form-helper";
import ApiContext from "../../../context/api/api-context";
import { Authentication } from "../../../../domain/usecases/authentication";
import { AuthenticationSpy } from "../../../../domain/test/mock-authentication";

const history = createMemoryHistory({ initialEntries: [ROUTES.LOGIN] });

type SutTypes = {
  authenticationSpy: AuthenticationSpy;
  setCurrentAccountMock: (accountModel: Authentication.Model) => void;
}

type SutParams = {
  validationError: string;
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  const authenticationSpy = new AuthenticationSpy();
  const setCurrentAccountMock = jest.fn();
  render(
    <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
      <Router history={history}>
        <Login
          validation={validationStub}
          authentication={authenticationSpy}
        />
      </Router>
    </ApiContext.Provider>
  );
  return { authenticationSpy, setCurrentAccountMock };
}

describe("Login Component", () => {
  it("Should not render spinner and error on start", () => {
    makeSut();
    expect(screen.getByTestId("error-wrap").children).toHaveLength(0);
  });

  it("Should start with submit button disabled", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    expect(screen.getByTestId("submit-button")).toBeDisabled();
  });

  it("Should start with the initial status label for email input", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    testStatusForField("email", validationError);
  });

  it("Should start with the initial status label for password input", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    testStatusForField("password", validationError);
  });

  it("Should show email error if validation fails", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    populateField("email", faker.internet.email());
  });

  it("Should show password error if validation fails", () => {
    const validationError = faker.random.words();
    makeSut({ validationError });
    populateField("password", faker.internet.password());
    testStatusForField("password", validationError);
  });

  it("Should show valid email state if validation succeeds", () => {
    makeSut();
    populateField("email", faker.internet.email());
    testStatusForField("email");
  });

  it("Should show valid password state if validation succeeds", () => {
    makeSut();
    populateField("password", faker.internet.password());
    testStatusForField("password");
  });

  it("Should enable submit button if form is valid", () => {
    makeSut();
    populateField("email", faker.internet.email());
    populateField("password", faker.internet.password());
    expect(screen.getByTestId("submit-button")).toBeEnabled();
  });

  it("Should show spinner on submit", async () => {
    makeSut();
    await simulateLoginValidSubmit();
    expect(screen.queryByTestId("spinner")).toBeInTheDocument();
  });

  it("Should call Authentication with correct values", async () => {
    const { authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateLoginValidSubmit(email, password);
    expect(authenticationSpy.params).toEqual({ email, password });
  });

  it("Should call Authentication only once", async () => {
    const { authenticationSpy } = makeSut();
    await simulateLoginValidSubmit();
    await simulateLoginValidSubmit();
    expect(authenticationSpy.callsCount).toBe(1);
  });

  it("Should not call Authentication if form is invalid", async () => {
    const validationError = faker.random.words();
    const { authenticationSpy } = makeSut({ validationError });
    await simulateLoginValidSubmit();
    expect(authenticationSpy.callsCount).toBe(0);
  });

  it("Should present error if Authentication fails", async () => {
    const { authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, "auth").mockReturnValueOnce(Promise.reject(error));
    await simulateLoginValidSubmit();
    expect(screen.getByTestId("main-error")).toHaveTextContent(error.message);
  });

  it("Should hide spinner if Authentication fails", async () => {
    const { authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, "auth").mockRejectedValueOnce(error);
    await simulateLoginValidSubmit();
    expect(screen.getByTestId("error-wrap").children).toHaveLength(1);
  });

  it("Should call UpdateCurrentAccount on success", async () => {
    const { authenticationSpy, setCurrentAccountMock } = makeSut();
    await simulateLoginValidSubmit();
    expect(setCurrentAccountMock).toHaveBeenCalledWith(authenticationSpy.account);
  });

  it("Should navigate to home page", async () => {
    makeSut();
    await simulateLoginValidSubmit();
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe("/");
  });

  it("Should go to sign up page", async () => {
    makeSut();
    const signUp = screen.getByTestId("sign-up-link");
    fireEvent.click(signUp);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe("/signup");
  });
});
