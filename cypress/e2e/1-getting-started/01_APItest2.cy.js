describe('Geolocation API Tests', () => {
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
  it('should validate geolocation response and region button', () => {
    cy.request({
      method: 'GET',
      url: 'https://geolocation.onetrust.com/cookieconsentpub/v1/geo/location',
      failOnStatusCode: false
    }).then((response) => {
      // The response is like: jsonFeed({...});
      const match = response.body.match(/jsonFeed\((.*)\);?/);
      if (!match) {
        throw new Error('Unexpected response format');
      }
      const body = JSON.parse(match[1]);
 
      // Check that the API response contains the correct country (GB or US)
      expect(['US', 'GB']).to.include(body.country);
 
      // Now check that "UK" is present in the DOM, even if hidden
      cy.get('button[aria-label="Choose region"]')
        .should('exist')
        .invoke('text')
        .should('contain', 'UK');
    });
  });
});