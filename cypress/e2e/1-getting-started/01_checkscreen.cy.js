describe('Dyson Manufacturer Overview Page', () => {
  const baseUrl = 'https://source.thenbs.com/manufacturer/dyson/nakAxHWxDZprdqkBaCdn4U/overview';

  beforeEach(() => {
    cy.visit(baseUrl);
    // Wait for page to load completely
    cy.wait(2000);
  });

  context('Page Load and Basic Structure', () => {
    it('should load the page successfully', () => {
      cy.url().should('include', '/manufacturer/dyson/');
      cy.get('body').should('be.visible');
    });

    it('should have the correct page title', () => {
      cy.title().should('contain', 'Dyson');
      cy.title().should('contain', 'Overview');
      cy.title().should('contain', 'NBS BIM Library');
    });

    it('should display the manufacturer name prominently', () => {
      cy.contains('Dyson', { matchCase: false }).should('be.visible');
    });
  });

  context('Header and Navigation', () => {
    it('should have a navigation header', () => {
      cy.get('header, nav, [role="navigation"]').should('exist');
    });

    it('should have breadcrumb navigation', () => {
      cy.get('[data-testid="breadcrumb"], .breadcrumb, nav[aria-label*="breadcrumb"]')
        .should('exist')
        .and('be.visible');
    });

    it('should have search functionality', () => {
      cy.get('input[type="search"], [data-testid="search"], [placeholder*="search" i]')
        .should('exist')
        .and('be.visible');
    });
  });

  context('Main Content - Manufacturer Information', () => {
    it('should display manufacturer overview content', () => {
      cy.contains('Technology for business', { matchCase: false }).should('be.visible');
      cy.contains('Quiet Mark Certification', { matchCase: false }).should('be.visible');
    });

    it('should show manufacturer description', () => {
      cy.contains('solving problems and relentlessly innovating', { matchCase: false })
        .should('be.visible');
    });

    it('should display the Quiet Mark Certification image', () => {
      cy.get('img[alt*="Quiet Mark" i]')
        .should('exist')
        .and('have.attr', 'src')
        .and('not.be.empty');
    });
  });

  context('Product Listings', () => {
    it('should display Dyson Airblade hand dryer products', () => {
      cy.contains('Dyson Airblade™ 9kJ Hand Dryer', { matchCase: false }).should('be.visible');
      cy.contains('Dyson Airblade™ Wash+Dry Tap Hand Dryer', { matchCase: false }).should('be.visible');
      cy.contains('Dyson Airblade™ V Hand Dryer', { matchCase: false }).should('be.visible');
    });

    it('should display product model numbers', () => {
      cy.contains('HU03').should('be.visible');
      cy.contains('WD04').should('be.visible');
      cy.contains('HU02').should('be.visible');
    });

    it('should show Dyson Solarcycle product', () => {
      cy.contains('Dyson Solarcycle™', { matchCase: false }).should('be.visible');
    });
  });

  context('Case Studies and References', () => {
    it('should display case study references', () => {
      cy.contains('The London Eye', { matchCase: false }).should('be.visible');
      cy.contains('Queen Mary, University of London', { matchCase: false }).should('be.visible');
    });

    it('should show partnership case studies', () => {
      cy.contains('Welcome Break', { matchCase: false }).should('be.visible');
      cy.contains('motorway service washrooms', { matchCase: false }).should('be.visible');
    });

    it('should display hospitality case study', () => {
      cy.contains('Rosewood Hotel', { matchCase: false }).should('be.visible');
      cy.contains('Dyson for Hospitality', { matchCase: false }).should('be.visible');
    });
  });

  context('Technical Documentation', () => {
    it('should provide technical specifications', () => {
      cy.contains('Technical Specification', { matchCase: false }).should('be.visible');
    });

    it('should provide operations manual', () => {
      cy.contains('Operations Manual', { matchCase: false }).should('be.visible');
    });

    it('should have technology brochure', () => {
      cy.contains('Technology for Business Brochure', { matchCase: false }).should('be.visible');
    });
  });

  context('Interactive Elements', () => {
    it('should have clickable product links', () => {
      cy.get('a, button, [role="button"]').should('have.length.greaterThan', 0);
    });

    it('should allow interaction with product elements', () => {
      // Check if product items are clickable
      cy.contains('Dyson Airblade™ 9kJ Hand Dryer')
        .parent()
        .should('have.css', 'cursor', 'pointer')
        .or('be.enabled');
    });
  });

  context('Responsive Design', () => {
    it('should be responsive on mobile devices', () => {
      cy.viewport(375, 667); // iPhone SE
      cy.get('body').should('be.visible');
      cy.contains('Dyson').should('be.visible');
    });

    it('should be responsive on tablet devices', () => {
      cy.viewport(768, 1024); // iPad
      cy.get('body').should('be.visible');
      cy.contains('Technology for business').should('be.visible');
    });

    it('should work on desktop', () => {
      cy.viewport(1280, 720);
      cy.get('body').should('be.visible');
      cy.contains('Quiet Mark Certification').should('be.visible');
    });
  });

  context('Accessibility', () => {
    it('should have proper heading structure', () => {
      cy.get('h1, h2, h3, h4, h5, h6').should('exist');
    });

    it('should have alt text for images', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img).should('have.attr', 'alt').and('not.be.empty');
      });
    });

    it('should be keyboard navigable', () => {
      cy.get('body').tab();
      cy.focused().should('exist');
    });
  });

  context('Performance and Loading', () => {
    it('should load key images successfully', () => {
      cy.get('img').each(($img) => {
        cy.wrap($img)
          .should('have.prop', 'naturalWidth')
          .and('be.greaterThan', 0);
      });
    });

    it('should not have broken links in main content', () => {
      cy.get('a[href]').each(($link) => {
        const href = $link.prop('href');
        if (href && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
          cy.request({
            url: href,
            failOnStatusCode: false,
            timeout: 10000
          }).then((response) => {
            expect(response.status).to.be.oneOf([200, 301, 302, 304]);
          });
        }
      });
    });
  });

  context('Data Attributes and Test Hooks', () => {
    it('should check for common data attributes', () => {
      // Check for common test attributes that might be present
      cy.get('[data-testid], [data-cy], [data-test]').then(($elements) => {
        if ($elements.length > 0) {
          cy.log(`Found ${$elements.length} elements with test attributes`);
        }
      });
    });
  });

  context('Content Validation', () => {
    it('should have consistent branding', () => {
      // Check that Dyson branding is consistent throughout
      cy.get('body').then(($body) => {
        const dysonMentions = $body.text().match(/dyson/gi);
        expect(dysonMentions).to.have.length.greaterThan(1);
      });
    });

    it('should display contact or more information options', () => {
      // Look for contact information or "more info" type links
      cy.get('body').should('contain.text', 'contact').or('contain.text', 'more').or('contain.text', 'info');
    });
  });
});