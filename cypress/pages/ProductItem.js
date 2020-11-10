export default class ProductItem {

  constructor(element) {
    this.element = element
  }

  click() {
    this.element.click()
  }

  addToCart() {
    return this.element.focus().children("div").children(".sc-bnXvFD")
  }

  item() {
    return this.element
  }
}