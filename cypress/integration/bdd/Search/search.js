import {When, Then} from "cypress-cucumber-preprocessor/steps"
import PagesContainer from "../../../pages/PagesContainer";

Then(/^search products appear$/, function() {
  PagesContainer.getCurrentPage().searchProduct(1).item().should('exist')
});
Then(/^search products contain "([^"]*)"$/, function(text) {
  PagesContainer.getCurrentPage().searchProduct(1).item().should('contain.text', text)
});
When(/^submits search form$/, function() {
  PagesContainer.getCurrentPage().submitSearch();
});