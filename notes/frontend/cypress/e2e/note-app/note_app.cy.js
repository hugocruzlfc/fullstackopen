describe("Note app", function () {
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

  describe("Page Landing", () => {
    it("front page can be opened", function () {
      cy.contains("Notes");
      cy.contains(
        "Note app, Department of Computer Science, University of Helsinki 2020"
      );
    });

    //dara error pues el texto no aparece
    // it("front page contains random text", function () {
    //   cy.visit("http://localhost:3000");
    //   cy.contains("wtf is this app?");
    // });

    it("login form can be opened", function () {
      cy.contains("login").click();
    });

    it("user can login", function () {
      cy.contains("login").click();
      cy.get("#username").type("hcruz");
      cy.get("#password").type("Emma171819");
      cy.get("#login-button").click();

      cy.contains("Hugo Cruz logged-in");
    });

    it("login fails with wrong password", function () {
      cy.contains("login").click();
      cy.get("#username").type("hcruz");
      cy.get("#password").type("wrong");
      cy.get("#login-button").click();

      cy.get(".error").contains("Wrong credentials");
      // cy.get(".error")
      //   .should("contain", "wrong credentials")
      //   .and("have.css", "color", "rgb(255, 0, 0)")
      //   .and("have.css", "border-style", "solid");

      cy.get("html").should("not.contain", "Hugo Cruz logged-in");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      // cy.contains("login").click();
      // cy.get("#username").type("hcruz");
      // cy.get("#password").type("Emma171819");
      // cy.get("#login-button").click();

      cy.login({ username: "hcruz", password: "Emma171819" });
    });

    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("#new-note").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });

    describe("and a note exists", function () {
      beforeEach(function () {
        // cy.contains("new note").click();
        // cy.get("input").type("another note cypress");
        // cy.contains("save").click();
        cy.createNote({
          content: "another note cypress",
          important: false,
        });
      });

      it("it can be made important", function () {
        cy.contains("another note cypress").contains("make important").click();

        cy.contains("another note cypress").contains("make not important");
      });
    });

    describe("and several notes exist", function () {
      beforeEach(function () {
        cy.createNote({ content: "first note", important: false });
        cy.createNote({ content: "second note", important: false });
        cy.createNote({ content: "third note", important: false });
      });

      it("one of those can be made important", function () {
        cy.contains("second note").contains("make important").click();

        cy.contains("second note").contains("make not important");
      });

      // cuando el componente es hijo
      // it.only("other of those can be made important", function () {
      //   cy.contains("second note").parent().find("button").as("theButton");
      //   cy.get("@theButton").click();
      //   cy.get("@theButton").should("contain", "make not important");
      // });
    });
  });

  describe("Example using the promises", () => {
    it("then example", function () {
      cy.get("button").then((buttons) => {
        console.log("number of buttons", buttons.length);
        cy.wrap(buttons[0]).click();
      });
    });
  });
});
