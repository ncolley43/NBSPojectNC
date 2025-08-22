describe('Sams Homework', () => {
  beforeEach(() => {
    // Set page load timeout for all tests to 60 seconds (1 minute)
    Cypress.config('pageLoadTimeout', 60000);
    // Navigate to the main website
    cy.visit('https://source.thenbs.com');
    // Handle cookie consent popup by clicking the accept button
    cy.contains('button', 'Accept All Cookies', { timeout: 20000 }).click();
    // Locate the search field using data-cy attribute and type "Dyson"
    cy.get('[data-cy="searchFieldSearch"]').first().type('Dyson');
    // Wait for "Dyson" to appear in search results, then click on it
    // This navigates to the Dyson manufacturer page
    cy.contains("Dyson", { timeout: 20000 })
      .should('be.visible', { timeout: 20000 })
      .click();
  });
 
  it('1 - Verify the manufacturers homepage URL contains expected text:', () => {
    // Check that after clicking Dyson, we're redirected to the correct manufacturer overview page
    // This verifies the URL routing is working correctly
    cy.url({ timeout: 15000 }).should('eq', 'https://source.thenbs.com/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
  });
 
  it('2 - I verify the telephone link has the correct number, protocol and href', () => {
    // First check that the phone number text is visible on the page
    cy.contains('08003457788', { timeout: 20000 }).should('be.visible');
    // Then verify the actual link element has the correct attributes:
    // - href should use tel: protocol for phone links
    // - title attribute should match for accessibility
    cy.get('a[title="Call 08003457788"]', { timeout: 20000 })
      .should('be.visible')
      .and('have.attr', 'href', 'tel:08003457788');
  });
 
  it('3 - I verify the h1 title text on page is as expected', () => {
    // Check that the main heading (h1) contains "Dyson"
    // This verifies the page title is correctly displaying the manufacturer name
    cy.contains('h1', 'Dyson', { timeout: 20000 }).should('be.visible');
  });
 
  it('4 - I verify the href attribute of the Source logo is as expected', () => {
    // Navigate back to main page first since this test doesn't need Dyson search
    // This test is checking the main site logo functionality
    cy.visit('https://source.thenbs.com');
    // Verify the Source logo link points to the root directory "/"
    // This ensures clicking the logo takes users back to the homepage
    cy.get('a.brand-primary.wrapper', { timeout: 20000 })
      .should('be.visible')
      .and('have.attr', 'href', '/');
  });
 
  it('5 - I verify the external manufacturer link attribute contains the correct url', () => {
    // Check that the external link to Dyson's official website is correctly configured
    // This link should open Dyson's commercial page for architects and designers
    cy.get('a[title="Visit https://www.dyson.co.uk/commercial/overview/architects-designers"]', { timeout: 20000 })
      .should('be.visible')
      .and('have.attr', 'href', 'https://www.dyson.co.uk/commercial/overview/architects-designers')
      .and('have.attr', 'target', '_blank'); // Should open in new tab
  });
 
  it('6 - I verify the contact manufacturer button shows the correct text', () => {
    // Check that the contact button displays the expected text
    // This verifies the UI element is properly labeled for user interaction
    cy.get('.mdc-button__label', { timeout: 20000 })
      .should('be.visible')
      .and('contain', 'Contact manufacturer');
  });
 
  it('7 - I verify the Overview tab name and URL', () => {
    // Verify the Overview tab is present and has the correct URL
    // This checks that the navigation tabs are working correctly
    cy.get('a[data-cy="overviewTab"]', { timeout: 20000 })
      .should('be.visible')
      .and('have.attr', 'href', '/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
  });
 
  it('8 - Verifies the Dyson navigation bar has the correct tabs', () => {
    // This test repeats the setup since it needs to verify navigation structure
    // Navigate to main page and perform search again

    // Define the expected tab names in the correct order
    const expectedTabs = [
      'Overview',
      'Products', 
      'Certifications',
      'Literature',
      'Case studies',
      'About us'
    ];
 
    // Get all tab labels from the navigation bar and compare with expected tabs
    // This verifies that all required tabs are present and in the correct order
    cy.get('nav.mat-mdc-tab-nav-bar .mdc-tab__text-label').then($labels => {
      // Extract text content from each tab element and trim whitespace
      const actualTabs = [...$labels].map(el => el.textContent.trim());
      // Assert that actual tabs match expected tabs exactly
      expect(actualTabs).to.deep.equal(expectedTabs);
    });
  });
});