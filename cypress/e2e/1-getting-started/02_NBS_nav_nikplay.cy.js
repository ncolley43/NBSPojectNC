describe('thenbs login test', () => {
  it('logs in the nbs and navigates', () => {
    cy.visit('https://login.thenbs.com/auth/login');
    cy.get('#Identification_Email').type('col43@hotmail.com');
    cy.get('.submit-button').click();
    cy.get('#Authentication_Password').type('3l3phanT1$$');
    cy.get('#nextButton').click();
    cy.visit('https://source.thenbs.com');

    cy.origin('https://source.thenbs.com', () => {
      cy.contains('button', 'Accept All Cookies').click();
      cy.get('[data-cy="searchFieldSearch"]').first().type('Dyson');
      cy.contains("Dyson",{timeout:10000})
        .should('be.visible',{timeout:10000})
        .click();
        cy.url().should('eq', 'https://source.thenbs.com/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
        cy.contains('08003457788').should('be.visible');
//Test

      // 1 - Verify the manufacturers homepage URL contains expected text:
      cy.url({ timeout: 15000 }).should('eq', 'https://source.thenbs.com/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');

      // 2 - I verify the telephone link has the correct number, protocol and href:
      cy.contains('08003457788', { timeout: 10000 }).should('be.visible');
      cy.get('a[title="Call 08003457788"]', { timeout: 10000 })
        .should('be.visible')
        .and('have.attr', 'href', 'tel:08003457788');

      // 3 - I verify the h1 title text on page is as expected
      cy.contains('h1', 'Dyson', { timeout: 10000 }).should('be.visible');

      // 4 - I verify the href attribute of the Source logo is as expected
      cy.get('a.brand-primary.wrapper', { timeout: 10000 })
        .should('be.visible')
        .and('have.attr', 'href', '/');

      // 5 - I verify the external manufacturer link attribute contains the correct url
      cy.get('a[title="Visit https://www.dyson.co.uk/commercial/overview/architects-designers"]', { timeout: 10000 })
        .should('be.visible')
        .and('have.attr', 'href', 'https://www.dyson.co.uk/commercial/overview/architects-designers')
        .and('have.attr', 'target', '_blank');

      // 6 - I verify the contact manufacturer button shows the correct text
      cy.get('.mdc-button__label', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'Contact manufacturer');

      // 7 - I verify the Overview tab name and URL
      cy.get('a[data-cy="overviewTab"]', { timeout: 10000 })
        .should('be.visible')
        .and('have.attr', 'href', '/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview')
        .within(() => {
          cy.get('.mdc-tab__text-label', { timeout: 10000 }).should('have.text', ' Overview ');
        });
    });
  });
});