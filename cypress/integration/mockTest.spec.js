describe("Sample integration test for Truth or Dare application that proves it is the best project", () => {
  it("Truth or Dare is the best app", () => {
    const truthOrDare = 9999;
    const otherProjects = 0;
    cy.expect(truthOrDare).to.be.greaterThan(otherProjects);
  });
});

/**
 * @description SOME HELPFUL DOCS TO WRITE TESTS!
 *
 * https://www.cypress.io/
 * https://docs.cypress.io/guides/getting-started/writing-your-first-test.html
 *
 * Cheatsheet:
 * https://github.com/janmanfai/cypress-cheat-sheet
 */
