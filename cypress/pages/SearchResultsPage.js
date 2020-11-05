import BasePage from "./BasePage";

export default class SearchResultsPage {
  static url = '/search'

  constructor() {
    Object.assign(this, BasePage)
  }

  searchProduct(index) {
    return cy.get(`.sc-fihHvN.ivCQaN a:nth-child(${index})`)
  }
}