const { checkAndSkipSurvey } = require("./nbs-homepage");

// Page Object Model for the Dyson manufacturer page on NBS Source
class DysonHomepage {
  // Selectors for elements on the Dyson page
  dysonHeader = "h1"; // Selector for the main page header (H1)
  contactNumber = '[action="telephone"]'; // Selector for the contact number link
  

  // Actions
  //-------------
  // 1 - Verifies that the current URL and page header are correct for Dyson
  verifyDysonPage(expectedUrlPart, expectedHeaderText) {
    // If an expected URL segment is provided, verify it. Otherwise skip.
    if (expectedUrlPart) {
      cy.url().should("include", expectedUrlPart);
    }

    // If an expected header text is provided, verify it. Otherwise skip.
    if (expectedHeaderText) {
      cy.get(this.dysonHeader, { timeout: 10000 })
        .invoke("text")
        .then((t) => t.trim())
        .should("eq", expectedHeaderText);
    }
  }

  // 2 -Verifies the contact number link is visible, has correct text, and correct tel: protocol
  verifyContactNumber(data) {
    cy.get(this.contactNumber, { timeout: 10000 })
      .should("be.visible")
      // The UI contains non-breaking spaces (\u00a0). Normalize and trim before comparing.
      .invoke("text")
      .then((txt) => txt.replace(/\u00a0/g, " ").trim())
      .should("eq", data.contactNumber);

    // Additionally, verify the href uses the correct telephone protocol, i.e. tel:
    // Strip any stray whitespace in the href before comparing, just in case.
    cy.get(this.contactNumber)
      .should("have.attr", "href")
      .then((href) => {
        const normalizedHref = href.replace(/\s+/g, "");
        expect(normalizedHref).to.eq(`tel:${data.contactNumber}`);
      });
  }
  // 3- Verifies the title on the page is as expected
  verifyTitle() {
    cy.title().should('eq', 'Dyson | Overview | NBS BIM Library');
  }

 

// Export a singleton instance of the DysonHomepage class
}


module.exports = new DysonHomepage();