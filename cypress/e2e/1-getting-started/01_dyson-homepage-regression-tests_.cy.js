describe('Dyson Manufacturer Page Tests', () => {
  beforeEach(() => {
    // Navigate to the main website
    cy.visit('https://source.thenbs.com');
    
    // Handle cookie consent popup if it appears
    cy.get('body').then(($body) => {
      if ($body.find('button:contains("Accept All Cookies")').length > 0) {
        cy.contains('button', 'Accept All Cookies', { timeout: 5000 }).click();
      }
    });
    
    // Search for Dyson
    cy.get('[data-cy="searchFieldSearch"]')
      .first()
      .should('be.visible')
      .clear()
      .type('Dyson');
    
    // Click on Dyson in search results
    cy.contains('Dyson', { timeout: 10000 })
      .should('be.visible')
      .click();
  });
 
  it('should verify the manufacturer homepage URL is correct', () => {
    // Check that we're redirected to the correct Dyson manufacturer overview page
    cy.url({ timeout: 15000 })
      .should('eq', 'https://source.thenbs.com/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
  });
 
  it('should verify the telephone link has correct attributes', () => {
    // Check that the phone number is visible
    cy.contains('08003457788', { timeout: 10000 })
      .should('be.visible');
    
    // Verify the phone link has correct href and attributes
    cy.get('a[title="Call 08003457788"]', { timeout: 10000 })
      .should('be.visible')
      .and('have.attr', 'href', 'tel:08003457788');
  });
 
  it('should verify the h1 title contains Dyson', () => {
    // Check that the main heading contains "Dyson"
    cy.get('h1', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Dyson');
  });
 
  it('should verify the Source logo href attribute', () => {
    // Verify the Source logo links to the homepage
    cy.get('a.brand-primary.wrapper', { timeout: 10000 })
      .should('be.visible')
      .and('have.attr', 'href', '/');
  });
 
  it('should verify the external manufacturer link is correct', () => {
    // Check external link to Dyson's official website
    cy.get('a[action="Visit https://www.dyson.co.uk/commercial/overview/architects-designers"]', { timeout: 10000 })
      .should('be.visible')
      .and('have.attr', 'href', 'https://www.dyson.co.uk/commercial/overview/architects-designers')
      .and('have.attr', 'target', '_blank');
  });
 
  it('should verify the contact manufacturer button text', () => {
    // Check contact button text
    cy.get('.mdc-button__label', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Contact manufacturer');
  });
 
  it('should verify the Overview tab name and URL', () => {
    // Verify Overview tab
    cy.get('a[data-cy="overviewTab"]', { timeout: 10000 })
      .should('be.visible')
      .and('have.attr', 'href', '/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
  });
 
  it('should verify all navigation tabs are present with correct URLs', () => {
    // Check that all required tabs are present
    cy.get('.mat-mdc-tab-links', { timeout: 10000 })
      .should('be.visible')
      .and('contain.text', 'Overview')
      .and('contain.text', 'Products')
      .and('contain.text', 'Case studies')
      .and('contain.text', 'Literature')
      .and('contain.text', 'Certifications')
      .and('contain.text', 'About');

    // Verify each tab's href attribute
    const tabTests = [
      { selector: '[data-cy="overviewTab"]', href: '/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview' },
      { selector: '[data-cy="productsTab"]', href: '/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/products' },
      { selector: '[data-cy="certificatesTab"]', href: '/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/third-party-certifications' },
      { selector: '[data-cy="literatureTab"]', href: '/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/literature' },
      { selector: '[data-cy="caseStudiesTab"]', href: '/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/case-studies' },
      { selector: '[data-cy="aboutTab"]', href: '/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/about' }
    ];

    tabTests.forEach((tab) => {
      cy.get(tab.selector, { timeout: 10000 })
        .should('be.visible')
        .and('have.attr', 'href', tab.href);
    });
  });
});