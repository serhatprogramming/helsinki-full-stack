describe("Blog app", function () {
  beforeEach(function () {
    // cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("login");
  });

  it("user can login", function () {
    cy.get("#username-input").type("admin");
    cy.get("#password-input").type("1234");
    cy.contains("login").click();
    cy.contains("Root User logged in");
  });
});

describe("Blog app", function () {
  beforeEach(function () {
    // cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");
    cy.get("#username-input").type("admin");
    cy.get("#password-input").type("1234");
    cy.contains("login").click();
    cy.contains("Root User logged in");
  });

  it("User can create a new blog", function () {
    cy.contains("create").click();
    cy.get("#title-input").type("test title");
    cy.get("#author-input").type("test author");
    cy.get("#url-input").type("test url");
    cy.get("#create-button").click();
    cy.contains("test title test author");
  });
});
