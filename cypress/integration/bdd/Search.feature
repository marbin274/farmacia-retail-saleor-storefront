Feature: The Search

  In order to find farmacy products
  As a Auna User
  I want to make searches

  Scenario: Searching by text
    Given a "guest_user"
    When visits "HomePage"
    And clicks on "buttonSearch"
    And fills "fieldSearch" with "vacuna"
    Then search products appear
    And search products contain "vacuna"

  Scenario: Searching by text
    Given a "guest_user"
    When visits "HomePage"
    And clicks on "buttonSearch"
    And fills "fieldSearch" with "vacuna"
    And submits search form
    Then The current page is "SearchResultsPage"
    And search products contain "Vacuna"