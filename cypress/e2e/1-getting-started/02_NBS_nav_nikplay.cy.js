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
      cy.contains("Dyson", { timeout: 10000 })
        .should('be.visible')
        .click();
      cy.url().should('eq', 'https://source.thenbs.com/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview');
      cy.contains('08003457788').should('be.visible');
      cy.contains('a', "I'm a manufacturer")
        .should('have.attr', 'href', 'https://manufacturers.thenbs.com/nbs-source');
      //cy.contains("I'm a manufacturer").click();

     cy.get('a[title="Visit LinkedIn"]')
        .should('be.visible')
       // //.and('have.attr', 'href', 'https://www.linkedin.com/company/dyson/')
       // //.and('have.attr', 'target', '_blank');

      
    });
  });
});