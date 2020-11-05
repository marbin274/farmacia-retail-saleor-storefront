let BasePage = {
  visit() {
    cy.visit(this.constructor.url)
  }
}

export default BasePage