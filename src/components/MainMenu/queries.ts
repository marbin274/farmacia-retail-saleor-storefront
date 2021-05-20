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
    children(first: 5){
      edges{
        node{
          ...MenuCategoryBasicFieldCategory
          children(first: 5){
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
  ${menuCategoryChildrenField}
  fragment MainMenuSubItem on MenuItem {
    id
    name
    url
    category {
      ...MenuCategoryChildrenField
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
  query MainMenu {
    shop {
      navigation {
        main {
          id
          items {
            ...MainMenuSubItem
            children {
              ...MainMenuSubItem
              children {
                ...MainMenuSubItem
              }
            }
          }
        }
      }
    }
  }
`;

export const TypedMainMenuQuery = TypedQuery<MainMenu, {}>(mainMenu);
