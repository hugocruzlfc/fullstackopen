describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "Hugo Cruz",
      username: "hcruz",
      password: "Emma171819",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  describe("Landing page", () => {
    it("Login form is shown", function () {
      cy.contains("Blogs App");
      cy.contains("Blogs");
    });
  });

  describe("Login Options", () => {
    it("Login correct", function () {
      cy.contains("Login").click();
      cy.get("#username").type("hcruz");
      cy.get("#password").type("Emma171819");
      cy.get("#login-button").click();

      cy.contains("Hugo Cruz logged in");
    });

    it("login fails with wrong password", function () {
      cy.contains("Login").click();
      cy.get("#username").type("hcruz");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error").contains("Wrong credentials");
      // cy.get(".error")
      //   .should("contain", "wrong credentials")
      //   .and("have.css", "color", "rgb(255, 0, 0)")
      //   .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Hugo Cruz logged in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "hcruz", password: "Emma171819" });
    });

    it("A new blog can be created", function () {
      cy.contains("New Blog").click();
      cy.get("#title").type("A blog created by cypress");
      cy.get("#author").type("Hugo Cruz");
      cy.get("#url").type("http://store.com/1");
      cy.contains("Save").click();
      cy.contains("A blog created by cypress");
    });

    it("User click in like button", function () {
      cy.createBlog({
        title: "A blog created by cypress",
        author: "Hugo Cruz",
        url: "http://store.com/1",
      });
      cy.contains("View").click();
      cy.contains("Like").click();
      cy.contains("Like");
    });

    it("User click in delete buton", function () {
      cy.createBlog({
        title: "A blog created by cypress",
        author: "Hugo Cruz",
        url: "http://store.com/1",
      });
      cy.contains("View").click();
      cy.get("#btn-delete").contains("Delete").click();
    });
  });

  describe("Blog sort correctly", () => {
    beforeEach(function () {
      cy.login({ username: "hcruz", password: "Emma171819" });

      cy.createBlog({
        title: "A blog created by cypress",
        author: "Hugo Cruz",
        url: "http://store.com/1",
        likes: 5,
      });

      cy.createBlog({
        title: "Second blog created by cypress",
        author: "Hugo Cruz",
        url: "http://store.com/2",
        likes: 15,
      });
    });

    it("When create a blog render blogs sort >", function () {
      cy.get("#blogs")
        .children()
        .then((blogs) => {
          console.log(blogs.length);
          cy.wrap(blogs[0]).contains("Second blog created by cypress");
          cy.wrap(blogs[1]).contains("A blog created by cypress");
        });
    });
  });
});
