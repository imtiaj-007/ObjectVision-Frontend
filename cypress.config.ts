import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        baseUrl: 'http://localhost:3000',
        specPattern: 'cypress/e2e/**/*.cy.{js,ts,jsx,tsx}',
        supportFile: 'cypress/support/e2e.ts',
    },
    component: {
        devServer: {
            framework: 'next',
            bundler: 'webpack',
        },
        specPattern: 'cypress/components/**/*.cy.{js,ts,jsx,tsx}',
        supportFile: 'cypress/support/component.ts',
        indexHtmlFile: 'cypress/support/component-index.html'
    }
});
