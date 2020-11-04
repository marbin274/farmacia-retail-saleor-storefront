import {Given, When, Then} from "cypress-cucumber-preprocessor/steps"
import PagesContainer from "../../../pages/PagesContainer"

Given(/^visits "([^"]*)"$/, function(page) {
  PagesContainer.getPage(page).visit();
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