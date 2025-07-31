describe('Accessibility tests', () => {
  it('Has no detectable a11y violations on load', () => {
    cy.visit('https://source.thenbs.com/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview')
    cy.injectAxe()
    cy.checkA11y()
  })

  it('Has no a11y violations after interaction', () => {
    cy.visit('https://source.thenbs.com/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview')
    cy.injectAxe()
    
    // Interact with the page
    cy.get('[data-cy="button"]').click()
    
    // Check accessibility again
    cy.checkA11y()
  })
})