// Cypress end-to-end test for TripForge

describe('TripForge UI Smoke Test', () => {
  it('creates an itinerary and saves it', () => {
    // Visit the app (on port 3002 as seen in terminal)
    cy.visit('http://localhost:3002');

    // --- STEP 1 ---
    cy.get('[data-testid="destination-input"]').type('Paris, France');
    cy.get('[data-testid="start-date-input"]').type('2024-09-01');
    cy.get('[data-testid="end-date-input"]').type('2024-09-07');
    cy.get('[data-testid="continue-button"]').click();

    // --- STEP 2 ---
    cy.get('[data-testid="interest-history"]').click();
    cy.get('[data-testid="interest-food"]').click();
    cy.get('[data-testid="continue-button"]').click();

    // --- STEP 3 ---
    cy.get('[data-testid="budget-moderate"]').click();
    cy.get('[data-testid="submit-trip-button"]').click();

    // --- LOADING & RESULT ---
    // Check loading indicator (LoadingScreen) - using case-insensitive contains
    cy.contains(/Forging Your Trip/i).should('exist');

    // Wait for the itinerary view to appear (increase timeout for AI generation)
    cy.get('[data-testid="itinerary-view"]', { timeout: 30000 }).should('be.visible');

    // Save the trip
    cy.contains('Save Trip').click();

    // Verify localStorage persistence
    cy.window().then((win) => {
      const saved = JSON.parse(win.localStorage.getItem('tripforge_saved_trips') || '[]');
      expect(saved).to.have.length.greaterThan(0);
    });
  });
});
