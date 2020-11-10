Feature: The Search

  In order to find pharmacy products
  As a guest User
  I want to make searches

  Scenario: Searching with preview results
    Given a "guest_user"
    When visits "HomePage"
    And clicks on "buttonSearch"
    And fills "fieldSearch" with "vacuna"
    Then search products appear
    And search products contain "vacuna"

  Scenario: Search and go to Results page
    Given a "guest_user"
    When visits "HomePage"
    And clicks on "buttonSearch"
    And fills "fieldSearch" with "vacuna"
    And submits search form
    Then The current page is "SearchResultsPage"
    And search products contain "Vacuna"

  Scenario: Search and go to Product Detail page
    Given a "guestUser"
    When visits "SearchResultsPage"
    | q      |
    | vacuna |
    And clicks on "Vacuna EUVAX"
    Then The current page is "ProductDetailPage"
    And contains "Vacuna EUVAX"

  Scenario: Search and add product to Shopping Cart
    Given a "guestUser"
    When visits "SearchResultsPage"
      | q      |
      | vacuna |
    Then the Cart has "0" items
    When clicks on "addToCartProduct#1"
    Then the Cart has "1" items