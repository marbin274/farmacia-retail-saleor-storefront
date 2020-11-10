let BasePage = {
  visit(options) {
    cy.visit(this.constructor.url, options)
  }
}

export default BasePage