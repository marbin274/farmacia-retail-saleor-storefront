import { IProps } from "./types";

const subItem: any = {
  __typename: "MenuItem",
  category: {
    __typename: "Category",
    id: "Q2F0ZWdvcnk6Mzc=",
    name: "Hijo primero",
  },
  children: [
    {
      __typename: "MenuItem",
      category: {
        __typename: "Category",
        id: "Q2F0ZWdvcnk6Mzg=",
        name: "Nieto",
      },
      collection: null,
      id: "TWVudUl0ZW06MzU=",
      name: "Link Nieto",
      page: null,
      parent: {
        __typename: "MenuItem",
        id: "TWVudUl0ZW06MzQ=",
      },
      url: null,
    },
  ],
  collection: null,
  id: "TWVudUl0ZW06MzQ=",
  name: "Link Hijo",
  page: null,
  parent: {
    __typename: "MenuItem",
    id: "TWVudUl0ZW06MzM=",
  },
  url: null,
};

export const DEFAULT_PROPS: IProps = {
  subItems: [subItem, subItem],
};
