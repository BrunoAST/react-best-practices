import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import ApiContext from "../../context/api/api-context";
import Header from "./Header";
import { ROUTES } from "../../../main/Router/constants/routes.const";

describe("Header Component", () => {
  test("Should call setCurrentAccount with null", () => {
    const history = createMemoryHistory({ initialEntries: ["/"] });
    const setCurrentAccountMock = jest.fn();

    render(
      <ApiContext.Provider value={{ setCurrentAccount: setCurrentAccountMock }}>
        <Router history={history}>
          <Header />
        </Router>
      </ApiContext.Provider>
    );

    fireEvent.click(screen.getByTestId("logout"));

    expect(setCurrentAccountMock).toHaveBeenCalledWith(null);
    expect(history.location.pathname).toBe(ROUTES.LOGIN);
  });
});
