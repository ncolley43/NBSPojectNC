// 7- I run accessibility checks on the manufacturer homepage using AXE plugin and report results to console
it('7- verify accessibility on manufacturer homepage using Axe plugin', () => {

    cy.visit('https://source.thenbs.com/')

    cy.contains('button', 'Accept All Cookies').click();

    cy.get('[data-cy="searchFieldSearch"]').first().type('Dyson');

    cy.contains('Dyson', { timeout: 10000 }).should('be.visible').click();

    // Wait for page to fully load after navigation
    cy.url().should('include', 'dyson');
    
    // Inject axe-core into the page
    cy.injectAxe();
    
    // Run accessibility checks with proper error handling
    cy.checkA11y(null, {
        // Configure axe options if needed
        includedImpacts: ['minor', 'moderate', 'serious', 'critical']
    }, (violations) => {
        // Only log if there are violations
        if (violations.length > 0) {
            // Log summary
            cy.log(`Found ${violations.length} accessibility violations`);
            
            violations.forEach((violation) => {
                // Safely handle node targets
                const targets = violation.nodes.map(node => 
                    Array.isArray(node.target) ? node.target.join(' ') : node.target
                ).join(', ');
                
                // Create detailed log entry
                Cypress.log({
                    name: 'a11y violation',
                    displayName: 'A11Y',
                    message: `[${violation.id}] ${violation.help}`,
                    consoleProps: () => ({
                        'Violation ID': violation.id,
                        'Impact': violation.impact,
                        'Help': violation.help,
                        'Help URL': violation.helpUrl,
                        'Description': violation.description,
                        'Nodes': violation.nodes.length,
                        'Targets': targets,
                        'Full Details': violation
                    })
                });
                
                // Log to browser console as well
                cy.window().then((win) => {
                    win.console.group(`🚨 A11Y Violation: ${violation.id}`);
                    win.console.log('Impact:', violation.impact);
                    win.console.log('Help:', violation.help);
                    win.console.log('Description:', violation.description);
                    win.console.log('Affected elements:', violation.nodes.length);
                    win.console.log('Help URL:', violation.helpUrl);
                    win.console.groupEnd();
                });
            });
        } else {
            cy.log('✅ No accessibility violations found');
        }
    });
});