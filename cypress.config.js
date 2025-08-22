const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Custom task for logging
      on('task', {
        log(message) {
          console.log(message);
          return null; // always return something from a task
        },
      });
      
      // implement other node event listeners here
    },
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'https://source.thenbs.com',
    // Optional: Add other useful e2e configurations
    viewportWidth: 1280,
    viewportHeight: 720,
    video: false, // Set to true if you want video recording
    screenshotOnRunFailure: true,
  },
});