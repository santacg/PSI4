const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    viewportHeight: 1080,
    viewportWidth: 1920,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    // append baseUrl to all URL used in the tests
    baseUrl: "http://localhost:5173",
    //specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    supportFile: 'cypress/support/commands.js',
  },
  // centralice some variables as username and password
  // use then in the test with "Cypress.env('username')"
  env: {
    username: "user1@example.com",
    username2: "user2@example.com",
    password: "sacacorchos",
    TEST_BOARD_SIZE_PX: 675.44 
  }
});

