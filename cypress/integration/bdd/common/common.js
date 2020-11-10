import {Before, Given, When, Then} from "cypress-cucumber-preprocessor/steps"
import PagesContainer from "../../../pages/PagesContainer"

Before(()=> {
  Cypress.env('VIEWPORT') && cy.viewport(Cypress.env('VIEWPORT'))
})

Given(/^visits "([^"]*)"$/, function(page, params) {
  let options = params && {qs: params?.hashes()[0]}
  PagesContainer.getPage(page).visit(options);
});
Given(/^a "([^"]*)"$/, function(role) {
  cy.log(`retrieving ${role} information`)
});
When(/^clicks on "([^"]*)"$/, function(element) {
  PagesContainer.getCurrentPage()[element]().click()
});
When(/^fills "([^"]*)" with "([^"]*)"$/, function(element, text) {
  PagesContainer.getCurrentPage()[element]().type(text)
});
Then(/^The current page is "([^"]*)"$/, function(name) {
  PagesContainer.isCurrentPage(name)
});
Then(/^contains "([^"]*)"$/, function(text) {
  cy.get(`*:contains('${text}'):last`).should('exist')
});
Given(/^the Cart has "([^"]*)" items$/, function(items) {
  items > 0 ?
    cy.get('.main-menu__cart__quantity').should('contain.text', items) :
    cy.get('.main-menu__cart__quantity').should('not.exist')
});