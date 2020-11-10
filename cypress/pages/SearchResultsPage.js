import BasePage from "./BasePage";
import ProductItem from "./ProductItem";

export default class SearchResultsPage {
  static url = '/search'

  constructor() {
    Object.assign(this, BasePage)
  }

  searchProduct(index) {
    let productItem = cy.get(`.sc-ekulBa a:nth-child(${index})`)
    return new ProductItem(productItem)
  }

  addToCartProduct(index) {
    return this.searchProduct(index).addToCart()
  }
}