import  HomePage from "./HomePage"
import SearchResultsPage from "./SearchResultsPage"
import ProductDetailPage from "./ProductDetailPage";

class PagesContainer {

  static pages = {
    HomePage: HomePage,
    SearchResultsPage: SearchResultsPage,
    ProductDetailPage: ProductDetailPage
  }

  static defaultFunction = {
    get : (target, prop) => {
      if(target[prop] === undefined) {
        prop = prop.split('#')
        if(prop.length === 2) return () => {return target[prop[0]](prop[1])}
        return () => {return cy.get(`*:contains('${prop}'):last`)}
      } else {
        return target[prop];
      }
    }
  }

  static currentPage = 'HomePage'

  static getPage(name) {
    this.currentPage = name;
    return new Proxy(new this.pages[name](), this.defaultFunction);
  }

  static getCurrentPage() {
    return new Proxy(new this.pages[this.currentPage](), this.defaultFunction)
  }

  static isCurrentPage(name) {
    let b = cy.url().should('include', this.pages[name].url);
    b && (this.currentPage = name);
    return b
  }
}

export default PagesContainer;