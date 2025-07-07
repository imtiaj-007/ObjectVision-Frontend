describe('Login Page', () => {
    beforeEach(() => {
        // Visit the login page before each test
        cy.visit('/auth/login');
    });

    it('should display the login form', () => {
        // Assert that the form elements are visible
        cy.get('input[name="user_key"]').should('exist');
        cy.get('input[name="password"]').should('exist');
        cy.get('button[type="submit"]').should('contain', 'Sign In');
    });

    it('should show validation errors for empty fields', () => {
        // Submit the form without filling anything
        cy.get('button[type="submit"]').click();

        // Check for validation messages
        cy.contains('Email or username is required').should('be.visible');
        cy.contains('Password is required').should('be.visible');
    });

    it('should show validation errors for invalid inputs', () => {
        // Test invalid email format
        cy.get('input[name="user_key"]').type('invalid.com@email').blur();
        cy.contains('Must be a valid email address or username with at least 3 characters').should('be.visible');

        // Test short username
        cy.get('input[name="user_key"]').clear().type('ab').blur();
        cy.contains('Must be a valid email address or username with at least 3 characters').should('be.visible');

        // Test short password
        cy.get('input[name="password"]').type('123').blur();
        cy.contains('Password must be at least 8 characters').should('be.visible');

        // Clear inputs and verify errors disappear
        cy.get('input[name="user_key"]').clear().blur();
        cy.get('input[name="password"]').clear().blur();
        cy.contains('Must be a valid email address or username with at least 3 characters').should('not.exist');
        cy.contains('Password must be at least 8 characters').should('not.exist');
    });

    it('should log in successfully with valid credentials', () => {
        // Mock API response for successful login
        cy.intercept('POST', '/api/v1/auth/login', {
            statusCode: 200,
            body: { access_token: 'fake-token' },
        }).as('loginRequest');

        // Fill and submit the form
        cy.get('input[name="user_key"]').type('test@example.com');
        cy.get('input[name="password"]').type('password123');
        cy.get('button[type="submit"]').click();

        // Wait for the mock API call and assert redirect
        cy.wait('@loginRequest');
        cy.url().should('include', '/user/dashboard');
    });

    it('should show an error for invalid credentials', () => {
        // Mock API response for failed login
        cy.intercept('POST', '/api/v1/auth/login', {
            statusCode: 401,
            body: { message: 'invalid credentials' },
        }).as('loginRequest');

        // Fill and submit the form
        cy.get('input[name="user_key"]').type('wrong@example.com');
        cy.get('input[name="password"]').type('wrongpassword');
        cy.get('button[type="submit"]').click();

        // Check for error toast/message
        cy.contains('invalid credentials').should('be.visible');
    });
});