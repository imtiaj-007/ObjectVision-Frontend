# Testing Guide

## Table of Contents
1. [Test Types](#test-types)
2. [Running Tests](#running-tests)
3. [Test Coverage](#test-coverage)
4. [Writing New Tests](#writing-new-tests)
5. [Best Practices](#best-practices)
6. [CI/CD Integration](#cicd-integration)

## Test Types

### Unit Tests
- **Purpose**: Test individual components/functions in isolation
- **Location**: `src/__tests__/`
- **Examples**:
  - Form validation logic
  - Utility functions
  - Redux actions/reducers
  - Custom hooks
- **Tools**: Jest, React Testing Library

### Component Tests
- **Purpose**: Test React components and their interactions
- **Location**: `src/__tests__/components/`
- **Examples**:
  - Login page rendering
  - Button click handlers
  - Form submissions
  - Error states
- **Tools**: Jest, React Testing Library

### Integration Tests
- **Purpose**: Test how components work together
- **Location**: `cypress/e2e/`
- **Examples**:
  - Auth flow (login → dashboard)
  - Form submissions with API calls
  - Navigation between pages
- **Tools**: Cypress

### E2E Tests
- **Purpose**: Test complete user flows
- **Location**: `cypress/e2e/`
- **Examples**:
  - Full authentication flow
  - Critical user journeys
  - Cross-page interactions
- **Tools**: Cypress

## Running Tests

### Local Development
- **Unit/Component Tests**: 
  ```bash
  npm test
  ```
- **Integration/E2E Tests**:
  ```bash
  npm run test:e2e
  ```
- **Watch Mode**:
  ```bash
  npm test -- --watch
  ```
- **Specific Test File**:
  ```bash
  npm test path/to/test/file.test.tsx
  ```

### CI Environment
- Runs all test suites automatically
- Generates coverage reports
- Fails build on test failures
