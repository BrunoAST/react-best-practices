Cypress.Commands.add("getByTestId", (id) => cy.get(`[data-testid=${id}]`));

Cypress.Commands.add("containsErrorStatus", (id) =>
    cy.getByTestId(id).should("contain.text", "🔴")
);

Cypress.Commands.add("containsSuccessStatus", (id) =>
    cy.getByTestId(id).should("contain.text", "🟢")
);

Cypress.Commands.add("containsAttrTitleMessage", (id, message) =>
    cy.getByTestId(id).should("have.attr", "title", message)
);

Cypress.Commands.add("isDisabled", (id) =>
    cy.getByTestId(id).should("be.disabled")
);

Cypress.Commands.add("isEnabled", (id) =>
    cy.getByTestId(id).should("be.enabled")
);
