describe('Shifts', () => {
  it('should navigate to shifts page', () => {
    // TODO: locations to other file
    cy.visit('http://localhost:3000/shifts')

    cy.get('h1').contains('Shift App')
  })

  // TODO: Move Ids to test ids file
  it('should appear the timer and change to end shift after starting a shift', () => {
    cy.get('#shift-action-button').contains('Start shift')
    cy.get('#shift-action-button').click()

    cy.get('#timer').should('be.visible')
    cy.get('#shift-action-button').contains('End shift')
    cy.get('#shift-action-button').click()
  })
})