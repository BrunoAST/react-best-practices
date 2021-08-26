Cypress.Commands.add("getByTestId", (id) => cy.get(`[data-testid=${id}]`));

Cypress.Commands.add("containsErrorStatus", (id) =>
    cy.getByTestId(id).should("contain.text", "🔴")
);

Cypress.Commands.add("containsErrorMessage", (id, errorMessage) =>
    cy.getByTestId(id).should("have.attr", "title", errorMessage)
);

Cypress.Commands.add("isDisabled", (id) =>
    cy.getByTestId(id).should("be.disabled")
);
