class HomePage {

  visit() {
    cy.visit('/')
  }

  buttonSearch() {
    return cy.get('.main-menu__search')
  }

  fieldSearch() {
    return cy.get('form.search input')
  }

  submitSearch() {
    cy.get("form.search button[type='submit']").click({force: true});
  }

  searchProduct(index) {
    return cy.get(`.search__products > ul > :nth-child(${index})`)
  }
}

export default HomePage;