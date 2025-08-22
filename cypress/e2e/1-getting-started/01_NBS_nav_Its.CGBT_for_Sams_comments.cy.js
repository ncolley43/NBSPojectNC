describe('Sams Homework', () => {
  beforeEach(() => {
    Cypress.config('pageLoadTimeout', 60000);
    cy.visit('https://login.thenbs.com/auth/login');

    // Login
    cy.get('#Identification_Email').type('col43@hotmail.com');
    cy.get('.submit-button').click();
    cy.get('#Authentication_Password').type('3l3phanT1$$');
    cy.get('#nextButton').click();

    // Navigate to main page
    cy.visit('https://source.thenbs.com');

    // Handle cookies and search for Dyson
    cy.origin('https://source.thenbs.com', () => {
      cy.contains('button', 'Accept All Cookies', { timeout: 10000 }).click();
      cy.get('[data-cy="searchFieldSearch"]').first().type('Dyson');
      cy.contains("Dyson", { timeout: 10000 }).should('be.visible').click();
    });
  });

  it('1 - Verifies the manufacturers homepage URL contains expected text', () => {
    cy.origin('https://source.thenbs.com', () => {
      cy.url().should('include', '/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
    });
  });

  it('2 - Verifies the telephone link has correct number, protocol, and href', () => {
    cy.origin('https://source.thenbs.com', () => {
      cy.contains('08003457788', { timeout: 10000 }).should('be.visible');
      cy.get('a[title="Call 08003457788"]').should('be.visible')
        .and('have.attr', 'href', 'tel:08003457788');
    });
  });

  it('3 - Verifies the h1 title text is as expected', () => {
    cy.origin('https://source.thenbs.com', () => {
      cy.get('h1').should('contain.text', 'Dyson');
    });
  });

  it('4 - Verifies the Source logo href attribute', () => {
    cy.origin('https://source.thenbs.com', () => {
      cy.get('a.brand-primary.wrapper').should('have.attr', 'href', '/');
    });
  });

  it('5 - Verifies the external manufacturer link contains correct URL and opens in new tab', () => {
    cy.origin('https://source.thenbs.com', () => {
      cy.get('a[title="Visit https://www.dyson.co.uk/commercial/overview/architects-designers"]')
        .should('have.attr', 'href', 'https://www.dyson.co.uk/commercial/overview/architects-designers')
        .and('have.attr', 'target', '_blank');
    });
  });

  it('6 - Verifies the Contact manufacturer button text', () => {
    cy.origin('https://source.thenbs.com', () => {
      cy.get('.mdc-button__label').should('contain.text', 'Contact manufacturer');
    });
  });

  it('7 - Verifies the Overview tab name and URL', () => {
    cy.origin('https://source.thenbs.com', () => {
      cy.get('a[data-cy="overviewTab"]')
        .should('be.visible')
        .and('have.attr', 'href', 'https://source.thenbs.com/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
    });
  });
});
