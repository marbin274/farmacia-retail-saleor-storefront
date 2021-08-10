import gql from "graphql-tag";

export const basicFieldCategory = gql`
fragment BasicFieldCategory on Category {
  seoDescription
  seoTitle
  id
  name
  backgroundImage {
    url
  }
}
`;

export const childrenField = gql`
${basicFieldCategory}
fragment ChildrenField on Category{
  ...BasicFieldCategory
  children(first: 100){
    edges{
      node{
        ...BasicFieldCategory
        children(first: 100){
          edges{
            node{
              ...BasicFieldCategory
            }
          }
        }
      }
    }
  }
}
`;

export const simpleCategory = gql`  
${childrenField}
fragment SimpleCategory on Category {       
  ancestors(first: 2) {
    edges {
      node {
        ...ChildrenField
      }
    }
  }
...ChildrenField 
}
`;
