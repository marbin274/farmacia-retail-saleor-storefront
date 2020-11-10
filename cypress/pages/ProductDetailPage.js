import BasePage from "./BasePage";

export default class ProductDetailPage {
  static url = '/product'

  constructor() {
    Object.assign(this, BasePage)
  }
}