import gql from "graphql-tag";
import { TypedQuery } from "../../core/queries";
import { MainMenu } from "./gqlTypes/MainMenu";


export const menuCategoryBasicFieldCategory = gql`
  fragment MenuCategoryBasicFieldCategory on Category {
    seoDescription
    seoTitle
    id
    name
    backgroundImage {
      url
    }
  }
`;

export const menuCategoryChildrenField = gql`
  ${menuCategoryBasicFieldCategory}
  fragment MenuCategoryChildrenField on Category{
    ...MenuCategoryBasicFieldCategory
    children(first: 100){
      edges{
        node{
          ...MenuCategoryBasicFieldCategory
          children(first: 100){
            edges{
              node{
                ...MenuCategoryBasicFieldCategory
              }
            }
          }
        }
      }
    }
  }
`;

export const mainMenuSubItem = gql`
  fragment MainMenuSubItem on MenuItem {
    id
    name
    url
    category {
      id
      name
    }
    collection {
      id
      name
    }
    page {
      slug
    }
    parent {
      id
    }
  }
`;

export const mainMenu = gql`  
  ${mainMenuSubItem}
  ${menuCategoryChildrenField}
  query MainMenu {
    categories (first: 100, level: 0){
      edges{
        node{
          ...MenuCategoryChildrenField
        }
      }
    }
    shop {
      navigation {
        main {
          id
          items {
            ...MainMenuSubItem
          }
        }
      }
    }
  }
`;

export const TypedMainMenuQuery = TypedQuery<MainMenu, {}>(mainMenu);
