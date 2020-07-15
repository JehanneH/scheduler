describe("Appointments", () => {
  beforeEach(() => {
    cy.request("GET", "/api/debug/reset");
    cy.visit("/");
    cy.contains("Monday");
  })
  it("should book an interview", () => {
    
    // clicks the add button for the empty appointment
    cy.get("[alt=Add]")
      .first()
      .click();

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
  
  it('should edit an interview', () => {

    // get edit button and click
    cy.get("[alt=Edit]")
      .first()
      .click({ force: true });

    // click specified interviewer
    cy.get("[alt='Tori Malcolm']")
      .click();

    
    // clear previous student name and type new one
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Jehanne");
    
    // save edited interview info
    cy.contains("Save")
      .click();

    // checks if the student name and interviewer selected exist
    cy.contains(".appointment__card--show", "Jehanne");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it('should cancel an interview', () => {

    // get edit button and click
    cy.get("[alt=Delete]")
      .first()
      .click({ force: true });

    // click confirm
    cy.contains("Confirm")
      .click();

    // check if deleting status exists
    cy.contains("deleting").should("exist");
    // then when it's completed and deleted it should not exist
    cy.contains("deleting").should("not.exist");

    // once deleted the appointment should not exist
    cy.contains(".appointment__card--show", "Archie Cohen")
      .should("not.exist");
  })
});