/// <reference types="cypress" />

class NBSHomepage {
    // Selectors as class properties
    acceptCookiesButton = 'button'; // Selector for the Accept Cookies button
    searchField = '[data-cy="searchFieldSearch"]'; // Selector for the homepage search input field
    skipButton = '.css-15a5wy5'; // Selector for the "Skip" button on the survey pop-up

     //Actions
     //-------------
    // Clicks the 'Accept All Cookies' button on the homepage
    acceptCookies() {
        cy.contains(this.acceptCookiesButton, 'Accept All Cookies').click();
    }

    // Types the provided search term into the homepage search field
    searchFor(term) {
        // Dismiss any survey overlay if it appears
        this.checkAndSkipSurvey();

        cy.get(this.searchField, { timeout: 10000 })
            .first()
            .should('exist')
            .should('be.visible')
            .should('not.be.disabled')
            .scrollIntoView()
            .click()
            .clear()
            // Add an explicit timeout to the type to handle slow renders/focus
            .type(term, { timeout: 10000 })
            .should('have.value', term);
    }

    // Selects a result from the search results by visible text (value passed in from step)
    selectDysonResult(resultText) {
        this.checkAndSkipSurvey(); // Check if the survey "Skip" button is present and click it if it exists
        cy.contains(resultText, { timeout: 10000 }).should('be.visible').click();
    }

    // Navigate to a provided URL (value should be supplied by the step, not read here)
    visitURL(url) {
        cy.visit(url);
        cy.wait(1000); // Wait for 1 second
        cy.setSurveyDismissFlags(); // call custom command
    }

    // Check that the survey "Skip" button is present and click it if it exists
    //       { timeout: 10000 }; // Increase the timeout to 10 seconds
    checkAndSkipSurvey() {
        cy.get('body').then($body => {
            if ($body.find(this.skipButton).length > 0) {   // Check if the Skip button exists i.e. > 0
                cy.get(this.skipButton).click();            // and if it does, then click it
            }
        });
    }
}

// Export a singleton instance of the NBSHomepage class
module.exports = new NBSHomepage();