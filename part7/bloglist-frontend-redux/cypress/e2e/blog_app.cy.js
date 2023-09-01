describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    // create a user with API
    const user = {
      name: "Root User",
      username: "admin",
      password: "1234",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user);
    const anotherUser = {
      name: "John Doe",
      username: "johndoe",
      password: "1234",
    };
    cy.request("POST", "http://localhost:3003/api/users/", anotherUser);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("username");
    cy.contains("login");
  });

  it("user can login", function () {});

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username-input").type("admin");
      cy.get("#password-input").type("1234");
      cy.contains("login").click();
      cy.contains("Root User logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username-input").type("admin");
      cy.get("#password-input").type("wrong_password");
      cy.contains("login").click();
      cy.contains("Wrong credentials");
      cy.get("#notification-div").should(
        "have.css",
        "background-color",
        "rgb(248, 215, 218)"
      );
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      // log in user here
      cy.get("#username-input").type("admin");
      cy.get("#password-input").type("1234");
      cy.contains("login").click();
      cy.contains("Root User logged in");
    });

    it("A blog can be created", function () {
      // ...
      cy.contains("create").click();
      cy.get("#title-input").type("test title");
      cy.get("#author-input").type("test author");
      cy.get("#url-input").type("test url");
      cy.get("#create-button").click();
      cy.contains("test title test author");
    });
  });

  describe("When logged in and create one blog", function () {
    beforeEach(function () {
      // log in user here
      cy.get("#username-input").type("admin");
      cy.get("#password-input").type("1234");
      cy.contains("login").click();
      cy.contains("Root User logged in");
      cy.contains("create").click();
      cy.get("#title-input").type("test title");
      cy.get("#author-input").type("test author");
      cy.get("#url-input").type("test url");
      cy.get("#create-button").click();
      cy.contains("test title test author");
    });
    it("A User can like a blog", function () {
      // ...
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("likes 1");
    });
    it("A user can delete a blog created by the same user", function () {
      cy.contains("test title test author");
      cy.contains("view").click();
      cy.contains("delete").click();
      cy.contains("test title test author").should("not.exist");
    });
    it("A user can't delete someone else's blog", function () {
      cy.contains("logout").click();
      cy.get("#username-input").type("johndoe");
      cy.get("#password-input").type("1234");
      cy.contains("login").click();
      cy.contains("John Doe logged in");
      cy.contains("view").click();
      cy.contains("delete").should("not.exist");
    });
    it("blogs are ordered by their likes", function () {
      cy.contains("create").click();
      cy.get("#title-input").type("most blog");
      cy.get("#author-input").type("author 2");
      cy.get("#url-input").type("url2");
      cy.get("#create-button").click();
      cy.get(".blog-style").eq(1).contains("most blog");
      cy.get(".blog-style").eq(0).contains("test title");
      cy.get(".view-button").eq(1).click();
      cy.contains("like").click();
      cy.contains("like").click();
      cy.contains("like").click();
      cy.get(".blog-style").eq(0).contains("most blog");
      cy.get(".blog-style").eq(1).contains("test title");
    });
  });
});
