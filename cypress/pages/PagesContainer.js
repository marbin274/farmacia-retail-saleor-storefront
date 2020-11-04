import  HomePage from "./HomePage"
import SearchResultsPage from "./SearchResultsPage"

class PagesContainer {

  static pages = {
    HomePage: HomePage,
    SearchResultsPage: SearchResultsPage
  }

  static currentPage = 'HomePage'

  static getPage(name) {
    this.currentPage = name;
    return new this.pages[name]();
  }

  static getCurrentPage() {
    return new this.pages[this.currentPage]()
  }

  static isCurrentPage(name) {
    let b = cy.url().should('include', this.pages[name].url);
    b && (this.currentPage = name);
    return b
  }
}

export default PagesContainer;