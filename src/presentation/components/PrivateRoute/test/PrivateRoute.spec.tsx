import React from "react";
import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";
import PrivateRoute from "../PrivateRoute";
import ApiContext from "../../../context/api/api-context";
import { mockAccountModel } from "../../../../domain/test/mock-account";
import { AccountModel } from "../../../../domain/models/account-model";

type SutTypes = {
  history: MemoryHistory;
}

const makeSut = (account: AccountModel = mockAccountModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ["/"] });
  render(
    <ApiContext.Provider value={{ getCurrentAccount: () => account }}>
      <Router history={history}>
        <PrivateRoute/>
      </Router>
    </ApiContext.Provider>
  );
  return { history };
}

describe("PrivateRoute", () => {
  test("Should redirect to /login if token is empty", () => {
    const { history } = makeSut(null);
    expect(history.location.pathname).toBe("/login");
  });

  test("Should render current component if token is not empty", () => {
    const { history } = makeSut();
    expect(history.location.pathname).toBe("/");
  });
});
