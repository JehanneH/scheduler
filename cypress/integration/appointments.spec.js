describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/");
    cy.contains("Monday");
  })
  it("should book an interview", () => {
    
    
    // clicks the add button for the empty appointment
    cy.get("[alt=Add]")
      .first()
      .click()

    // types in a student name
    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    // clicks the specified interviewer
    cy.get("[alt='Sylvia Palmer']")
      .click();

    // clicks save
    cy.contains("Save")
      .click();
    
    // checks if the student name and interviewer selected exist
    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Sylvia Palmer");
  });
  
});