describe('Sams Homework', () => {
  beforeEach(() => {
    // Set page load timeout for all tests
    Cypress.config('pageLoadTimeout', 60000);
  
    cy.visit('https://source.thenbs.com');
    
    // Accept cookies and search for Dyson (common setup for most tests)
    cy.contains('button', 'Accept All Cookies').click();
    cy.get('[data-cy="searchFieldSearch"]').first().type('Dyson');
    cy.contains("Dyson", { timeout: 40000 })
      .should('be.visible', { timeout: 40000 })
      .click();
  });

  it('1 - Verify the manufacturers homepage URL contains expected text:', () => {
    cy.url({ timeout: 15000 }).should('eq', 'https://source.thenbs.com/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
  });

  it('2 - I verify the telephone link has the correct number, protocol and href', () => {
    cy.contains('08003457788', { timeout: 40000 }).should('be.visible');
    cy.get('a[title="Call 08003457788"]', { timeout: 40000 })
      .should('be.visible')
      .and('have.attr', 'href', 'tel:08003457788');
  });

  it('3 - I verify the h1 title text on page is as expected', () => {
    cy.contains('h1', 'Dyson', { timeout: 40000 }).should('be.visible');
  });

  it('4 - I verify the href attribute of the Source logo is as expected', () => {
    // Navigate back to main page first since this test doesn't need Dyson search
    cy.visit('https://source.thenbs.com');
    cy.get('a.brand-primary.wrapper', { timeout: 40000 })
      .should('be.visible')
      .and('have.attr', 'href', '/');
  });

  it('5 - I verify the external manufacturer link attribute contains the correct url', () => {
    cy.get('a[title="Visit https://www.dyson.co.uk/commercial/overview/architects-designers"]', { timeout: 40000 })
      .should('be.visible')
      .and('have.attr', 'href', 'https://www.dyson.co.uk/commercial/overview/architects-designers')
      .and('have.attr', 'target', '_blank');
  });

  it('6 - I verify the contact manufacturer button shows the correct text', () => {
    cy.get('.mdc-button__label', { timeout: 40000 })
      .should('be.visible')
      .and('contain', 'Contact manufacturer');
  });

  it('7 - I verify the Overview tab name and URL', () => {
    cy.get('a[data-cy="overviewTab"]', { timeout: 40000 })
      .should('be.visible')
      .and('have.attr', 'href', '/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
  });

  it('8 - Verifies the Dyson navigation bar has the correct tabs', () => {
    // This test uses different credentials, so we need custom login
    cy.visit('https://source.thenbs.com');
    
    cy.contains('button', 'Accept All Cookies').click();
    cy.get('[data-cy="searchFieldSearch"]').first().type('Dyson');
    cy.contains("Dyson", { timeout: 40000 })
      .should('be.visible', { timeout: 40000 })
      .click();
    
    const expectedTabs = [
      'Overview',
      'Products',
      'Certifications',
      'Literature',
      'Case studies',
      'About us'
    ];

    cy.get('nav.mat-mdc-tab-nav-bar .mdc-tab__text-label').then($labels => {
      const actualTabs = [...$labels].map(el => el.textContent.trim());
      expect(actualTabs).to.deep.equal(expectedTabs);
    });
  });
});;