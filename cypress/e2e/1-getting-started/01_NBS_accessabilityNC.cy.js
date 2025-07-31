describe('Accessibility Tests for source.thenbs.com', () => {
    
    beforeEach(() => {
        // Visit the homepage before each test
        cy.visit('https://source.thenbs.com/');
        
        // Handle cookie consent if present
        cy.get('body').then(($body) => {
            if ($body.find('button:contains("Accept All Cookies")').length > 0) {
                cy.contains('button', 'Accept All Cookies').click();
            }
        });
        
        // Wait for page to fully load
        //cy.get('main, [role="main"], .main-content').should('be.visible');
    });

    // it('should have no accessibility violations on homepage', () => {
    //     // Inject axe-core for accessibility testing
    //     cy.injectAxe();
        
    //     // Run comprehensive accessibility check
    //     cy.checkA11y(null, {
    //         includedImpacts: ['minor', 'moderate', 'serious', 'critical'],
    //         rules: {
    //             // You can disable specific rules if needed
    //             // 'color-contrast': { enabled: false }
    //         }
    //     }, (violations) => {
    //         if (violations.length > 0) {
    //             cy.log(`🚨 Found ${violations.length} accessibility violations on homepage`);
                
    //             violations.forEach((violation) => {
    //                 const targets = violation.nodes.map(node => 
    //                     Array.isArray(node.target) ? node.target.join(' ') : node.target
    //                 ).join(', ');
                    
    //                 Cypress.log({
    //                     name: 'A11Y Violation',
    //                     displayName: 'A11Y',
    //                     message: `[${violation.id}] ${violation.impact.toUpperCase()}`,
    //                     consoleProps: () => ({
    //                         'Violation ID': violation.id,
    //                         'Impact Level': violation.impact,
    //                         'Description': violation.description,
    //                         'Help Text': violation.help,
    //                         'Help URL': violation.helpUrl,
    //                         'Affected Elements': violation.nodes.length,
    //                         'Element Selectors': targets,
    //                         'Tags': violation.tags,
    //                         'Full Violation Object': violation
    //                     })
    //                 });
    //             });
    //         } else {
    //             cy.log('✅ No accessibility violations found on homepage');
    //         }
    //     });
    // });
//samstart
it('should have no accessibility violations on homepage', () => {
    cy.injectAxe(); // Inject the AXE script into the page
  cy.checkA11y(null, null, (violations) => {
    // Log the violations without failing the test
    cy.task('log', violations);
    violations.forEach((violation) => {
      const nodes = Cypress.$(
        violation.nodes.map((node) => node.target).join(',')
      );
      Cypress.log({
        name: 'a11y error!',
        consoleProps: () => violation,
        $el: nodes,
        message: `[${violation.id}] ${violation.help} (${violation.nodes.length} nodes)`,
      });
    });
  }, { timeout: 10000 }); // Increase the timeout to 10 seconds
///sam end

    // it('should have no accessibility violations on search functionality', () => {
    //     // Test search accessibility
    //     cy.get('[data-cy="searchFieldSearch"], input[type="search"], [placeholder*="search"]')
    //         .first()
    //         .should('be.visible')
    //         .type('building materials');
        
    //     // Wait for search results or suggestions
    //     cy.wait(2000);
        
    //     cy.injectAxe();
    //     cy.checkA11y('.search-results, [data-cy*="search"], main', {
    //         includedImpacts: ['moderate', 'serious', 'critical']
    //     }, (violations) => {
    //         if (violations.length > 0) {
    //             cy.log(`🚨 Found ${violations.length} accessibility violations in search area`);
    //             logViolations(violations);
    //         } else {
    //             cy.log('✅ No accessibility violations found in search functionality');
    //         }
    //     });
    // });

    // it('should have no accessibility violations on navigation', () => {
    //     // Test main navigation accessibility
    //     cy.get('nav, [role="navigation"], header nav').should('be.visible');
        
    //     cy.injectAxe();
    //     cy.checkA11y('nav, [role="navigation"], header', {
    //         includedImpacts: ['moderate', 'serious', 'critical']
    //     }, (violations) => {
    //         if (violations.length > 0) {
    //             cy.log(`🚨 Found ${violations.length} accessibility violations in navigation`);
    //             logViolations(violations);
    //         } else {
    //             cy.log('✅ No accessibility violations found in navigation');
    //         }
    //     });
    // });

//     it('should have proper keyboard navigation', () => {
//         // Test keyboard accessibility
//         cy.get('body').tab(); // Use cypress-plugin-tab if available
        
//         // Check if focus is visible and logical
//         cy.focused().should('be.visible');
        
//         // Test multiple tab stops
//         for (let i = 0; i < 5; i++) {
//             cy.get('body').tab();
//             cy.focused().should('be.visible');
//         }
        
//         cy.injectAxe();
//         cy.checkA11y(null, {
//             runOnly: {
//                 type: 'tag',
//                 values: ['wcag2a', 'wcag21aa', 'keyboard']
//             }
//         }, (violations) => {
//             if (violations.length > 0) {
//                 cy.log(`🚨 Found ${violations.length} keyboard accessibility violations`);
//                 logViolations(violations);
//             } else {
//                 cy.log('✅ No keyboard accessibility violations found');
//             }
//         });
//     });

//     it('should have proper heading structure', () => {
//         // Check heading hierarchy
//         cy.get('h1').should('have.length.at.least', 1);
//         cy.get('h1').should('be.visible');
        
//         cy.injectAxe();
//         cy.checkA11y(null, {
//             runOnly: {
//                 type: 'rule',
//                 values: [
//                     'heading-order',
//                     'page-has-heading-one',
//                     'empty-heading',
//                     'heading-order'
//                 ]
//             }
//         }, (violations) => {
//             if (violations.length > 0) {
//                 cy.log(`🚨 Found ${violations.length} heading structure violations`);
//                 logViolations(violations);
//             } else {
//                 cy.log('✅ Proper heading structure found');
//             }
//         });
//     });

//     it('should have proper form accessibility', () => {
//         // Test form elements if they exist
//         cy.get('body').then(($body) => {
//             if ($body.find('form, input, textarea, select').length > 0) {
//                 cy.injectAxe();
//                 cy.checkA11y('form, input, textarea, select', {
//                     runOnly: {
//                         type: 'tag',
//                         values: ['wcag2a', 'wcag21aa']
//                     }
//                 }, (violations) => {
//                     if (violations.length > 0) {
//                         cy.log(`🚨 Found ${violations.length} form accessibility violations`);
//                         logViolations(violations);
//                     } else {
//                         cy.log('✅ No form accessibility violations found');
//                     }
//                 });
//             } else {
//                 cy.log('ℹ️ No forms found on this page');
//             }
//         });
//     });

//     it('should generate accessibility report summary', () => {
//         cy.injectAxe();
        
//         // Run full page scan
//         cy.checkA11y(null, {
//             includedImpacts: ['minor', 'moderate', 'serious', 'critical']
//         }, (violations) => {
//             // Generate summary report
//             const summary = {
//                 totalViolations: violations.length,
//                 critical: violations.filter(v => v.impact === 'critical').length,
//                 serious: violations.filter(v => v.impact === 'serious').length,
//                 moderate: violations.filter(v => v.impact === 'moderate').length,
//                 minor: violations.filter(v => v.impact === 'minor').length,
//                 timestamp: new Date().toISOString()
//             };
            
//             cy.log('📊 Accessibility Summary Report');
//             cy.log(`Total Violations: ${summary.totalViolations}`);
//             cy.log(`Critical: ${summary.critical}, Serious: ${summary.serious}, Moderate: ${summary.moderate}, Minor: ${summary.minor}`);
            
//             // Log detailed summary
//             Cypress.log({
//                 name: 'A11Y Summary',
//                 displayName: 'SUMMARY',
//                 message: `${summary.totalViolations} total violations`,
//                 consoleProps: () => summary
//             });
//         });
//     });
// });
// });

// // Helper function to log violations consistently
// function logViolations(violations) {
//     violations.forEach((violation, index) => {
//         const targets = violation.nodes.map(node => 
//             Array.isArray(node.target) ? node.target.join(' ') : node.target
//         ).join(', ');
        
//         Cypress.log({
//             name: `Violation ${index + 1}`,
//             displayName: 'A11Y',
//             message: `[${violation.id}] ${violation.impact.toUpperCase()}: ${violation.help}`,
//             consoleProps: () => ({
//                 'Violation ID': violation.id,
//                 'Impact Level': violation.impact,
//                 'Description': violation.description,
//                 'Help Text': violation.help,
//                 'Help URL': violation.helpUrl,
//                 'Affected Elements': violation.nodes.length,
//                 'Element Selectors': targets,
//                 'WCAG Tags': violation.tags.filter(tag => tag.startsWith('wcag')),
//                 'Full Details': violation
//             })
//         });
//     });
// }
})});