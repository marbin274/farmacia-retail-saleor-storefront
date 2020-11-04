export default class SearchResultsPage {
  static url = '/search'

  visit() {
    cy.visit(url)
  }

  searchProduct(index) {
    return cy.get(`.sc-fihHvN.ivCQaN a:nth-child(${index})`)
  }
}